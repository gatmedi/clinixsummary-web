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
    let _pathLocale = null;   // locale encoded in the URL path prefix (SSG pages)
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
        // cache: 'no-cache' = revalidate with the server every time (ETag ->
        // 304 when unchanged). Without it a browser can hold a dictionary for
        // weeks, and a wording change stays invisible to returning visitors.
        const resp = await fetch(url, { cache: 'no-cache' });
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

        // 2. Determine locale  (URL path prefix → ?lang= → localStorage → browser → default)
        // Prerendered locale pages (/fr/…, /ar/…) declare their locale via
        // window.BASEPATH — the path prefix always wins so the served content,
        // canonical URL and applied language can never disagree.
        const bp = window.BASEPATH || '';
        _pathLocale = (/^\/[a-z]{2}$/.test(bp) && _locales[bp.slice(1)]) ? bp.slice(1) : null;
        const params = new URLSearchParams(window.location.search);
        const fromURL = params.get(_config.queryParam);
        const fromStorage = localStorage.getItem(_config.storageKey);
        const fromBrowser = (navigator.language || '').slice(0, 2);
        const candidate = _pathLocale || fromURL || fromStorage || fromBrowser || _config.defaultLocale;
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
        persistLocaleCookie(_locale);
        updateURLParam();

        // 6. Update meta (delegated to SEO module if available, else basic fallback)
        if (typeof SEO !== 'undefined') {
            const _bp = window.BASEPATH || '';
            const _raw = window.location.pathname || '/';
            const _route = (_bp && _raw.startsWith(_bp)) ? (_raw.slice(_bp.length) || '/') : _raw;
            SEO.updatePageMeta(_route);
        } else {
            const metaTitle = t('meta.title');
            if (metaTitle) document.title = metaTitle;
            const metaDesc = document.querySelector('meta[name="description"]');
            const descText = t('meta.description');
            if (metaDesc && descText) metaDesc.content = descText;
        }

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

        // innerHTML (for elements containing markup like <strong>, <a>)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const val = t(key);
            if (val && val !== key) el.innerHTML = typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(val) : val;
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
            <span class="material-symbols-rounded" style="font-size:18px;vertical-align:middle;margin-inline-end:6px;">translate</span>
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
        if (_pathLocale || _locale === _config.defaultLocale) {
            // Locale-prefixed URLs already encode the language — a ?lang=
            // duplicate would create parallel URLs for the same content.
            params.delete(_config.queryParam);
        } else {
            params.set(_config.queryParam, _locale);
        }
        const qs = params.toString();
        const newURL = window.location.pathname + (qs ? '?' + qs : '');
        window.history.replaceState(null, '', newURL);
    }

    /* ── language switching ──────────────────────────────── */

    /**
     * Mirror the chosen locale into a cookie the web console can read.
     *
     * This site persists to localStorage, which is invisible to Laravel. So a
     * visitor could read every page here in French, click through to the console,
     * and land in English - because the console's t() reads a session value that
     * nothing had ever seeded. This cookie is the bridge.
     *
     * Set on the apex domain so it reaches the console, which Laravel serves from
     * the same host. SameSite=Lax is right: it is a preference, not a credential,
     * and it has to survive a top-level navigation from here to /console. Laravel
     * excepts this name from cookie encryption, because a static page has no way
     * to encrypt anything.
     */
    function persistLocaleCookie(code) {
        try {
            if (!code) return;
            var oneYear = 60 * 60 * 24 * 365;
            var secure  = window.location.protocol === 'https:' ? '; Secure' : '';
            document.cookie = 'cs_locale=' + encodeURIComponent(code)
                + '; Max-Age=' + oneYear + '; Path=/; SameSite=Lax' + secure;
        } catch (e) {
            // A blocked cookie must never stop the page translating.
        }
    }

    async function switchLanguage(code) {
        if (!_locales[code] || code === _locale) return;

        // On prerendered (SSG) pages every language lives at its own URL
        // (/fr/…, /ar/… with English at the root), so switching language is a
        // navigation — that keeps the visible content, <html lang/dir>, the
        // canonical URL and hreflang all consistent. English-only routes keep
        // the legacy in-place switch (they have no locale URLs).
        if (document.documentElement.hasAttribute('data-ssg')) {
            const bp = window.BASEPATH || '';
            let route = window.location.pathname;
            if (bp && route.startsWith(bp)) route = route.slice(bp.length) || '/';
            if (route.length > 1 && route.endsWith('/')) route = route.slice(0, -1);
            const nonTranslated = _config.nonTranslatedRoutes || [];
            if (!nonTranslated.includes(route)) {
                localStorage.setItem(_config.storageKey, code);
                persistLocaleCookie(code);
                const prefix = code === _config.defaultLocale ? '' : '/' + code;
                window.location.href = prefix + (route === '/' ? '/' : route + '/');
                return;
            }
        }

        _locale = code;
        _dir = _locales[code].dir;
        localStorage.setItem(_config.storageKey, _locale);
        persistLocaleCookie(_locale);

        // Load dictionary if not cached
        if (!_dictionaries[_locale]) {
            _dictionaries[_locale] = await loadJSON(_basePath + 'data/i18n/' + _locale + '.json');
        }

        // Update document
        document.documentElement.lang = _locale;
        document.documentElement.dir = _dir;
        updateURLParam();

        // Re-render current page via router (triggers translatePage + SEO update)
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
