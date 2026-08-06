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
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(await readFile(path.join(ROOT, 'build', 'config.json'), 'utf8'));

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

  const html = await page.evaluate(({ cfg, locale, route, bp, aliasTarget, locList }) => {
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

    // ── hreflang cluster (only for translated routes; aliases none) ──
    head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    if (!aliasTarget && locList.length > 1) {
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

    // ── structured data ──
    // The shell ships one SoftwareApplication JSON-LD; scope it to the homepage
    // only (it was duplicated on all ~45 URLs — a diluting signal), and give
    // every page an Organization node; capability pages additionally get a
    // localized MedicalWebPage node.
    const ldBlocks = [...document.querySelectorAll('script[type="application/ld+json"]')];
    for (const s of ldBlocks) {
      try {
        const data = JSON.parse(s.textContent);
        if (data['@type'] === 'SoftwareApplication' && route !== '/') s.remove();
      } catch { /* leave unparseable blocks alone */ }
    }
    const addLd = (obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(obj);
      head.appendChild(s);
    };
    addLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GATMEDI',
      legalName: 'Gacrux Advanced Technologies in Medicine Ltd',
      url: ORIGIN,
      logo: ORIGIN + '/images/logo-full.png',
      brand: { '@type': 'Brand', name: 'ClinixSummary' },
      sameAs: [
        'https://apps.apple.com/us/app/clinixsummary/id6740857768',
        'https://play.google.com/store/apps/details?id=com.gacrux.clinixsummaryai'
      ]
    });
    if (cfg.medicalRoutes.includes(route)) {
      const descEl = head.querySelector('meta[name="description"]');
      addLd({
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: document.title,
        description: descEl ? descEl.content : '',
        url: canonicalUrl,
        inLanguage: locale
      });
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
  }, { cfg: CFG, locale, route, bp, aliasTarget: CFG.aliasRoutes[route] || null, locList: routeLocales(route) });

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
const failures = [];
const CONCURRENCY = 4;
const queue = [...targets];
async function worker() {
  for (;;) {
    const next = queue.shift();
    if (!next) return;
    const { route, locale } = next;
    try {
      const html = await renderOne(browser, base, locale, route);
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
