/**
 * ClinixSummary i18n Module
 * Lightweight internationalisation for a static SPA.
 *
 * Usage:
 *   - Add  data-i18n="section.key"  to any element whose textContent should be translated.
 *   - Add  data-i18n-placeholder="section.key"  for input placeholders.
 *   - Add  data-i18n-title="section.key"  for title attributes.
 *   - Call  I18n.translatePage()  after injecting dynamic HTML.
 *   - Call  t('section.key')  in JS for programmatic strings.
 *
 * Adding a new language:
 *   1. Add an entry to  data/i18n/locales.json.
 *   2. Create  data/i18n/<code>.json  with the same key structure as en.json.
 *   3. Done – the switcher picks it up automatically.
 */

const I18n = (() => {
    /* ── state ──────────────────────────────────────────── */
    let _locale = 'en';
    let _dir = 'ltr';
    let _locales = {};
    let _config = {};
    let _dictionaries = {};   // { en: {…}, fr: {…}, … }
    let _ready = false;
    const _basePath = (() => {
        const s = document.querySelector('script[src*="i18n.js"]');
        if (!s) return '';
        const parts = s.src.split('/');
        parts.pop(); // remove i18n.js
        parts.pop(); // remove js/
        return parts.join('/') + '/';
    })();

    /* ── helpers ─────────────────────────────────────────── */
    function resolvePath(obj, dotKey) {
        return dotKey.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
    }

    async function loadJSON(url) {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Failed to load ${url}`);
        return resp.json();
    }

    /* ── core API ────────────────────────────────────────── */
    async function init() {
        // 1. Load registry & config
        [_locales, _config] = await Promise.all([
            loadJSON(_basePath + 'data/i18n/locales.json'),
            loadJSON(_basePath + 'data/i18n/config.json')
        ]);

        // 2. Determine locale  (URL ?lang= → localStorage → browser → default)
        const params = new URLSearchParams(window.location.search);
        const fromURL = params.get(_config.queryParam);
        const fromStorage = localStorage.getItem(_config.storageKey);
        const fromBrowser = (navigator.language || '').slice(0, 2);
        const candidate = fromURL || fromStorage || fromBrowser || _config.defaultLocale;
        _locale = _locales[candidate] ? candidate : _config.defaultLocale;

        // 3. Load dictionaries (always load English as fallback, plus selected)
        const loads = [loadJSON(_basePath + 'data/i18n/en.json')];
        if (_locale !== 'en') {
            loads.push(loadJSON(_basePath + 'data/i18n/' + _locale + '.json'));
        }
        const results = await Promise.all(loads);
        _dictionaries['en'] = results[0];
        if (results[1]) _dictionaries[_locale] = results[1];

        // 4. Apply direction & lang
        _dir = _locales[_locale].dir;
        document.documentElement.lang = _locale;
        document.documentElement.dir = _dir;

        // 5. Persist
        localStorage.setItem(_config.storageKey, _locale);
        updateURLParam();

        // 6. Update meta
        const metaTitle = t('meta.title');
        if (metaTitle) document.title = metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        const descText = t('meta.description');
        if (metaDesc && descText) metaDesc.content = descText;

        // 7. Translate static chrome
        translatePage();

        // 8. Build switcher
        buildSwitcher();

        _ready = true;
    }

    /**
     * Translate a single key.
     * @param {string} key  Dot-notation key, e.g. "nav.solutions"
     * @param {string} [fallback]  Optional fallback string
     * @returns {string}
     */
    function t(key, fallback) {
        const dict = _dictionaries[_locale] || _dictionaries['en'];
        const val = resolvePath(dict, key);
        if (val !== undefined) return val;
        // Fallback to English
        const enVal = resolvePath(_dictionaries['en'], key);
        if (enVal !== undefined) return enVal;
        return fallback || key;
    }

    /**
     * Scan the DOM for [data-i18n] attributes and replace text.
     * Call this after every router page render.
     */
    function translatePage() {
        // textContent
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = t(key);
            if (val && val !== key) el.textContent = val;
        });

        // placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = t(key);
            if (val && val !== key) el.placeholder = val;
        });

        // title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const val = t(key);
            if (val && val !== key) el.title = val;
        });
    }

    /**
     * Show a banner on non-translated routes.
     */
    function handleNonTranslatedRoute(hash) {
        if (_locale === 'en') return;
        const routes = _config.nonTranslatedRoutes || [];
        if (!routes.includes(hash)) return;

        const existing = document.getElementById('i18n-english-banner');
        if (existing) return; // already shown

        const banner = document.createElement('div');
        banner.id = 'i18n-english-banner';
        banner.className = 'i18n-banner';
        banner.innerHTML = `
            <span class="material-symbols-rounded" style="font-size:18px;vertical-align:middle;margin-right:6px;">translate</span>
            ${t('banner.english_only')}
        `;
        const appContent = document.getElementById('app-content');
        if (appContent && appContent.firstChild) {
            // Insert inside the first section, after the subpage-header
            const header = appContent.querySelector('.subpage-header');
            if (header) {
                header.parentNode.insertBefore(banner, header.nextSibling);
            } else {
                appContent.prepend(banner);
            }
        }
    }

    /* ── URL management ──────────────────────────────────── */
    function updateURLParam() {
        const params = new URLSearchParams(window.location.search);
        if (_locale === _config.defaultLocale) {
            params.delete(_config.queryParam);
        } else {
            params.set(_config.queryParam, _locale);
        }
        const qs = params.toString();
        const newURL = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
        window.history.replaceState(null, '', newURL);
    }

    /* ── language switching ──────────────────────────────── */
    async function switchLanguage(code) {
        if (!_locales[code] || code === _locale) return;
        _locale = code;
        _dir = _locales[code].dir;
        localStorage.setItem(_config.storageKey, _locale);

        // Load dictionary if not cached
        if (!_dictionaries[_locale]) {
            _dictionaries[_locale] = await loadJSON(_basePath + 'data/i18n/' + _locale + '.json');
        }

        // Update document
        document.documentElement.lang = _locale;
        document.documentElement.dir = _dir;
        updateURLParam();

        // Update meta
        const metaTitle = t('meta.title');
        if (metaTitle) document.title = metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        const descText = t('meta.description');
        if (metaDesc && descText) metaDesc.content = descText;

        // Re-render current page via router (triggers translatePage)
        if (typeof router === 'function') router();

        // Translate static chrome (navbar/footer)
        translatePage();

        // Update switcher active state
        updateSwitcherState();
    }

    /* ── language switcher UI ────────────────────────────── */
    function buildSwitcher() {
        const container = document.getElementById('lang-switcher');
        if (!container) return;

        let html = `<button class="lang-switcher-btn" aria-label="Change language">
            <span class="material-symbols-rounded" style="font-size:18px;">language</span>
            <span class="lang-code">${_locale.toUpperCase()}</span>
            <span class="material-symbols-rounded" style="font-size:16px;">expand_more</span>
        </button>
        <div class="lang-dropdown">`;

        Object.entries(_locales).forEach(([code, info]) => {
            const active = code === _locale ? ' active' : '';
            html += `<button class="lang-option${active}" data-lang="${code}">
                <span class="lang-native">${info.native}</span>
                <span class="lang-english">${info.label}</span>
            </button>`;
        });

        html += '</div>';
        container.innerHTML = html;

        // Toggle dropdown
        const btn = container.querySelector('.lang-switcher-btn');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle('open');
        });

        // Language selection
        container.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const code = opt.getAttribute('data-lang');
                container.classList.remove('open');
                switchLanguage(code);
            });
        });

        // Close on outside click
        document.addEventListener('click', () => {
            container.classList.remove('open');
        });
    }

    function updateSwitcherState() {
        const container = document.getElementById('lang-switcher');
        if (!container) return;
        const codeEl = container.querySelector('.lang-code');
        if (codeEl) codeEl.textContent = _locale.toUpperCase();

        container.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === _locale);
        });
    }

    /* ── public interface ────────────────────────────────── */
    return {
        init,
        t,
        translatePage,
        handleNonTranslatedRoute,
        switchLanguage,
        get locale() { return _locale; },
        get dir() { return _dir; },
        get locales() { return _locales; },
        get ready() { return _ready; }
    };
})();

// Global shortcut
function t(key, fallback) {
    return I18n.t(key, fallback);
}
