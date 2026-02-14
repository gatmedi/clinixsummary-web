#!/usr/bin/env node
/**
 * Generate Patient Privacy Notice leaflet PDFs for all 6 languages.
 * Uses inline SVG icons (no external font dependencies).
 * Renders via Chromium headless --print-to-pdf for A4 output.
 *
 * Design goals:
 *  - Fill the full A4 page with generous, readable typography
 *  - Professional healthcare leaflet look
 *  - Large enough for elderly patients in a waiting room
 *  - Key-facts strip for visual variety
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const CHROME_PATH = '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome';
const OUTPUT_DIR = resolve(ROOT, 'assets/leaflets');
const TMP_DIR = resolve(ROOT, 'scripts/.tmp-leaflets');
const LOGO_PATH = resolve(ROOT, 'images/logo-wings.png');

const LANGS = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'it', name: 'Italian' },
    { code: 'ar', name: 'Arabic' },
];

/* ── Inline SVG icons ─────────────────────────────────────────── */
const ICONS = {
    mic: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`,
    block: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    verified: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    handshake: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>`,
};

/* Mini icons for the key-facts strip */
const MINI_ICONS = {
    noRecord: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>`,
    optOut: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>`,
    review: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
};

const BADGE_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3BC5D6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

function loadDict(code) {
    const raw = readFileSync(resolve(ROOT, `data/i18n/${code}.json`), 'utf8');
    return JSON.parse(raw);
}

function t(dict, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : ''), dict);
}

function logoBase64() {
    const buf = readFileSync(LOGO_PATH);
    return `data:image/png;base64,${buf.toString('base64')}`;
}

function buildHTML(dict, code) {
    const isRTL = code === 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';
    const sans = isRTL ? "'Noto Naskh Arabic', sans-serif" : "'Inter', sans-serif";
    const serif = isRTL ? "'Noto Naskh Arabic', serif" : "'Merriweather', serif";
    const ls = isRTL ? 'letter-spacing:0;' : '';
    const logoSrc = logoBase64();
    const flexDir = isRTL ? 'flex-direction:row-reverse;' : '';
    const txtAlign = isRTL ? 'text-align:right;' : '';
    const txtAlignR = isRTL ? 'text-align:right;' : 'text-align:left;';
    const borderSide = isRTL ? 'right' : 'left';

    /* Languages with longer text need tighter spacing to stay on 1 page */
    const compact = (code === 'fr' || code === 'ar');

    /* Scaled-up sizing for full-page use */
    const sz = {
        heading:  isRTL ? '23px' : (compact ? '25px' : '26px'),
        intro:    isRTL ? '13px' : (compact ? '13px' : '13.5px'),
        ptTitle:  isRTL ? '14px' : (compact ? '14px' : '14.5px'),
        ptDesc:   isRTL ? '12px' : (compact ? '12px' : '12.5px'),
        quote:    isRTL ? '14px' : (compact ? '13.5px' : '14px'),
        bodyLH:   isRTL ? '1.55' : (compact ? '1.45' : '1.55'),
        descLH:   isRTL ? '1.5'  : (compact ? '1.4'  : '1.5'),
        factLabel: isRTL ? '10.5px' : '10.5px',
    };

    /* Vertical spacing — compact mode tightens margins */
    const sp = {
        pageMargin:     compact ? '6mm 10mm' : '8mm 12mm',
        outerPad:       compact ? '20px 32px 16px' : '24px 36px 20px',
        headerMB:       compact ? '16px' : '22px',
        titlePad:       compact ? '20px 24px' : '24px 28px',
        titleMB:        compact ? '16px' : '22px',
        tableMB:        compact ? '14px' : '18px',
        pointIconPad:   compact ? '9px 0' : '12px 0',
        pointTextPad:   compact ? '10px 0' : '14px 0',
        quotePad:       compact ? '12px 18px' : '16px 22px',
        quoteMB:        compact ? '14px' : '20px',
        factsPad:       compact ? '8px 10px' : '10px 12px',
        factsMB:        compact ? '14px' : '20px',
        badgesMB:       compact ? '14px' : '20px',
        dividerMB:      compact ? '12px' : '16px',
    };

    const points = [
        { icon: ICONS.mic,       title: t(dict, 'leaflet.how_title'),         desc: t(dict, 'leaflet.how_desc') },
        { icon: ICONS.block,     title: t(dict, 'leaflet.no_playback_title'), desc: t(dict, 'leaflet.no_playback_desc') },
        { icon: ICONS.lock,      title: t(dict, 'leaflet.secure_title'),      desc: t(dict, 'leaflet.secure_desc') },
        { icon: ICONS.verified,  title: t(dict, 'leaflet.review_title'),      desc: t(dict, 'leaflet.review_desc') },
        { icon: ICONS.handshake, title: t(dict, 'leaflet.optout_title'),      desc: t(dict, 'leaflet.optout_desc') },
    ];

    const iconSize = compact ? '42px' : '48px';
    const pointsHTML = points.map((p, i) => {
        const borderBot = i < points.length - 1
            ? `border-bottom:1px solid #f0f0ee;`
            : '';
        return `
      <tr>
        <td style="width:52px;vertical-align:top;padding:${sp.pointIconPad};${isRTL ? 'padding-left:16px;' : 'padding-right:16px;'}${borderBot}">
          <div style="width:${iconSize};height:${iconSize};border-radius:50%;background:rgba(59,197,214,0.08);display:flex;align-items:center;justify-content:center;">
            ${p.icon}
          </div>
        </td>
        <td style="vertical-align:top;padding:${sp.pointTextPad};${borderBot}">
          <div style="font-size:${sz.ptTitle};font-weight:700;color:#09263a;margin-bottom:2px;font-family:${sans};${ls}">${p.title}</div>
          <div style="font-size:${sz.ptDesc};color:#526675;line-height:${sz.descLH};font-family:${sans};${ls}">${p.desc}</div>
        </td>
      </tr>`;
    }).join('');

    const badges = [
        t(dict, 'leaflet.badge_hipaa'),
        t(dict, 'leaflet.badge_gdpr'),
        t(dict, 'leaflet.badge_soc2'),
        t(dict, 'leaflet.badge_iso'),
    ];

    const badgesHTML = badges.map(b => `
      <span style="display:inline-flex;align-items:center;gap:5px;background:#f0fafb;color:#09263a;font-size:11px;font-weight:600;padding:6px 14px;border-radius:20px;border:1px solid rgba(59,197,214,0.2);${ls}">
        ${BADGE_CHECK} ${b}
      </span>
    `).join('');

    /* Key-facts strip — 3 mini cards reinforcing core promises */
    const facts = [
        { icon: MINI_ICONS.noRecord, text: t(dict, 'leaflet.no_playback_title') },
        { icon: MINI_ICONS.optOut,   text: t(dict, 'leaflet.optout_title') },
        { icon: MINI_ICONS.review,   text: t(dict, 'leaflet.review_title') },
    ];
    const factsHTML = facts.map(f => `
      <div style="flex:1;background:#f8fbfc;border:1px solid #e8f4f6;border-radius:8px;padding:${sp.factsPad};display:flex;align-items:center;gap:8px;${flexDir}">
        ${f.icon}
        <span style="font-size:${sz.factLabel};font-weight:600;color:#09263a;line-height:1.3;${ls}">${f.text}</span>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="${code}" dir="${dir}">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ${sans};
    color: #09263a;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @page { size: A4; margin: ${sp.pageMargin}; }
</style>
</head>
<body>

<!-- Accent bar -->
<div style="height:5px;background:linear-gradient(90deg,#3BC5D6 0%,#2DAAB9 50%,#3BC5D6 100%);"></div>

<div style="padding:${sp.outerPad};">

  <!-- ═══ Header ═══ -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:${sp.headerMB};${flexDir}">
    <div style="display:flex;align-items:center;gap:14px;${flexDir}">
      <img src="${logoSrc}" style="height:42px;width:auto;" alt="ClinixSummary">
      <div${isRTL ? ' style="text-align:right;"' : ''}>
        <div style="font-family:${serif};font-size:22px;font-weight:700;color:#09263a;${ls}">ClinixSummary</div>
        <div style="font-size:10.5px;color:#526675;${isRTL ? ls : 'letter-spacing:0.6px;'}text-transform:${isRTL ? 'none' : 'uppercase'};font-weight:500;">AI-Powered Clinical Documentation</div>
      </div>
    </div>
  </div>

  <!-- ═══ Title block ═══ -->
  <div style="background:linear-gradient(135deg,#f0fafb 0%,#e4f5f7 100%);padding:${sp.titlePad};border-radius:12px;margin-bottom:${sp.titleMB};border-${borderSide}:5px solid #3BC5D6;${txtAlign}">
    <h1 style="font-family:${serif};font-size:${sz.heading};font-weight:700;color:#09263a;margin-bottom:8px;line-height:1.25;${ls}">${t(dict, 'leaflet.heading')}</h1>
    <p style="font-size:${sz.intro};color:#526675;line-height:${sz.bodyLH};margin:0;font-family:${sans};${ls}">${t(dict, 'leaflet.intro')}</p>
  </div>

  <!-- ═══ Points ═══ -->
  <table style="width:100%;border-collapse:collapse;margin-bottom:${sp.tableMB};${isRTL ? 'direction:rtl;' : ''}">
    ${pointsHTML}
  </table>

  <!-- ═══ Quote ═══ -->
  <div style="background:#F8F8F6;border-${borderSide}:4px solid #3BC5D6;padding:${sp.quotePad};border-radius:${isRTL ? '10px 0 0 10px' : '0 10px 10px 0'};margin-bottom:${sp.quoteMB};">
    <p style="font-family:${serif};font-style:italic;font-size:${sz.quote};color:#09263a;line-height:1.45;margin:0;${txtAlign}${ls}">&ldquo;${t(dict, 'leaflet.quote')}&rdquo;</p>
  </div>

  <!-- ═══ Key facts strip ═══ -->
  <div style="display:flex;gap:10px;margin-bottom:${sp.factsMB};${flexDir}">
    ${factsHTML}
  </div>

  <!-- ═══ Compliance badges ═══ -->
  <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:${sp.badgesMB};">
    ${badgesHTML}
  </div>

  <!-- ═══ Divider ═══ -->
  <div style="height:1px;background:linear-gradient(90deg,transparent 0%,#ddd 20%,#ddd 80%,transparent 100%);margin-bottom:${sp.dividerMB};"></div>

  <!-- ═══ Footer ═══ -->
  <div style="text-align:center;">
    <p style="font-size:11.5px;color:#526675;margin:0 0 4px;">${t(dict, 'leaflet.footer_questions')}</p>
    <span style="display:inline-block;color:#3BC5D6;font-weight:700;font-size:17px;margin:3px 0 8px;font-family:${sans};">clinixsummary.ai</span>
    <p style="font-size:9px;color:#999;margin:0;">${t(dict, 'leaflet.footer_copy')}</p>
  </div>

</div>
</body>
</html>`;
}

/* ── Generate ─────────────────────────────────────────────────── */
mkdirSync(OUTPUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

for (const lang of LANGS) {
    const dict = loadDict(lang.code);
    const html = buildHTML(dict, lang.code);

    const htmlPath = resolve(TMP_DIR, `leaflet-${lang.code}.html`);
    const pdfPath = resolve(OUTPUT_DIR, `patient-privacy-notice-${lang.code}.pdf`);

    writeFileSync(htmlPath, html, 'utf8');

    try {
        execSync(
            `"${CHROME_PATH}" --headless --no-sandbox --disable-setuid-sandbox --disable-gpu ` +
            `--print-to-pdf="${pdfPath}" --no-pdf-header-footer ` +
            `--run-all-compositor-stages-before-draw --virtual-time-budget=10000 ` +
            `"file://${htmlPath}"`,
            { stdio: 'pipe', timeout: 30000 }
        );
        console.log(`  ✓ ${lang.name} (${lang.code})`);
    } catch (err) {
        console.error(`  ✗ ${lang.name} failed:`, err.stderr?.toString()?.slice(0, 200) || err.message);
    }
}

execSync(`rm -rf "${TMP_DIR}"`);
console.log('\n  All 6 leaflet PDFs generated → assets/leaflets/');
