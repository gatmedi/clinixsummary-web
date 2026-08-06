/**
 * Generates sitemap.xml from build/config.json.
 *
 * Rules (SEO best practice):
 *  - canonical URLs only: alias routes (/pricing, /roi-calculator) are excluded;
 *  - one <url> per route × locale, each carrying the full reciprocal
 *    xhtml:link hreflang cluster + x-default;
 *  - EN-only routes appear once with no alternates;
 *  - trailing-slash form matches the canonicals baked into the pages;
 *  - <lastmod> = build date (regenerate alongside `npm run prerender`).
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(await readFile(path.join(ROOT, 'build', 'config.json'), 'utf8'));

const trail = (r) => (r === '/' ? '/' : r + '/');
const prefix = (l) => (l === CFG.defaultLocale ? '' : '/' + l);
const url = (l, r) => CFG.origin + prefix(l) + trail(r);
const lastmod = new Date().toISOString().slice(0, 10);

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
];

for (const route of CFG.routes) {
  if (CFG.aliasRoutes[route]) continue; // aliases canonicalise elsewhere
  const enOnly = CFG.nonTranslatedRoutes.includes(route);
  const locales = enOnly ? [CFG.defaultLocale] : CFG.locales;

  for (const locale of locales) {
    lines.push('  <url>');
    lines.push(`    <loc>${url(locale, route)}</loc>`);
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

lines.push('</urlset>');
await writeFile(path.join(ROOT, 'sitemap.xml'), lines.join('\n') + '\n', 'utf8');
const urls = lines.filter(l => l.includes('<loc>')).length;
console.log(`sitemap.xml written: ${urls} URLs`);
