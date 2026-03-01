/**
 * ClinixSummary SEO Module
 * Updates document title, meta description, canonical URL, Open Graph and
 * Twitter Card tags on every route change so that each SPA page is properly
 * identified by search engines and social-media crawlers.
 *
 * Usage:
 *   Call  updatePageMeta(path)  from the router after rendering a page.
 *   On language switch, call it again so translated titles are applied.
 */

const SEO = (() => {
    const SITE = 'ClinixSummary';
    // Derive origin from deployment context so canonical/OG URLs match the live host
    const ORIGIN = window.location.origin + (window.BASEPATH || '');

    // Map every SPA route to its i18n title/description keys.
    // titleKey  → resolved via t(); shown as "{title} – ClinixSummary"
    // descKey   → resolved via t(); used for meta description (auto-truncated)
    // When a key is null the corresponding *Fallback string is used instead.
    const META = {
        '/':                    { titleKey: 'meta.title',                     descKey: 'meta.description' },
        '/pricing':             { titleKey: 'pricing.title',                  descKey: 'pricing.description' },
        '/roi-calculator':      { titleKey: 'calculator.title',               descKey: 'calculator.description' },
        '/contact':             { titleKey: 'contact.title',                  descKey: 'contact.desc' },

        // Meet ClinixSummary
        '/meticulous-notes':    { titleKey: 'notes.title',                    descKey: 'notes.desc' },
        '/proprietary-models':  { titleKey: 'models.title',                   descKey: 'models.desc' },
        '/kaizen':              { titleKey: 'kaizen.title',                   descKey: 'kaizen.desc' },
        '/security':            { titleKey: 'security.title',                 descKey: null, descFallback: 'Trust Center \u2014 HIPAA, GDPR, SOC 2 aligned. Sub-processor transparency, encryption, ephemeral audio, and quality management powered by ClinixQM.' },
        '/languages':           { titleKey: 'lang.title',                     descKey: 'lang.desc' },
        '/auto-ambient':        { titleKey: 'ambient.title',                  descKey: 'ambient.desc' },
        '/cme-vault':           { titleKey: 'cme.title',                      descKey: 'cme.desc' },
        '/clinix-foundation':   { titleKey: 'foundation.title',               descKey: 'foundation.desc' },

        // Solutions
        '/clinicians':          { titleKey: 'clinicians.title',               descKey: 'clinicians.description' },
        '/organizations':       { titleKey: 'orgs.title',                     descKey: 'orgs.description' },
        '/insurers':            { titleKey: 'insurers.title',                 descKey: 'insurers.description' },
        '/government':          { titleKey: 'government.title',               descKey: 'government.description' },
        '/nonprofit':           { titleKey: 'nonprofit.title',                descKey: 'nonprofit.description' },
        '/integrations':        { titleKey: 'integrations.title',             descKey: 'integrations.description' },

        // Capabilities
        '/cap-medical':         { titleKey: 'cap_medical.title',              descKey: 'cap_medical.description' },
        '/cap-dental':          { titleKey: 'cap_dental.title',               descKey: 'cap_dental.description' },
        '/cap-psychiatry':      { titleKey: 'cap_psychiatry.title',           descKey: 'cap_psychiatry.description' },
        '/cap-psychology':      { titleKey: 'cap_psychology.title',           descKey: 'cap_psychology.description' },
        '/cap-allied-health':   { titleKey: 'allied.title',                   descKey: 'allied.desc' },
        '/cap-midwifery':       { titleKey: 'cap_midwifery.title',            descKey: 'cap_midwifery.description' },
        '/cap-vet':             { titleKey: 'cap_vet.title',                  descKey: 'cap_vet.description' },
        '/cap-operative':       { titleKey: 'cap_operative.title',            descKey: 'cap_operative.description' },
        '/billing-assist':      { titleKey: 'billing.title',                  descKey: 'billing.desc' },
        '/cap-patient-leaflet': { titleKey: 'cap_leaflet.title',              descKey: 'cap_leaflet.description' },
        '/referrals':           { titleKey: 'referrals_page.title',           descKey: 'referrals_page.description' },
        '/icd-coding':          { titleKey: 'icd_page.title',                 descKey: 'icd_page.description' },
        '/radiology-assist':    { titleKey: 'radiology_assist_page.title',    descKey: 'radiology_assist_page.description' },
        '/dermatology-assist':  { titleKey: 'dermatology_assist_page.title',  descKey: 'dermatology_assist_page.description' },
        '/triage-assist':       { titleKey: 'triage_assist_page.title',       descKey: 'triage_assist_page.description' },

        // Learn
        '/publications':        { titleKey: 'papers.pub_title',               descKey: 'papers.pub_desc' },
        '/whitepapers':         { titleKey: 'papers.wp_title',                descKey: 'papers.wp_desc' },
        '/case-studies':        { titleKey: null, titleFallback: 'Case Studies', descKey: null, descFallback: 'Real-world case studies showing how ClinixSummary transforms clinical documentation workflows.' },
        '/news':                { titleKey: 'news.title',                     descKey: 'news.description' },

        // Company
        '/story':               { titleKey: 'story.title',                    descKey: 'story.description' },
        '/careers':             { titleKey: 'careers.title',                  descKey: 'careers.desc' },

        // Legal
        '/privacy-policy':      { titleKey: 'privacy_policy.title',           descKey: 'privacy_policy.intro' },
        '/privacy-choices':     { titleKey: 'privacy_choices.title',          descKey: 'privacy_choices.intro' },
        '/terms-enterprise':    { titleKey: 'terms_enterprise.title',         descKey: 'terms_enterprise.intro' },
        '/usage-policy':        { titleKey: 'usage_policy.title',             descKey: 'usage_policy.intro' },
        '/baa':                 { titleKey: 'baa.title',                      descKey: 'baa.intro' },
        '/dpa':                 { titleKey: 'dpa.title',                      descKey: 'dpa.intro' },
        '/terms':               { titleKey: 'terms.title',                    descKey: 'terms.intro' },
        '/leaflet':             { titleKey: 'leaflet.page_title',             descKey: 'leaflet.subtitle' },
    };

    /**
     * Truncate a string to a maximum length, breaking at word boundaries.
     */
    function truncate(str, max) {
        if (!str || str.length <= max) return str;
        var cut = str.slice(0, max);
        var last = cut.lastIndexOf(' ');
        return (last > 0 ? cut.slice(0, last) : cut) + '…';
    }

    /**
     * Update all head meta tags for the given SPA route.
     * @param {string} path  The current pathname, e.g. "/pricing"
     */
    function updatePageMeta(path) {
        var entry = META[path] || META['/'];

        // --- Title ---
        var rawTitle;
        if (entry.titleKey) {
            rawTitle = typeof t === 'function' ? t(entry.titleKey) : null;
            // If t() returned the key itself (no translation found), fall back
            if (rawTitle === entry.titleKey) rawTitle = entry.titleFallback || null;
        } else {
            rawTitle = entry.titleFallback || null;
        }

        if (path === '/') {
            // Homepage title already includes the site name
            document.title = rawTitle || SITE;
        } else {
            document.title = rawTitle ? rawTitle + ' – ' + SITE : SITE;
        }

        // --- Description ---
        var rawDesc;
        if (entry.descKey) {
            rawDesc = typeof t === 'function' ? t(entry.descKey) : null;
            if (rawDesc === entry.descKey) rawDesc = entry.descFallback || null;
        } else {
            rawDesc = entry.descFallback || null;
        }
        var desc = truncate(rawDesc, 160) || '';

        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = desc;

        // --- Canonical URL ---
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = ORIGIN + (path === '/' ? '/' : path);

        // --- Open Graph ---
        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = document.title;

        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.content = desc;

        var ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.content = ORIGIN + (path === '/' ? '/' : path);

        // --- Twitter Card ---
        var twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.content = document.title;

        var twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.content = desc;
    }

    return { updatePageMeta: updatePageMeta };
})();
