/**
 * Generates sitemap.xml from build/config.json with HONEST per-URL lastmod
 * (plan 2.4 / spec FRESH-005, CI-018).
 *
 * Rules (SEO best practice):
 *  - canonical URLs only: alias routes (/pricing, /roi-calculator) are excluded;
 *  - one <url> per route × locale, each carrying the full reciprocal
 *    xhtml:link hreflang cluster + x-default;
 *  - EN-only routes appear once with no alternates;
 *  - trailing-slash form matches the canonicals baked into the pages;
 *  - <lastmod> = the date the page's MATERIAL content last changed, never the
 *    build date. A content hash of the generated file is compared against the
 *    committed build/content-hashes.json: unchanged hash keeps the stored
 *    date, changed/new hash stamps today and updates the store. Run AFTER
 *    prerender (build:all does) and COMMIT content-hashes.json with the pages.
 *
 * Hash normalization — what must NOT count as a content change:
 *  - ?v=<10-hex> asset stamps (a shared js/css edit flips them in all 308
 *    files; the page text didn't change);
 *  - for apiContentRoutes (/publications, /news) the body is baked from the
 *    LIVE platform API at build time (network/CMS state = nondeterministic),
 *    so only their <head> is hashed.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(await readFile(path.join(ROOT, 'build', 'config.json'), 'utf8'));

const trail = (r) => (r === '/' ? '/' : r + '/');
const prefix = (l) => (l === CFG.defaultLocale ? '' : '/' + l);
const url = (l, r) => CFG.origin + prefix(l) + trail(r);
const fileFor = (l, r) => path.join(ROOT, ...(l === CFG.defaultLocale ? [] : [l]), ...(r === '/' ? [] : r.slice(1).split('/')), 'index.html');

const HASH_STORE = path.join(ROOT, 'build', 'content-hashes.json');
const store = existsSync(HASH_STORE) ? JSON.parse(await readFile(HASH_STORE, 'utf8')) : {};
const today = new Date().toISOString().slice(0, 10);

async function contentHash(route, locale) {
  const fp = fileFor(locale, route);
  if (!existsSync(fp)) return null;
  let html = await readFile(fp, 'utf8');
  if ((CFG.apiContentRoutes || []).includes(route)) {
    html = (html.match(/<head[\s\S]*?<\/head>/) || [html])[0];
  }
  html = html.replace(/\?v=[0-9a-f]{10}/g, '');
  return createHash('sha1').update(html).digest('hex');
}

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
];

let bumped = 0, kept = 0, missing = 0;
const seen = new Set();

for (const route of CFG.routes) {
  if (CFG.aliasRoutes[route]) continue; // aliases canonicalise elsewhere
  // A noindexed route must not be advertised to crawlers (the sitemap and the
  // meta tag would contradict each other). Inert until a route sets robots.
  if ((((CFG.routeMeta || {})[route]) || {}).robots === 'noindex') continue;
  const enOnly = CFG.nonTranslatedRoutes.includes(route);
  const locales = enOnly ? [CFG.defaultLocale] : CFG.locales;

  for (const locale of locales) {
    const loc = url(locale, route);
    seen.add(loc);

    const hash = await contentHash(route, locale);
    const prev = store[loc];
    let lastmod;
    if (hash === null) {
      // Generated file missing (partial build): keep what we knew, warn.
      lastmod = prev ? prev.lastmod : today;
      missing++;
      console.warn(`  WARN no generated file for ${loc} - lastmod ${prev ? 'kept' : 'defaulted'}`);
    } else if (prev && prev.hash === hash) {
      lastmod = prev.lastmod;
      kept++;
    } else {
      lastmod = today;
      store[loc] = { hash, lastmod };
      bumped++;
    }

    lines.push('  <url>');
    lines.push(`    <loc>${loc}</loc>`);
    if (!enOnly) {
      for (const alt of CFG.locales) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${alt}" href="${url(alt, route)}"/>`);
      }
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url(CFG.defaultLocale, route)}"/>`);
    }
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push('  </url>');
  }
}

// Retired URLs (route removed from the manifest) leave the store too.
for (const key of Object.keys(store)) {
  if (!seen.has(key)) delete store[key];
}

lines.push('</urlset>');
await writeFile(path.join(ROOT, 'sitemap.xml'), lines.join('\n') + '\n', 'utf8');
await writeFile(HASH_STORE, JSON.stringify(store, null, 2) + '\n', 'utf8');
const urls = lines.filter(l => l.includes('<loc>')).length;
console.log(`sitemap.xml written: ${urls} URLs (${bumped} lastmod bumped, ${kept} kept${missing ? ', ' + missing + ' MISSING FILES' : ''})`);
