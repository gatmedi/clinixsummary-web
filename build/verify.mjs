/**
 * SSG output verifier — run after `npm run prerender` (v2, plan 2.5).
 *
 * Asserts, for every generated page:
 *   1. self-referential canonical (aliases → their target), correct origin;
 *   2. non-empty, reasonably unique <title>;
 *   3. reciprocal hreflang cluster (translated routes) / none (EN-only routes);
 *   4. correct <html lang> and dir (ar = rtl);
 *   5. real body content (#app-content non-empty);
 *   6. no build-host leakage (localhost / 127.0.0.1);
 *   7. internal route links carry the page's locale prefix + trailing slash;
 *   8-11. one H1, JSON-LD scoping (SoftwareApplication/Organization/
 *         MedicalWebPage/FAQPage);
 *   12. meta description present + unique per locale;
 *   13. exactly one parseable @graph with the stable entity @ids
 *       (#organization declared once, WebSite node, refs resolve);
 *   14. BreadcrumbList exactly on routes with a routeMeta.breadcrumb parent;
 *   15. robots directive matches the manifest (no stray noindex);
 *   16. no internal link points at a retired slug (build/slug-renames.json);
 *   17. rendered pricing agrees with data/facts.json (and retired price
 *       strings are gone) — the $18.99-vs-Stripe-$19.99 class of bug;
 *   18. hand-built staticPages carry their declared robots directive;
 *   19. sitemap lastmod dates are valid, never in the future, and
 *       build/content-hashes.json matches the generated output.
 * Exits non-zero with a full report if anything fails.
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(await readFile(path.join(ROOT, 'build', 'config.json'), 'utf8'));
const FACTS = JSON.parse(await readFile(path.join(ROOT, 'data', 'facts.json'), 'utf8'));
const RENAMES = JSON.parse(await readFile(path.join(ROOT, 'build', 'slug-renames.json'), 'utf8'));

const trail = (r) => (r === '/' ? '/' : r + '/');
const prefix = (l) => (l === CFG.defaultLocale ? '' : '/' + l);
const fileFor = (l, r) => path.join(ROOT, ...(l === CFG.defaultLocale ? [] : [l]), ...(r === '/' ? [] : r.slice(1).split('/')), 'index.html');
const routeLocales = (r) => (CFG.nonTranslatedRoutes.includes(r) ? [CFG.defaultLocale] : CFG.locales);

const problems = [];
const titles = new Map();
const descs = new Map();
let checked = 0;

const OLD_SLUGS = Object.keys(RENAMES);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

for (const route of CFG.routes) {
  for (const locale of routeLocales(route)) {
    const fp = fileFor(locale, route);
    const label = `${locale} ${route}`;
    if (!existsSync(fp)) { problems.push(`${label}: MISSING FILE ${fp}`); continue; }
    const html = await readFile(fp, 'utf8');
    checked++;

    // 1. canonical
    const aliasTarget = CFG.aliasRoutes[route] || null;
    const wantCanonical = CFG.origin + prefix(locale) + trail(aliasTarget || route);
    const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
    if (canonical !== wantCanonical) problems.push(`${label}: canonical "${canonical}" ≠ "${wantCanonical}"`);

    // 2. title
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    if (!title.trim()) problems.push(`${label}: empty <title>`);
    const tKey = locale + '|' + title;
    if (!aliasTarget) {
      if (titles.has(tKey)) problems.push(`${label}: duplicate title with ${titles.get(tKey)}: "${title}"`);
      else titles.set(tKey, label);
    }

    // 3. hreflang
    const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
    const routeIsNoindex = (((CFG.routeMeta || {})[route]) || {}).robots === 'noindex';
    if (aliasTarget || routeIsNoindex || CFG.nonTranslatedRoutes.includes(route)) {
      if (hreflangs.length) problems.push(`${label}: unexpected hreflang cluster on ${aliasTarget ? 'alias' : 'EN-only'} route`);
    } else {
      const want = new Map(CFG.locales.map(l => [l, CFG.origin + prefix(l) + trail(route)]));
      want.set('x-default', CFG.origin + trail(route));
      for (const [, lang, href] of hreflangs) {
        if (!want.has(lang)) problems.push(`${label}: stray hreflang ${lang}`);
        else if (want.get(lang) !== href) problems.push(`${label}: hreflang ${lang} → "${href}" ≠ "${want.get(lang)}"`);
        want.delete(lang);
      }
      for (const [lang] of want) problems.push(`${label}: missing hreflang ${lang}`);
    }

    // 4. lang / dir
    const langAttr = (html.match(/<html[^>]*\blang="([^"]+)"/) || [])[1];
    if (langAttr !== locale) problems.push(`${label}: <html lang="${langAttr}"> ≠ ${locale}`);
    const dir = (html.match(/<html[^>]*\bdir="([^"]+)"/) || [])[1];
    const wantDir = locale === 'ar' ? 'rtl' : 'ltr';
    if (dir !== wantDir) problems.push(`${label}: dir="${dir}" ≠ ${wantDir}`);

    // 5. content
    const appContent = (html.match(/<main id="app-content"[^>]*>([\s\S]*?)<\/main>/) || [])[1] || '';
    if (appContent.replace(/\s/g, '').length < 200) problems.push(`${label}: #app-content looks empty (${appContent.length} chars)`);

    // 6. host leakage
    if (/localhost|127\.0\.0\.1/.test(html)) problems.push(`${label}: build-host URL leaked into output`);

    // 7. internal link form (spot check: no un-prefixed known-route hrefs on locale pages)
    if (locale !== CFG.defaultLocale) {
      for (const r of CFG.routes) {
        if (r === '/' || CFG.nonTranslatedRoutes.includes(r)) continue;
        if (new RegExp(`href="${r}"`).test(html)) { problems.push(`${label}: un-prefixed internal link href="${r}"`); break; }
      }
    }

    // 8. exactly one <h1> inside the rendered content
    const h1Count = (appContent.match(/<h1[\s>]/g) || []).length;
    if (h1Count !== 1) problems.push(`${label}: ${h1Count} <h1> in #app-content (want exactly 1)`);

    // 9. structured data scoping
    const swAppCount = (html.match(/"@type":\s*"SoftwareApplication"/g) || []).length;
    if (route === '/' && swAppCount !== 1) problems.push(`${label}: SoftwareApplication JSON-LD count ${swAppCount} on homepage (want 1)`);
    if (route !== '/' && swAppCount !== 0) problems.push(`${label}: SoftwareApplication JSON-LD leaked onto non-home page`);
    if (!/"@type":\s*"Organization"/.test(html)) problems.push(`${label}: missing Organization JSON-LD`);
    const isMedical = CFG.medicalRoutes.includes(route);
    const hasMedical = /"@type":\s*"MedicalWebPage"/.test(html);
    if (isMedical && !hasMedical) problems.push(`${label}: missing MedicalWebPage JSON-LD`);
    if (!isMedical && hasMedical) problems.push(`${label}: unexpected MedicalWebPage JSON-LD`);

    // 10. og:image absolute + card
    if (!html.includes(`property="og:image" content="${CFG.origin}${CFG.ogImage}"`)) {
      problems.push(`${label}: og:image is not the absolute share card`);
    }

    // 11. FAQPage JSON-LD present (with 4 Q&As) exactly on faqRoutes
    const isFaqRoute = (CFG.faqRoutes || []).includes(route);
    const hasFaqLd = /"@type":"FAQPage"/.test(html);
    if (isFaqRoute && !hasFaqLd) problems.push(`${label}: missing FAQPage JSON-LD`);
    if (!isFaqRoute && hasFaqLd) problems.push(`${label}: unexpected FAQPage JSON-LD`);
    if (isFaqRoute) {
      const qCount = (html.match(/"@type":"Question"/g) || []).length;
      if (qCount !== 4) problems.push(`${label}: FAQPage has ${qCount} questions (want 4)`);
    }

    // 12. meta description present + unique per locale (aliases mirror their target)
    const metaDesc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    if (!metaDesc.trim()) problems.push(`${label}: empty meta description`);
    if (!aliasTarget) {
      const dKey = locale + '|' + metaDesc;
      if (descs.has(dKey)) problems.push(`${label}: duplicate description with ${descs.get(dKey)}`);
      else descs.set(dKey, label);
    }

    // 13. entity graph: exactly one parseable @graph with stable @ids
    const ldTexts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
    let graph = null;
    for (const t of ldTexts) {
      try {
        const data = JSON.parse(t);
        if (data['@graph']) { graph = graph === null ? data['@graph'] : 'MULTIPLE'; }
      } catch { problems.push(`${label}: unparseable JSON-LD block`); }
    }
    if (graph === null) problems.push(`${label}: no @graph JSON-LD block`);
    else if (graph === 'MULTIPLE') problems.push(`${label}: more than one @graph block`);
    else {
      const orgs = graph.filter(n => n['@type'] === 'Organization');
      if (orgs.length !== 1) problems.push(`${label}: ${orgs.length} full Organization nodes (want exactly 1)`);
      else {
        if (orgs[0]['@id'] !== FACTS.entityIds.organization) problems.push(`${label}: Organization @id "${orgs[0]['@id']}"`);
        if (JSON.stringify(orgs[0].sameAs) !== JSON.stringify(FACTS.org.sameAs)) problems.push(`${label}: Organization sameAs drifted from facts.json`);
      }
      const sites = graph.filter(n => n['@type'] === 'WebSite');
      if (sites.length !== 1) problems.push(`${label}: ${sites.length} WebSite nodes (want 1)`);
      else {
        if (sites[0]['@id'] !== FACTS.entityIds.website) problems.push(`${label}: WebSite @id "${sites[0]['@id']}"`);
        if ((sites[0].publisher || {})['@id'] !== FACTS.entityIds.organization) problems.push(`${label}: WebSite publisher does not reference #organization`);
      }
      const sw = graph.find(n => n['@type'] === 'SoftwareApplication');
      if (route === '/') {
        if (!sw) problems.push(`${label}: homepage graph lacks SoftwareApplication`);
        else {
          if (sw['@id'] !== FACTS.entityIds.software) problems.push(`${label}: software @id "${sw['@id']}"`);
          const o = sw.offers || {};
          if (o.priceCurrency !== FACTS.pricing.currency
            || o.lowPrice !== String(FACTS.pricing.lowPrice)
            || o.highPrice !== String(FACTS.pricing.highPrice)
            || o.offerCount !== String(FACTS.pricing.offerCount)) {
            problems.push(`${label}: SoftwareApplication offers disagree with facts.json (${JSON.stringify(o)})`);
          }
          if ((sw.provider || {})['@id'] !== FACTS.entityIds.organization) problems.push(`${label}: software provider does not reference #organization`);
        }
      }
      const med = graph.find(n => n['@type'] === 'MedicalWebPage');
      if (med) {
        if ((med.isPartOf || {})['@id'] !== FACTS.entityIds.website) problems.push(`${label}: MedicalWebPage isPartOf missing/wrong`);
        if ((med.about || {})['@id'] !== FACTS.entityIds.software) problems.push(`${label}: MedicalWebPage about missing/wrong`);
      }

      // 14. BreadcrumbList exactly on routes with a manifest breadcrumb parent
      const wantCrumb = !!((CFG.routeMeta || {})[route] || {}).breadcrumb;
      const crumb = graph.find(n => n['@type'] === 'BreadcrumbList');
      if (wantCrumb && !crumb) problems.push(`${label}: missing BreadcrumbList`);
      if (!wantCrumb && crumb) problems.push(`${label}: unexpected BreadcrumbList`);
      if (crumb) {
        const items = crumb.itemListElement || [];
        if (items.length !== 3) problems.push(`${label}: BreadcrumbList has ${items.length} items (want 3)`);
        else {
          if (items[2].item !== wantCanonical) problems.push(`${label}: breadcrumb leaf "${items[2].item}" ≠ canonical`);
          if (items.some(i => !i.name || !String(i.name).trim())) problems.push(`${label}: breadcrumb item with empty name`);
        }
      }
    }

    // 15. robots directive matches the manifest
    const routeRobots = (((CFG.routeMeta || {})[route] || {}).robots) || 'index';
    const robotsMeta = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || null;
    if (routeRobots === 'noindex' && (!robotsMeta || !robotsMeta.includes('noindex'))) {
      problems.push(`${label}: manifest says noindex but page has no noindex robots meta`);
    }
    if (routeRobots !== 'noindex' && robotsMeta && robotsMeta.includes('noindex')) {
      problems.push(`${label}: stray noindex robots meta on an indexable route`);
    }

    // 16. no internal link resurrects a retired slug (they cost a 301 hop)
    for (const old of OLD_SLUGS) {
      if (new RegExp(`href="(?:/(?:${CFG.locales.join('|')}))?${escapeRe(old)}(?:/|")`).test(html)) {
        problems.push(`${label}: internal link to retired slug ${old}`);
        break;
      }
    }

    // 17. rendered pricing agrees with the facts store (homepage carries the cards)
    if (route === '/') {
      for (const plan of FACTS.pricing.plans) {
        if (plan.pricePerMonth === 0) continue;
        const priceStr = '$' + plan.pricePerMonth;
        if (!appContent.includes(priceStr)) problems.push(`${label}: homepage does not show ${plan.name} at ${priceStr}`);
      }
    }
    for (const retired of (FACTS.pricing.retiredPriceStrings || [])) {
      if (html.includes(retired)) problems.push(`${label}: retired price string "${retired}" still on the page`);
    }
  }
}

// ── hand-built static pages under management (manifest v2) ──────────────
for (const [rel, wantRobots] of Object.entries(CFG.staticPages || {})) {
  const fp = path.join(ROOT, ...rel.split('/'));
  if (!existsSync(fp)) { problems.push(`staticPages: ${rel} MISSING`); continue; }
  const html = await readFile(fp, 'utf8');
  const m = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1];
  if (m !== wantRobots) problems.push(`staticPages: ${rel} robots "${m}" ≠ declared "${wantRobots}"`);
}

// ── sitemap.xml validation ─────────────────────────────────────────────
{
  const smPath = path.join(ROOT, 'sitemap.xml');
  if (!existsSync(smPath)) problems.push('sitemap.xml: MISSING');
  else {
    const sm = await readFile(smPath, 'utf8');
    const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    const locSet = new Set(locs);
    if (locSet.size !== locs.length) problems.push('sitemap.xml: duplicate <loc> entries');
    for (const route of CFG.routes) {
      const isNoindex = (((CFG.routeMeta || {})[route]) || {}).robots === 'noindex';
      if (CFG.aliasRoutes[route] || isNoindex) {
        for (const l of CFG.locales) {
          if (locSet.has(CFG.origin + prefix(l) + trail(route))) {
            problems.push(`sitemap.xml: ${isNoindex ? 'noindex' : 'alias'} route ${route} must not be listed`);
          }
        }
        continue;
      }
      for (const l of routeLocales(route)) {
        const u = CFG.origin + prefix(l) + trail(route);
        if (!locSet.has(u)) problems.push(`sitemap.xml: missing ${u}`);
        locSet.delete(u);
      }
    }
    for (const extra of locSet) problems.push(`sitemap.xml: unexpected URL ${extra}`);

    // 19. honest lastmod: valid dates, never in the future, and the committed
    // hash store matches the generated output (drift = sitemap.mjs was not
    // re-run after prerender, so lastmod no longer reflects reality).
    const today = new Date().toISOString().slice(0, 10);
    for (const [, lm] of sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lm)) { problems.push(`sitemap.xml: malformed lastmod "${lm}"`); break; }
      if (lm > today) { problems.push(`sitemap.xml: future lastmod "${lm}"`); break; }
    }
    const storePath = path.join(ROOT, 'build', 'content-hashes.json');
    if (!existsSync(storePath)) problems.push('build/content-hashes.json: MISSING (run npm run sitemap after prerender)');
    else {
      const store = JSON.parse(await readFile(storePath, 'utf8'));
      let drift = 0;
      for (const route of CFG.routes) {
        if (CFG.aliasRoutes[route]) continue;
        if ((((CFG.routeMeta || {})[route]) || {}).robots === 'noindex') continue;
        for (const l of routeLocales(route)) {
          const u = CFG.origin + prefix(l) + trail(route);
          const fp = fileFor(l, route);
          if (!existsSync(fp)) continue;
          let h = await readFile(fp, 'utf8');
          if ((CFG.apiContentRoutes || []).includes(route)) h = (h.match(/<head[\s\S]*?<\/head>/) || [h])[0];
          h = h.replace(/\?v=[0-9a-f]{10}/g, '');
          const hash = createHash('sha1').update(h).digest('hex');
          if (!store[u] || store[u].hash !== hash) drift++;
        }
      }
      if (drift) problems.push(`content-hashes.json: ${drift} page(s) drifted from the store - re-run npm run sitemap after prerender`);
    }
  }
  if (!existsSync(path.join(ROOT, 'images', 'og-card.png'))) problems.push('images/og-card.png: MISSING');
}

console.log(`Verified ${checked} generated pages.`);
if (problems.length) {
  console.error(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log('All checks passed.');
