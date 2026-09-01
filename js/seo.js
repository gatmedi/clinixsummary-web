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
        '/pricing':             { titleKey: 'pricing.seo_title',              descKey: 'pricing.seo_desc', titleFallback: 'Pricing – Free Plan & Transparent Credit Plans', descFallback: 'ClinixSummary pricing: start free with 25 monthly credits, no credit card, then transparent credit-based AI medical scribe plans from $9.99/month. Pay in 12 currencies. Cancel anytime.' },
        '/roi-calculator':      { titleKey: 'calculator.title',               descKey: 'calculator.description' },
        '/contact':             { titleKey: 'contact.title',                  descKey: 'contact.desc' },

        // Meet ClinixSummary
        '/ai-clinical-notes':    { titleKey: 'notes.seo_title',                    descKey: 'notes.seo_desc' },
        '/proprietary-models':  { titleKey: 'models.title',                   descKey: 'models.desc' },
        '/kaizen':              { titleKey: 'kaizen.title',                   descKey: 'kaizen.desc' },
        '/security':            { titleKey: 'security.title',                 descKey: null, descFallback: 'Trust Center \u2014 HIPAA, GDPR, SOC 2 aligned. Sub-processor transparency, encryption, ephemeral audio, and quality management powered by ClinixQM.' },
        '/multilingual-ai-scribe':           { titleKey: 'lang.seo_title',                     descKey: 'lang.seo_desc' },
        '/ambient-ai-scribe':        { titleKey: 'ambient.seo_title',                  descKey: 'ambient.seo_desc' },
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
        '/ai-medical-scribe':         { titleKey: 'cap_medical.seo_title',              descKey: 'cap_medical.seo_desc' },
        '/dental-ai-scribe':          { titleKey: 'cap_dental.title',               descKey: 'cap_dental.description' },
        '/psychiatry-ai-scribe':      { titleKey: 'cap_psychiatry.title',           descKey: 'cap_psychiatry.description' },
        '/psychology-ai-scribe':      { titleKey: 'cap_psychology.title',           descKey: 'cap_psychology.description' },
        '/allied-health-ai-scribe':   { titleKey: 'allied.title',                   descKey: 'allied.desc' },
        '/physiotherapy-ai-scribe': { titleKey: 'physio_page.seo_title',    descKey: 'physio_page.seo_desc' },
        '/occupational-therapy-ai-scribe': { titleKey: 'ot_page.seo_title', descKey: 'ot_page.seo_desc' },
        '/speech-therapy-ai-scribe': { titleKey: 'slt_page.seo_title',      descKey: 'slt_page.seo_desc' },
        '/nutrition-ai-scribe':     { titleKey: 'nutrition_page.seo_title', descKey: 'nutrition_page.seo_desc' },
        '/midwifery-ai-scribe':       { titleKey: 'cap_midwifery.title',            descKey: 'cap_midwifery.description' },
        '/veterinary-ai-scribe':             { titleKey: 'cap_vet.seo_title',                  descKey: 'cap_vet.seo_desc' },
        '/operative-note-ai':       { titleKey: 'cap_operative.title',            descKey: 'cap_operative.description' },
        '/medical-billing-ai':      { titleKey: 'billing.title',                  descKey: 'billing.desc' },
        '/patient-leaflet-generator': { titleKey: 'cap_leaflet.title',              descKey: 'cap_leaflet.description' },
        '/referral-letter-ai':           { titleKey: 'referrals_page.title',           descKey: 'referrals_page.description' },
        '/icd-coding':          { titleKey: 'icd_page.title',                 descKey: 'icd_page.description' },
        '/radiology-ai':    { titleKey: 'radiology_assist_page.title',    descKey: 'radiology_assist_page.description' },
        '/dermatology-ai':  { titleKey: 'dermatology_assist_page.title',  descKey: 'dermatology_assist_page.description' },
        '/medical-triage-ai':       { titleKey: 'triage_assist_page.title',       descKey: 'triage_assist_page.description' },

        // Learn
        '/publications':        { titleKey: 'papers.pub_title',               descKey: 'papers.pub_desc' },
        '/whitepapers':         { titleKey: 'papers.wp_title',                descKey: 'papers.wp_desc' },
        '/whitepapers/arabic-medical-nlp': { titleKey: null, titleFallback: 'AI & Arabic Medical Language Processing - Whitepaper', descKey: null, descFallback: 'Why Arabic is among the hardest languages for clinical NLP - morphology, dialects, code-switching - and ClinixSummary\'s reported recognition results. By Dr Youssef Ghaly & Dr Mostafa Helmy.' },
        '/whitepapers/gdpr-clinical-documentation': { titleKey: null, titleFallback: 'GDPR Compliance Framework for AI Clinical Documentation - Whitepaper', descKey: null, descFallback: 'Legal bases, CNIL-methodology DPIA, data minimisation, patient rights and HDS hosting for AI-generated clinical notes. By Dr Youssef Ghaly & Dr Mostafa Helmy.' },
        '/whitepapers/ambient-audio-processing': { titleKey: null, titleFallback: 'Ambient Audio Processing: From Sound to Structured Note - Whitepaper', descKey: null, descFallback: 'How raw consultation audio becomes a structured clinical note - diarisation, medical NER, section classification and note assembly. By Dr Youssef Ghaly & Dr Mostafa Helmy.' },
        '/whitepapers/quality-management-system': { titleKey: null, titleFallback: 'Quality Management System (QMS): How Clinix QM Works - Whitepaper', descKey: null, descFallback: 'The QA review process, feedback incorporation, model versioning and continuous improvement behind ClinixSummary\'s clinical outputs. By Dr Youssef Ghaly & Dr Mostafa Helmy.' },
        '/whitepapers/security-compliance-specification': { titleKey: null, titleFallback: 'Security & Compliance Technical Specification - Whitepaper', descKey: null, descFallback: 'Encryption, access controls, audit logging and regulatory measures in ClinixSummary\'s architecture - a specification for CISOs and compliance officers. By Dr Youssef Ghaly & Dr Mostafa Helmy.' },
        '/whitepapers/ehr-integration-framework': { titleKey: null, titleFallback: 'EHR/EMR Integration Framework - Whitepaper', descKey: null, descFallback: 'API specifications, data formats, FHIR compatibility and deployment models for connecting ClinixSummary to EHR/EMR systems. By Dr Youssef Ghaly & Dr Mostafa Helmy.' },
        '/whitepapers/clinical-model-training': { titleKey: null, titleFallback: 'Clinical Model Training Methodology - Whitepaper', descKey: null, descFallback: 'De-identified data sourcing, training pipeline, specialty fine-tuning and evaluation metrics behind ClinixSummary\'s clinical models. By Dr Youssef Ghaly & Dr Mostafa Helmy.' },
        '/whitepapers/architecture-overview': { titleKey: null, titleFallback: 'ClinixSummary Architecture: A Technical Overview - Whitepaper', descKey: null, descFallback: 'System architecture, model pipeline, audio processing, NLP layers and output generation - how clinical audio becomes structured documentation. By Dr Youssef Ghaly & Dr Mostafa Helmy.' },
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

        // Help & Support
                '/compare':                     { titleKey: null, titleFallback: 'Compare AI Medical Scribes - ClinixSummary vs Alternatives', descKey: null, descFallback: 'Side-by-side comparisons of ClinixSummary with Heidi, Freed, Nabla, Suki and DeepScribe: specialty coverage, note languages, pricing, compliance and platforms.' },
        '/clinixsummary-vs-heidi':      { titleKey: null, titleFallback: 'ClinixSummary vs Heidi Health - AI Medical Scribe Comparison', descKey: null, descFallback: 'Heidi Health vs ClinixSummary compared: veterinary and allied-health coverage, note languages, pricing, MHRA/UKCA regulation and platforms. Verified from public sources.' },
        '/clinixsummary-vs-freed':      { titleKey: null, titleFallback: 'ClinixSummary vs Freed - AI Medical Scribe Comparison', descKey: null, descFallback: 'Freed vs ClinixSummary compared: specialty coverage, note languages, pricing, compliance and platforms. Verified from public sources.' },
        '/clinixsummary-vs-nabla':      { titleKey: null, titleFallback: 'ClinixSummary vs Nabla - AI Medical Scribe Comparison', descKey: null, descFallback: 'Nabla vs ClinixSummary compared: multilingual notes, pricing transparency, compliance certifications, MHRA/UKCA regulation and platforms.' },
        '/clinixsummary-vs-suki':       { titleKey: null, titleFallback: 'ClinixSummary vs Suki - AI Medical Scribe Comparison', descKey: null, descFallback: 'Suki vs ClinixSummary compared: self-serve vs sales-led pricing, specialty coverage, note languages, compliance and platforms.' },
        '/clinixsummary-vs-deepscribe': { titleKey: null, titleFallback: 'ClinixSummary vs DeepScribe - AI Medical Scribe Comparison', descKey: null, descFallback: 'DeepScribe vs ClinixSummary compared: specialty focus, note languages, pricing access, Android availability and MHRA/UKCA regulation.' },
'/status':              { titleKey: 'status.title',  titleFallback: 'System Status',  descKey: 'status.desc',  descFallback: 'Live operational status of ClinixSummary services — console, API, transcription, document generation and integrations.' },
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

        // --- Canonical URL (trailing-slash form matches the prerendered files) ---
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = ORIGIN + (path === '/' ? '/' : path + '/');

        // --- Open Graph ---
        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = document.title;

        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.content = desc;

        var ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.content = ORIGIN + (path === '/' ? '/' : path + '/');

        // --- Twitter Card ---
        var twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.content = document.title;

        var twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.content = desc;
    }

    return { updatePageMeta: updatePageMeta };
})();
