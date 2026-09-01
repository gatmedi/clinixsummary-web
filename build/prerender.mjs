/**
 * ClinixSummary SSG prerenderer.
 *
 * Renders every route × locale with the site's OWN runtime (pages, i18n, SEO
 * module) in headless Chromium and writes the resulting HTML as physical
 * `<locale?>/<slug>/index.html` files at the repo root. nginx on the platform
 * serves those files statically (try_files $uri $uri/) before Laravel, so
 * crawlers get full server-rendered content while the SPA hydrates on top and
 * behaves exactly as before. Pixel-identical by construction: the markup IS
 * what the SPA renders.
 *
 * Usage:  npm run prerender            (all routes × locales)
 *         node build/prerender.mjs --only /cap-vet --locales en,fr,ar   (subset)
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(await readFile(path.join(ROOT, 'build', 'config.json'), 'utf8'));
// Canonical product facts (plan 2.3): the entity graph and offers are built
// from this file, and verify.mjs fails the build if pages disagree with it.
const FACTS = JSON.parse(await readFile(path.join(ROOT, 'data', 'facts.json'), 'utf8'));

// The pristine SPA shell. Root index.html is OVERWRITTEN by the generated EN
// homepage, so the canonical shell source lives in shell.html (committed).
// First run bootstraps shell.html from the original index.html.
const SHELL_PATH = path.join(ROOT, 'shell.html');
if (!existsSync(SHELL_PATH)) {
  const original = await readFile(path.join(ROOT, 'index.html'));
  if (original.includes('data-ssg')) {
    throw new Error('index.html is already a generated page and shell.html is missing — restore the pristine shell first.');
  }
  await writeFile(SHELL_PATH, original);
  console.log('Bootstrapped shell.html from pristine index.html');
}

const argv = process.argv.slice(2);
const arg = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : null; };
const ONLY = arg('--only') ? arg('--only').split(',') : null;
const LOCALES = arg('--locales') ? arg('--locales').split(',') : CFG.locales;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};

/** Tiny static server with SPA fallback (mimics prod: file if it exists, else the shell). */
function startServer() {
  return new Promise((resolve) => {
    const srv = createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
        // Serve real files (assets, data, docs) directly.
        let fsPath = path.join(ROOT, urlPath);
        let served = false;
        if (path.extname(urlPath)) {
          // The pristine shell uses RELATIVE asset refs (kept for the GitHub
          // Pages subpath copy), so when the shell is served at a deep path
          // (/fr/cap-vet/) the browser asks for /fr/cap-vet/js/app.js. Resolve
          // such requests back to the real root-level asset, exactly as the
          // generated pages' absolutised refs will in production.
          if (!existsSync(fsPath)) {
            for (const dir of ['/js/', '/css/', '/images/', '/data/', '/fonts/', '/assets/', '/docs/']) {
              const i = urlPath.indexOf(dir);
              if (i > 0) {
                const candidate = path.join(ROOT, urlPath.slice(i));
                if (existsSync(candidate)) { fsPath = candidate; break; }
              }
            }
          }
          if (existsSync(fsPath) && (await stat(fsPath)).isFile()) {
            const body = await readFile(fsPath);
            res.writeHead(200, { 'Content-Type': MIME[path.extname(urlPath)] || 'application/octet-stream' });
            res.end(body);
            served = true;
          }
        }
        if (!served) {
          // SPA fallback: ALWAYS the pristine shell (never a previously generated
          // page), so re-runs are idempotent.
          const body = await readFile(SHELL_PATH);
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(body);
        }
      } catch {
        res.writeHead(404); res.end('not found');
      }
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

const trail = (route) => (route === '/' ? '/' : route + '/');
const localePrefix = (locale) => (locale === CFG.defaultLocale ? '' : '/' + locale);
const publicUrl = (locale, route) => CFG.origin + localePrefix(locale) + trail(route);

/** Which locales a route is built for. */
const routeLocales = (route) =>
  CFG.nonTranslatedRoutes.includes(route) ? [CFG.defaultLocale] : CFG.locales;

async function renderOne(browser, base, locale, route) {
  const ctx = await browser.newContext({ locale: locale === 'en' ? 'en-US' : locale });
  const page = await ctx.newPage();
  const bp = localePrefix(locale);

  await page.addInitScript(({ bp, locale, storageKey }) => {
    // Lock BASEPATH so the shell's inline assignment cannot override the locale
    // prefix; i18n derives its locale from this (URL-prefix-first resolution).
    Object.defineProperty(window, 'BASEPATH', { value: bp, writable: false, configurable: false });
    try { window.localStorage.setItem(storageKey, locale); } catch {}
  }, { bp, locale, storageKey: 'clinixsummary-lang' });

  await page.goto(base + bp + trail(route), { waitUntil: 'networkidle' });
  await page.waitForSelector('html[data-app-ready="1"]', { timeout: 20000 });
  // One settle frame for post-render tweaks (focus handling, banners).
  await page.waitForTimeout(150);

  const html = await page.evaluate(({ cfg, facts, locale, route, bp, aliasTarget, locList }) => {
    const ORIGIN = cfg.origin;
    const trail = (r) => (r === '/' ? '/' : r + '/');
    const prefix = (loc) => (loc === cfg.defaultLocale ? '' : '/' + loc);
    const head = document.head;

    const setLink = (rel, href, extra = {}) => {
      let el = head.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`);
      if (!el) { el = document.createElement('link'); el.rel = rel; if (extra.hreflang) el.hreflang = extra.hreflang; head.appendChild(el); }
      el.href = href;
      return el;
    };

    // ── canonical (alias routes canonicalise to their target) ──
    const canonicalRoute = aliasTarget || route;
    const canonicalUrl = ORIGIN + prefix(locale) + trail(canonicalRoute);
    setLink('canonical', canonicalUrl);

    // ── hreflang cluster (only for translated routes; aliases none; noindex
    // routes none - alternates on a noindexed page contradict the meta tag) ──
    head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    const routeIsNoindex = (((cfg.routeMeta || {})[route]) || {}).robots === 'noindex';
    if (!aliasTarget && !routeIsNoindex && locList.length > 1) {
      for (const loc of locList) {
        const link = document.createElement('link');
        link.rel = 'alternate'; link.hreflang = loc === 'pt' ? 'pt' : loc;
        link.href = ORIGIN + prefix(loc) + trail(route);
        head.appendChild(link);
      }
      const xd = document.createElement('link');
      xd.rel = 'alternate'; xd.hreflang = 'x-default';
      xd.href = ORIGIN + trail(route);
      head.appendChild(xd);
    }

    // ── og:url / og:locale / twitter alignment ──
    const setMeta = (sel, content) => { const el = head.querySelector(sel); if (el) el.content = content; };
    setMeta('meta[property="og:url"]', canonicalUrl);
    let ogLoc = head.querySelector('meta[property="og:locale"]');
    if (!ogLoc) { ogLoc = document.createElement('meta'); ogLoc.setAttribute('property', 'og:locale'); head.appendChild(ogLoc); }
    ogLoc.content = cfg.ogLocales[locale] || 'en_US';
    const desc = head.querySelector('meta[name="description"]');
    if (desc) setMeta('meta[name="twitter:description"]', desc.content);

    // ── absolutise internal asset references (pages live at depth) ──
    const absolutise = (el, attr) => {
      const v = el.getAttribute(attr);
      if (v && !/^([a-z]+:|\/\/|\/|#)/i.test(v)) el.setAttribute(attr, '/' + v);
    };
    document.querySelectorAll('link[href]').forEach(el => absolutise(el, 'href'));
    document.querySelectorAll('script[src]').forEach(el => absolutise(el, 'src'));
    document.querySelectorAll('img[src]').forEach(el => absolutise(el, 'src'));

    // ── locale-prefix + trailing-slash internal route links ──
    const routeSet = new Set(cfg.routes);
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      const clean = href.length > 1 && href.endsWith('/') ? href.slice(0, -1) : href;
      if (!routeSet.has(clean)) return;                 // only known SPA routes
      const targetLocales = cfg.nonTranslatedRoutes.includes(clean) ? [cfg.defaultLocale] : cfg.locales;
      const loc = targetLocales.includes(locale) ? locale : cfg.defaultLocale;
      a.setAttribute('href', prefix(loc) + trail(clean));
    });

    // ── og:image → absolute branded share card (+ dimensions) ──
    const ogImgUrl = ORIGIN + cfg.ogImage;
    setMeta('meta[property="og:image"]', ogImgUrl);
    setMeta('meta[name="twitter:image"]', ogImgUrl);
    for (const [prop, val] of [['og:image:width', '1200'], ['og:image:height', '630']]) {
      let el = head.querySelector(`meta[property="${prop}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); head.appendChild(el); }
      el.content = val;
    }

    // ── structured data: one @graph per page with stable entity @ids ──
    // (plan 2.2 / spec DEVSEO-016..018, SCHEMA-001..005). The Organization is
    // declared ONCE per page under its stable @id; every other node references
    // it. The shell's hand-written SoftwareApplication block is absorbed into
    // the graph on the homepage (enriched from the facts store) and dropped
    // everywhere else (it used to duplicate across ~45 URLs — a diluting
    // signal). @ids are permanent anchors: the software @id points at the
    // category page even while the full node still renders on the homepage
    // (Phase 3 moves the node; the @id must never change with it).
    const descEl = head.querySelector('meta[name="description"]');
    const pageDesc = descEl ? descEl.content : '';
    let shellSoftware = null;
    for (const s of [...document.querySelectorAll('script[type="application/ld+json"]')]) {
      try {
        const data = JSON.parse(s.textContent);
        if (data['@type'] === 'SoftwareApplication') { shellSoftware = data; s.remove(); }
      } catch { /* leave unparseable blocks alone */ }
    }

    const graph = [];
    graph.push({
      '@type': 'Organization',
      '@id': facts.entityIds.organization,
      name: facts.org.name,
      legalName: facts.org.legalName,
      url: ORIGIN,
      logo: ORIGIN + facts.org.logo,
      brand: { '@type': 'Brand', name: facts.product.name },
      sameAs: facts.org.sameAs
    });
    graph.push(Object.assign({
      '@type': 'WebSite',
      '@id': facts.entityIds.website,
      name: facts.product.name,
      url: ORIGIN + '/',
      publisher: { '@id': facts.entityIds.organization },
      inLanguage: locale
    // The homepage keeps a REFERENCE to the software entity (Phase 3 moved
    // the full node to the category page that owns the @id anchor).
    }, route === '/' ? { about: { '@id': facts.entityIds.software } } : {}));

    // Full SoftwareApplication on the category-owner page (spec Phase C):
    // the @id anchor /ai-medical-scribe/#software finally lives where it
    // points. Seeded from the shell block, enriched from the facts store.
    if (route === '/ai-medical-scribe' && shellSoftware) {
      graph.push(Object.assign({}, shellSoftware, {
        '@context': undefined,
        '@id': facts.entityIds.software,
        name: facts.product.name,
        operatingSystem: facts.product.platforms.join(', '),
        // Localized: a single English description would dilute locale pages.
        description: pageDesc || shellSoftware.description,
        inLanguage: locale,
        url: ORIGIN + '/ai-medical-scribe/',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: facts.pricing.currency,
          lowPrice: String(facts.pricing.lowPrice),
          highPrice: String(facts.pricing.highPrice),
          offerCount: String(facts.pricing.offerCount)
        },
        provider: { '@id': facts.entityIds.organization }
      }));
    }

    if (cfg.medicalRoutes.includes(route)) {
      graph.push({
        '@type': 'MedicalWebPage',
        name: document.title,
        description: pageDesc,
        url: canonicalUrl,
        inLanguage: locale,
        isPartOf: { '@id': facts.entityIds.website },
        about: { '@id': facts.entityIds.software }
      });
    }

    // BreadcrumbList driven by the manifest's routeMeta.breadcrumb parent
    // (SCHEMA-005: only real hierarchies). Hub names come from localized
    // breadcrumbLabels; the leaf name is the page's own localized title with
    // the " – ClinixSummary" suffix stripped.
    const meta = (cfg.routeMeta || {})[route] || {};
    if (meta.breadcrumb) {
      const labels = cfg.breadcrumbLabels || {};
      const pick = (key) => (labels[key] || {})[locale] || (labels[key] || {}).en || key;
      const parent = meta.breadcrumb;
      const parentLocale = cfg.nonTranslatedRoutes.includes(parent) ? cfg.defaultLocale : locale;
      // Anchored to seo.js's actual " – ClinixSummary" END suffix (en dash) -
      // a first-occurrence strip would truncate any future title that happens
      // to contain a separator + "ClinixSummary" mid-string.
      const leafName = document.title.replace(/\s*[–—|-]\s*ClinixSummary\s*$/, '').trim() || document.title;
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: pick('home'), item: ORIGIN + prefix(locale) + '/' },
          { '@type': 'ListItem', position: 2, name: pick(parent), item: ORIGIN + prefix(parentLocale) + trail(parent) },
          { '@type': 'ListItem', position: 3, name: leafName, item: canonicalUrl }
        ]
      });
    }

    // FAQPage JSON-LD harvested from the rendered (already localized) DOM —
    // question/answer pairs are marked with data-faq-q / data-faq-a.
    if ((cfg.faqRoutes || []).includes(route)) {
      const qs = [...document.querySelectorAll('[data-faq-q]')];
      const faqs = qs.map(q => {
        const a = q.parentElement.querySelector('[data-faq-a]');
        return a ? {
          '@type': 'Question',
          name: q.textContent.trim(),
          acceptedAnswer: { '@type': 'Answer', text: a.textContent.trim() }
        } : null;
      }).filter(Boolean);
      if (faqs.length) {
        graph.push({ '@type': 'FAQPage', inLanguage: locale, mainEntity: faqs });
      }
    }

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    head.appendChild(ld);

    // Manifest-driven robots (plan 2.1): a route opts into noindex in
    // routeMeta; nothing uses it today but the machinery is manifest-owned.
    if (meta.robots === 'noindex') {
      let robotsEl = head.querySelector('meta[name="robots"]');
      if (!robotsEl) { robotsEl = document.createElement('meta'); robotsEl.name = 'robots'; head.appendChild(robotsEl); }
      robotsEl.content = 'noindex, nofollow';
    }

    // ── SSG marker (switcher navigates between locale URLs on SSG pages) ──
    document.documentElement.setAttribute('data-ssg', '1');
    document.documentElement.removeAttribute('data-app-ready');

    // ── replace the shell's BASEPATH inline assignment with the baked value ──
    for (const s of document.querySelectorAll('script:not([src])')) {
      if (s.textContent.includes("window.BASEPATH=location.hostname")) {
        s.textContent = s.textContent.replace(
          /window\.BASEPATH=[^;]+;/,
          `window.BASEPATH=${JSON.stringify(bp)};`
        );
      }
    }

    return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
  }, { cfg: CFG, facts: FACTS, locale, route, bp, aliasTarget: CFG.aliasRoutes[route] || null, locList: routeLocales(route) });

  await ctx.close();
  return html;
}

const srv = await startServer();
const base = `http://127.0.0.1:${srv.address().port}`;
const browser = await chromium.launch();

const targets = [];
for (const route of CFG.routes) {
  if (ONLY && !ONLY.includes(route)) continue;
  for (const locale of routeLocales(route)) {
    if (!LOCALES.includes(locale)) continue;
    targets.push({ route, locale });
  }
}

console.log(`Prerendering ${targets.length} pages …`);
let done = 0;

// -- cache-busting ------------------------------------------------------------
// nginx serves /js and /css with a 30-day max-age, and pages referenced them
// without any version - so a fixed template kept serving its OLD behaviour to
// returning visitors for up to a month. Stamp every same-origin js/css
// reference with a short content hash: the URL changes exactly when the file
// does, and the 30-day cache becomes a feature instead of a trap.
const assetHashes = new Map();
function hashFor(rel) {
  if (!assetHashes.has(rel)) {
    try {
      const buf = readFileSync(path.join(ROOT, rel));
      assetHashes.set(rel, createHash('sha1').update(buf).digest('hex').slice(0, 10));
    } catch (e) {
      assetHashes.set(rel, null); // missing file: leave the URL alone
    }
  }
  return assetHashes.get(rel);
}
function versionAssets(html) {
  return html.replace(/(src|href)="(\/(?:js|css)\/[^"?#]+\.(?:js|css))"/g, (m, attr, p) => {
    const h = hashFor(p.slice(1));
    return h ? attr + '="' + p + '?v=' + h + '"' : m;
  });
}

const failures = [];
const CONCURRENCY = 4;
const queue = [...targets];
async function worker() {
  for (;;) {
    const next = queue.shift();
    if (!next) return;
    const { route, locale } = next;
    try {
      const html = versionAssets(await renderOne(browser, base, locale, route));
      const outDir = path.join(ROOT, ...(locale === CFG.defaultLocale ? [] : [locale]), ...(route === '/' ? [] : route.slice(1).split('/')));
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
      done++;
      if (done % 25 === 0 || done === targets.length) console.log(`  ${done}/${targets.length}`);
    } catch (err) {
      failures.push({ route, locale, err: String(err).slice(0, 200) });
      console.error(`  FAIL ${locale} ${route}: ${String(err).slice(0, 200)}`);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

await browser.close();
srv.close();
if (failures.length) {
  console.error(`\n${failures.length} page(s) FAILED`);
  process.exit(1);
}
console.log('All pages prerendered OK.');
