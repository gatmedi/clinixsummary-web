/**
 * Generates the default 1200×630 Open Graph share card (images/og-card.png)
 * in the site's brand style — rendered from an inline HTML template with
 * Playwright, so no image libraries are needed.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logo = (await readFile(path.join(ROOT, 'images', 'logo-full.png'))).toString('base64');

const html = `<!DOCTYPE html>
<html><head><style>
  @font-face { font-family:'Merriweather'; src: local('Merriweather'); }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#FCFCF9; display:flex; align-items:center; justify-content:center; }
  .card { text-align:center; }
  .card img { width:520px; margin-bottom:44px; }
  .tagline { font-family: Merriweather, Georgia, serif; font-size:44px; font-weight:400; color:#09263a; margin-bottom:22px; }
  .sub { font-family: Inter, Arial, sans-serif; font-size:26px; color:#526675; }
  .bar { position:fixed; left:0; right:0; bottom:0; height:14px; background:#3BC5D6; }
</style></head>
<body>
  <div class="card">
    <img src="data:image/png;base64,${logo}" alt="">
    <div class="tagline">Voice in. Meticulous notes out.</div>
    <div class="sub">The AI Medical Scribe &nbsp;·&nbsp; clinixsummary.ai</div>
  </div>
  <div class="bar"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
const png = await page.screenshot({ type: 'png' });
await browser.close();
await writeFile(path.join(ROOT, 'images', 'og-card.png'), png);
console.log(`images/og-card.png written (${(png.length / 1024).toFixed(0)} KB)`);
