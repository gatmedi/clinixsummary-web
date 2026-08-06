/**
 * SSG output verifier — run after `npm run prerender`.
 *
 * Asserts, for every generated page:
 *   1. self-referential canonical (aliases → their target), correct origin;
 *   2. non-empty, reasonably unique <title>;
 *   3. reciprocal hreflang cluster (translated routes) / none (EN-only routes);
 *   4. correct <html lang> and dir (ar = rtl);
 *   5. real body content (#app-content non-empty);
 *   6. no build-host leakage (localhost / 127.0.0.1);
 *   7. internal route links carry the page's locale prefix + trailing slash.
 * Exits non-zero with a full report if anything fails.
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(await readFile(path.join(ROOT, 'build', 'config.json'), 'utf8'));

const trail = (r) => (r === '/' ? '/' : r + '/');
const prefix = (l) => (l === CFG.defaultLocale ? '' : '/' + l);
const fileFor = (l, r) => path.join(ROOT, ...(l === CFG.defaultLocale ? [] : [l]), ...(r === '/' ? [] : r.slice(1).split('/')), 'index.html');
const routeLocales = (r) => (CFG.nonTranslatedRoutes.includes(r) ? [CFG.defaultLocale] : CFG.locales);

const problems = [];
const titles = new Map();
let checked = 0;

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
    if (aliasTarget || CFG.nonTranslatedRoutes.includes(route)) {
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
  }
}

console.log(`Verified ${checked} generated pages.`);
if (problems.length) {
  console.error(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log('All checks passed.');
