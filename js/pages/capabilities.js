// --- Capability / Specialty Pages ---

/**
 * Helper: creates a standard capability subpage from a configuration object.
 *
 * @param {Object} config
 * @param {string} config.kicker       - Small label above the title
 * @param {string} config.title        - Main page heading
 * @param {string} config.description  - Introductory paragraph
 * @param {Array}  config.features     - [{icon, title, desc}, ...]
 * @param {string} [config.extraContent] - Additional HTML injected after the
 *                                         feature grid and before the CTA
 * @returns {string} Full subpage HTML
 */

// ---------------------------------------------------------------------------
// Related-capability mesh (SEO/GEO plan 4.4, spec §9.2 / LINK rules).
// Every child capability page links UP to the category owner and ACROSS to
// 2-3 clinically adjacent siblings. Labels reuse each target page's own
// localized kicker key, so no new translations are needed.
// ---------------------------------------------------------------------------
const CAP_ROUTE_NS = {
    '/dental-ai-scribe': 'cap_dental',
    '/psychiatry-ai-scribe': 'cap_psychiatry',
    '/psychology-ai-scribe': 'cap_psychology',
    '/physiotherapy-ai-scribe': 'physio_page',
    '/occupational-therapy-ai-scribe': 'ot_page',
    '/speech-therapy-ai-scribe': 'slt_page',
    '/nutrition-ai-scribe': 'nutrition_page',
    '/midwifery-ai-scribe': 'cap_midwifery',
    '/veterinary-ai-scribe': 'cap_vet',
    '/operative-note-ai': 'cap_operative',
    '/medical-billing-ai': 'billing',
    '/patient-leaflet-generator': 'cap_leaflet',
    '/referral-letter-ai': 'referrals_page',
    '/icd-coding': 'icd_page',
    '/radiology-ai': 'radiology_assist_page',
    '/dermatology-ai': 'dermatology_assist_page',
    '/medical-triage-ai': 'triage_assist_page',
};

const CAP_SIBLINGS = {
    cap_dental: ['/operative-note-ai', '/patient-leaflet-generator', '/medical-billing-ai'],
    cap_psychiatry: ['/psychology-ai-scribe', '/referral-letter-ai', '/patient-leaflet-generator'],
    cap_psychology: ['/psychiatry-ai-scribe', '/speech-therapy-ai-scribe', '/patient-leaflet-generator'],
    physio_page: ['/occupational-therapy-ai-scribe', '/speech-therapy-ai-scribe', '/nutrition-ai-scribe'],
    ot_page: ['/physiotherapy-ai-scribe', '/speech-therapy-ai-scribe', '/nutrition-ai-scribe'],
    slt_page: ['/occupational-therapy-ai-scribe', '/physiotherapy-ai-scribe', '/psychology-ai-scribe'],
    nutrition_page: ['/physiotherapy-ai-scribe', '/patient-leaflet-generator', '/icd-coding'],
    cap_midwifery: ['/nutrition-ai-scribe', '/patient-leaflet-generator', '/referral-letter-ai'],
    cap_vet: ['/operative-note-ai', '/medical-billing-ai', '/patient-leaflet-generator'],
    cap_operative: ['/icd-coding', '/medical-billing-ai', '/referral-letter-ai'],
    billing: ['/icd-coding', '/operative-note-ai', '/referral-letter-ai'],
    cap_leaflet: ['/referral-letter-ai', '/icd-coding', '/psychiatry-ai-scribe'],
    referrals_page: ['/patient-leaflet-generator', '/icd-coding', '/psychiatry-ai-scribe'],
    icd_page: ['/medical-billing-ai', '/operative-note-ai', '/referral-letter-ai'],
    radiology_assist_page: ['/dermatology-ai', '/medical-triage-ai', '/operative-note-ai'],
    dermatology_assist_page: ['/radiology-ai', '/medical-triage-ai', '/patient-leaflet-generator'],
    triage_assist_page: ['/radiology-ai', '/dermatology-ai', '/referral-letter-ai'],
    allied: ['/physiotherapy-ai-scribe', '/occupational-therapy-ai-scribe', '/speech-therapy-ai-scribe'],
};

function relatedBlockFor(ns) {
    const siblings = CAP_SIBLINGS[ns];
    if (!siblings) { return ''; }
    const links = [['/ai-medical-scribe', 'cap_medical.kicker', 'AI Medical Scribe']]
        .concat(siblings.map((route) => {
            const targetNs = CAP_ROUTE_NS[route];
            return [route, targetNs + '.kicker', route.slice(1)];
        }))
        .map(([href, key, label]) =>
            `<a href="${href}" class="dropdown-item" style="border: 1px solid var(--border-subtle); border-radius: 8px;"><span class="dropdown-title" data-i18n="${key}">${label}</span></a>`
        ).join('');
    return `
            <div style="margin-top: 60px;">
                <h2 class="section-title" data-i18n="common.related_title">Explore the AI medical scribe further</h2>
                <div class="grid-4">${links}</div>
            </div>`;
}

function createCapabilityPage(config) {
    const ns = config.ns;
    const d = (key) => ns ? ` data-i18n="${ns}.${key}"` : '';

    const featureCards = config.features
        .map(
            (f, idx) => `
                <div class="card">
                    <div class="card-icon material-symbols-rounded">${f.icon}</div>
                    <h3${d('f' + (idx+1) + '_title')}>${f.title}</h3>
                    <p${d('f' + (idx+1) + '_desc')}>${f.desc}</p>
                </div>`
        )
        .join('');

    const gridClass =
        config.features.length <= 3 ? 'grid-3' :
        config.features.length === 4 ? 'grid-4' : 'grid-3';

    const betaNotice = config.betaNotice ? `
                <div class="beta-notice">
                    <span class="material-symbols-rounded">science</span>
                    <span data-i18n="common.beta_notice">Beta \u2014 This capability is currently in beta and under study</span>
                </div>` : '';

    const ctaPrimary = config.ctaHref
        ? `<a href="${config.ctaHref}" class="btn-primary" style="background: var(--accent); color: var(--text-primary);"${d('cta_label')}>${config.ctaLabel || 'Start Free Trial'}</a>`
        : `<a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="window.open('${BASE_PATH}/console', '_blank')" ${d('cta_label')}>${config.ctaLabel || 'Start Free Trial'}</a>`;

    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker"${d('kicker')}>${config.kicker}</span>
                    <h1 class="subpage-title"${d('title')}>${config.title}</h1>
                    <p class="subpage-copy"${d('description')}>${config.description}</p>
                </div>

                ${betaNotice}

                <div class="${gridClass}" style="margin-bottom: 60px;">
                    ${featureCards}
                </div>

                ${config.extraContent || ''}

                ${relatedBlockFor(ns)}

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;"${d('cta_title')}>${config.ctaTitle || 'Ready to transform your documentation?'}</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        ${ctaPrimary}
                        <a href="/contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;" data-i18n="common.contact_sales">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// ---------------------------------------------------------------------------
// 1. Medical Specialties
// ---------------------------------------------------------------------------

// Category-owner page (SEO/GEO plan Phase 3; spec PAGE-AMS-001..005).
// Custom layout, not the helper: the spec's H2 architecture is
// what-is / how-it-works / outputs / specialty coverage (ONE module) /
// languages / security / integrations / pricing / comparisons / FAQ,
// with contextual links throughout (§9.2). The 40+ specialties claim is
// substantiated here: 13 dedicated consoles PLUS the Medical console's
// free-text specialty field (you type your discipline), which is why
// coverage is not limited to a preset list.
function CapMedicalPage() {
    const consoleLinks = [
        ['/dental-ai-scribe', 'dropdown.dental', 'Dental'],
        ['/psychiatry-ai-scribe', 'dropdown.psychiatry', 'Psychiatry'],
        ['/psychology-ai-scribe', 'dropdown.psychology', 'Psychology'],
        ['/physiotherapy-ai-scribe', 'dropdown.physio', 'Physiotherapy'],
        ['/occupational-therapy-ai-scribe', 'dropdown.ot', 'Occupational Therapy'],
        ['/speech-therapy-ai-scribe', 'dropdown.slt', 'Speech & Language Therapy'],
        ['/nutrition-ai-scribe', 'dropdown.nutrition', 'Nutritional Therapy'],
        ['/midwifery-ai-scribe', 'dropdown.midwifery', 'Midwifery'],
        ['/veterinary-ai-scribe', 'dropdown.vet_medicine', 'Veterinary'],
        ['/radiology-ai', 'dropdown.radiology_assist', 'Radiology Assist'],
        ['/dermatology-ai', 'dropdown.dermatology_assist', 'Dermatology Assist'],
        ['/medical-triage-ai', 'dropdown.triage_assist', 'Triage Assist'],
        ['/allied-health-ai-scribe', 'dropdown.allied_health', 'Allied Health'],
    ].map(([href, key, label]) =>
        `<a href="${href}" class="dropdown-item" style="border: 1px solid var(--border-subtle); border-radius: 8px;"><span class="dropdown-title" data-i18n="${key}">${label}</span></a>`
    ).join('');

    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="cap_medical.kicker">AI Medical Scribe</span>
                    <h1 class="subpage-title" data-i18n="cap_medical.title">AI Medical Scribe for Doctors and Healthcare Professionals</h1>
                    <p class="subpage-copy" data-i18n="cap_medical.description">ClinixSummary is an AI medical scribe: you speak — dictating or recording the consultation — and it writes the structured clinical note for you: history, examination, impression and plan. Every note is presented for your review and approval before it enters the record. Voice in. Meticulous notes out.</p>
                </div>

                <!-- What is an AI medical scribe -->
                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <h2 class="section-title" data-i18n="cap_medical.whatis_title">What is an AI medical scribe?</h2>
                        <p class="section-copy" data-i18n-html="cap_medical.whatis_desc">An AI medical scribe listens to a consultation or dictation and produces the clinical documentation a clinician would otherwise type — in seconds, without a human scribe in the room. It replaces the typing, never the judgement: the clinician reviews and approves every note. See <a href="/compare">how ClinixSummary compares</a> to other AI scribes.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <h2 class="section-title" data-i18n="cap_medical.who_title">Built for the way clinicians work</h2>
                        <p class="section-copy" data-i18n-html="cap_medical.who_desc">Doctors, dentists, therapists, midwives and veterinary teams use ClinixSummary on the web console or the <a href="/clinicians">iOS and Android apps</a> — in clinic, on ward rounds or on home visits. Notes arrive structured for your workflow, with <a href="/integrations">flexible exports into EHR and EMR systems</a>.</p>
                    </div>
                </div>

                <!-- How it works -->
                <h2 class="section-title" data-i18n="cap_medical.how_title">How it works</h2>
                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">mic</div>
                        <h3 data-i18n="cap_medical.how1_title">1. Speak</h3>
                        <p data-i18n="cap_medical.how1_desc">Dictate after the visit or record the consultation as it happens — with ambient capture that lets you pause and resume around interruptions.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">neurology</div>
                        <h3 data-i18n="cap_medical.how2_title">2. AI writes the note</h3>
                        <p data-i18n="cap_medical.how2_desc">Specialty-tuned models transcribe the audio and structure it into the sections your discipline expects, using the right clinical terminology.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">rate_review</div>
                        <h3 data-i18n="cap_medical.how3_title">3. Review &amp; approve</h3>
                        <p data-i18n="cap_medical.how3_desc">The note is presented for your review. Edit anything, approve it, and it is ready for the record — the clinician stays in control of every word.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">output</div>
                        <h3 data-i18n="cap_medical.how4_title">4. Export</h3>
                        <p data-i18n="cap_medical.how4_desc">Copy or export the note and its extras — referral letters, patient leaflets, coding suggestions — into your EHR, fax or patient portal.</p>
                    </div>
                </div>

                <!-- Outputs -->
                <h2 class="section-title" data-i18n="cap_medical.out_title">What it writes for you</h2>
                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">description</span>
                        <h3 data-i18n="cap_medical.out1_title">Structured clinical notes</h3>
                        <p class="section-copy" data-i18n="cap_medical.out1_desc">SOAP and specialty-specific formats with history, examination, impression and plan — written to the conventions of your discipline.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">send</span>
                        <h3 data-i18n="cap_medical.out2_title">Referral letters</h3>
                        <p class="section-copy" data-i18n-html="cap_medical.out2_desc">Structured, specialty-aware <a href="/referral-letter-ai">referral letters</a> generated from the encounter — no separate dictation.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">contact_page</span>
                        <h3 data-i18n="cap_medical.out3_title">Patient leaflets</h3>
                        <p class="section-copy" data-i18n-html="cap_medical.out3_desc">Plain-language <a href="/patient-leaflet-generator">patient information leaflets</a> so patients leave knowing their diagnosis, plan and next steps.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">medical_information</span>
                        <h3 data-i18n="cap_medical.out4_title">Coding suggestions</h3>
                        <p class="section-copy" data-i18n-html="cap_medical.out4_desc"><a href="/icd-coding">ICD-10</a> and <a href="/medical-billing-ai">billing code</a> suggestions from the clinical narrative — always for clinician review before submission.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">surgical</span>
                        <h3 data-i18n="cap_medical.out5_title">Operative notes</h3>
                        <p class="section-copy" data-i18n-html="cap_medical.out5_desc">Dictated surgical narration becomes a structured <a href="/operative-note-ai">operative report</a> with findings, steps and post-operative orders.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">translate</span>
                        <h3 data-i18n="cap_medical.out6_title">Six note languages</h3>
                        <p class="section-copy" data-i18n-html="cap_medical.out6_desc">Notes in English, Spanish, Portuguese, Italian, French and Arabic — with <a href="/multilingual-ai-scribe">automatic language detection</a> when patients switch mid-consultation.</p>
                    </div>
                </div>

                <!-- Specialty coverage: ONE module -->
                <div class="subpage-header" style="margin-bottom: 32px;">
                    <span class="kicker" data-i18n="cap_medical.spec_kicker">Specialty Coverage</span>
                    <h2 class="section-title" data-i18n="cap_medical.spec_title">40+ specialties. Thirteen dedicated consoles. One scribe.</h2>
                    <p class="section-copy" data-i18n="cap_medical.spec_desc">Thirteen dedicated consoles cover general medicine, dental, psychiatry, psychology, physiotherapy, occupational therapy, speech and language therapy, midwifery, nutrition, veterinary medicine, radiology, dermatology and triage. And the Medical console is not limited to a list: you type your specialty — cardiology, nephrology, paediatrics, any discipline — and the documentation adapts to its terminology and conventions. That is how one scribe serves 40+ specialties.</p>
                </div>
                <div class="grid-4" style="margin-bottom: 60px;">
                    ${consoleLinks}
                </div>

                <!-- Security / Pricing / Comparisons / Evidence -->
                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">verified_user</span>
                        <h2 class="section-title" style="font-size: 22px;" data-i18n="cap_medical.sec_title">Security &amp; compliance</h2>
                        <p class="section-copy" data-i18n-html="cap_medical.sec_desc">Registered with the MHRA as a Class I medical device (UKCA marked). HIPAA and GDPR aligned, TLS 1.2+ and AES-256 encryption, and audio is permanently deleted once your note is generated. Visit the <a href="/security">Trust Center</a>.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">savings</span>
                        <h2 class="section-title" style="font-size: 22px;" data-i18n="cap_medical.price_title">Simple pricing</h2>
                        <p class="section-copy" data-i18n-html="cap_medical.price_desc">Start free — no credit card, no sign-up to try the console — with transparent credit-based plans from $9.99/month. See <a href="/pricing">plans and pricing</a>.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">compare_arrows</span>
                        <h2 class="section-title" style="font-size: 22px;" data-i18n="cap_medical.comp_title">How it compares</h2>
                        <p class="section-copy" data-i18n-html="cap_medical.comp_desc">Weigh ClinixSummary against <a href="/clinixsummary-vs-heidi">Heidi</a>, <a href="/clinixsummary-vs-freed">Freed</a>, <a href="/clinixsummary-vs-nabla">Nabla</a>, <a href="/clinixsummary-vs-suki">Suki</a> and <a href="/clinixsummary-vs-deepscribe">DeepScribe</a> — fact-checked <a href="/compare">comparisons</a> with sources.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">science</span>
                        <h2 class="section-title" style="font-size: 22px;" data-i18n="cap_medical.ev_title">The evidence</h2>
                        <p class="section-copy" data-i18n-html="cap_medical.ev_desc">Independent studies and our own <a href="/whitepapers">research whitepapers</a> on AI scribes in clinical practice — plus <a href="/publications">publications</a> and press coverage.</p>
                    </div>
                </div>

                <!-- FAQ -->
                <div>
                    <h2 class="section-title" data-i18n="cap_medical.faq_title">The AI medical scribe, answered</h2>
                    <div class="grid-2">
                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="cap_medical.faq1_q" data-faq-q>What is an AI medical scribe?</h3>
                        <p class="section-copy" data-i18n="cap_medical.faq1_a" data-faq-a>An AI medical scribe listens to your dictation or consultation and writes the clinical note for you — history, examination, impression and plan — so you document in seconds instead of minutes, without a human scribe in the room.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="cap_medical.faq2_q" data-faq-q>Is ClinixSummary secure and compliant?</h3>
                        <p class="section-copy" data-i18n="cap_medical.faq2_a" data-faq-a>Yes. ClinixSummary is HIPAA and GDPR aligned, audio is processed ephemerally, and the product is registered with the MHRA in the United Kingdom as a Class I medical device (UKCA marked).</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="cap_medical.faq3_q" data-faq-q>Which specialties does it support?</h3>
                        <p class="section-copy" data-i18n="cap_medical.faq3_a" data-faq-a>Thirteen dedicated consoles cover general medicine, dental, psychiatry, psychology, physiotherapy, occupational therapy, speech and language therapy, midwifery, nutrition, veterinary medicine, radiology, dermatology and triage — and in the Medical console you simply type your specialty, so any medical discipline is supported, with 40+ specialties in active use.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="cap_medical.faq4_q" data-faq-q>Which languages does it work in?</h3>
                        <p class="section-copy" data-i18n="cap_medical.faq4_a" data-faq-a>Notes can be generated in English, Spanish, Portuguese, Italian, French and Arabic — including a bilingual English–Arabic mode where the patient leaflet is produced in both languages.</p>
                    </div>
                    </div>
                </div>

                <!-- CTA -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;" data-i18n="cap_medical.cta_title">Try the AI medical scribe on your next consultation.</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="${BASE_PATH}/console" target="_blank" rel="noopener" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" data-i18n="cap_medical.cta_label">Start Free Trial</a>
                        <a href="/contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;" data-i18n="common.contact_sales">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// ---------------------------------------------------------------------------
// 2. Dental
// ---------------------------------------------------------------------------

function CapDentalPage() {
    return createCapabilityPage({
        ns: 'cap_dental',
        kicker: 'Dental',
        title: 'Dental Documentation, Reimagined.',
        description:
            'ClinixSummary understands dentistry. From restorative procedures and endodontics to periodontal assessments, our AI captures the clinical detail that matters \u2014 so you can focus on the patient in the chair, not the keyboard.',
        features: [
            {
                icon: 'dentistry',
                title: 'Dental Terminology Recognition',
                desc: 'Our models are trained on dental\u2011specific vocabulary \u2014 tooth numbering systems, surface notations, materials and procedural terminology \u2014 ensuring notes are precise and profession\u2011accurate.',
            },
            {
                icon: 'assignment',
                title: 'Treatment Planning Notes',
                desc: 'Automatically generate structured treatment plans from your clinical narrative, including phased procedures, material selections and patient\u2011facing explanations.',
            },
            {
                icon: 'monitor_heart',
                title: 'Periodontal Documentation',
                desc: 'Capture pocket depths, bleeding indices, recession and mobility assessments in structured formats that integrate seamlessly with periodontal charting workflows.',
            },
            {
                icon: 'receipt_long',
                title: 'Insurance-Ready Codes',
                desc: 'Map clinical narratives to CDT and insurance\u2011ready codes, reducing claim rejections and accelerating reimbursement for your dental practice.',
            },
        ],
        ctaTitle: 'Modernise your dental documentation today.',
        ctaToast: 'Starting free trial for dental.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 3. Psychiatry
// ---------------------------------------------------------------------------

function CapPsychiatryPage() {
    return createCapabilityPage({
        ns: 'cap_psychiatry',
        kicker: 'Psychiatry',
        title: 'Psychiatry Documentation That Understands Context.',
        description:
            'Psychiatric encounters are nuanced, longitudinal and deeply contextual. ClinixSummary\u2019s psychiatry module is designed to capture the subtlety of mental health consultations \u2014 from initial assessments to ongoing medication management \u2014 without disrupting the therapeutic alliance.',
        features: [
            {
                icon: 'psychology',
                title: 'Mental Status Exam Capture',
                desc: 'Automatically structure MSE findings \u2014 appearance, behaviour, mood, affect, thought process, thought content, cognition and insight \u2014 from your natural clinical conversation.',
            },
            {
                icon: 'timeline',
                title: 'Longitudinal Progress Notes',
                desc: 'Track symptom trajectories, treatment responses and functional changes across sessions with structured progress notes that build a coherent clinical picture over time.',
            },
            {
                icon: 'medication',
                title: 'Medication Management',
                desc: 'Document medication changes, titration schedules, side\u2011effect monitoring and rationale for prescribing decisions in a clear, auditable format.',
            },
            {
                icon: 'shield',
                title: 'Risk Assessment Documentation',
                desc: 'Capture and structure risk assessments including suicidality screens, safety planning and protective factors \u2014 ensuring thorough, defensible documentation.',
            },
        ],
        ctaTitle: 'Document with the depth psychiatry demands.',
        ctaToast: 'Starting free trial for psychiatry.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 4. Psychology
// ---------------------------------------------------------------------------

function CapPsychologyPage() {
    return createCapabilityPage({
        ns: 'cap_psychology',
        kicker: 'Psychology',
        title: 'Psychology Notes Built for Clinical Depth.',
        description:
            'Psychology documentation requires precision without sacrificing the richness of clinical observation. ClinixSummary helps psychologists produce thorough session notes, assessment reports and outcome tracking \u2014 all while preserving the confidentiality that underpins therapeutic work.',
        features: [
            {
                icon: 'edit_note',
                title: 'Session Notes',
                desc: 'Generate structured session notes that capture presenting concerns, interventions used, client responses and session themes \u2014 without requiring you to type during the session.',
            },
            {
                icon: 'assessment',
                title: 'Assessment Documentation',
                desc: 'Produce comprehensive psychometric and clinical assessment reports with structured findings, diagnostic impressions and evidence\u2011based recommendations.',
            },
            {
                icon: 'trending_up',
                title: 'Treatment Outcome Tracking',
                desc: 'Track therapeutic goals, outcome measures and progress across sessions with structured data that supports clinical decision\u2011making and payer requirements.',
            },
            {
                icon: 'lock',
                title: 'Confidentiality-First Design',
                desc: 'Built with psychotherapy\u2019s strict privacy standards in mind. Ephemeral audio processing, encrypted storage and granular access controls protect sensitive client information.',
            },
        ],
        ctaTitle: 'Elevate your psychology documentation.',
        ctaToast: 'Starting free trial for psychology.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 5. Allied Health (detailed page \u2014 custom layout, not using helper)
// ---------------------------------------------------------------------------

function CapAlliedHealthPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="allied.kicker">Allied Health</span>
                    <h1 class="subpage-title" data-i18n="allied.title">Purpose-Built Documentation for Allied Health Professionals.</h1>
                    <p class="subpage-copy" data-i18n="allied.desc">Allied health documentation is fundamentally different from physician notes \u2014 different terminology, assessment frameworks, outcome measures and regulatory expectations. ClinixSummary has dedicated modules for each allied health discipline, so your notes reflect the way you actually practise.</p>
                </div>

                <!-- Differentiator callout -->
                <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 32px; margin-bottom: 60px;">
                    <div style="display: flex; align-items: flex-start; gap: 16px;">
                        <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent); flex-shrink: 0;">difference</span>
                        <div>
                            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;" data-i18n="allied.callout_title">Why generic scribe tools fall short</h3>
                            <p style="color: var(--text-secondary); line-height: 1.7;" data-i18n="allied.callout_desc">Most AI scribes are designed around the physician encounter. Allied health professionals use distinct clinical reasoning models, discipline\u2011specific assessment tools and outcome measures that generic systems simply miss. ClinixSummary\u2019s allied health modules are trained on real\u2011world physiotherapy, occupational therapy and speech &amp; language therapy documentation \u2014 capturing the data points that matter to your profession.</p>
                        </div>
                    </div>
                </div>

                <!-- Physiotherapy -->
                <div class="subpage-header">
                    <span class="kicker" data-i18n="allied.physio_kicker">Physiotherapy</span>
                    <h3 class="section-title" data-i18n="allied.physio_title">Move from assessment to plan in seconds.</h3>
                    <p class="section-copy" data-i18n="allied.physio_desc">ClinixSummary\u2019s physiotherapy module captures ROM measurements, strength grades, functional tests and special tests from your clinical narrative, then structures them into treatment plans and progress notes that meet payer and regulatory standards.</p>
                </div>

                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">straighten</div>
                        <h3 data-i18n="allied.physio_f1_title">ROM & Strength</h3>
                        <p data-i18n="allied.physio_f1_desc">Capture range\u2011of\u2011motion measurements and manual muscle testing grades in structured, comparable formats across sessions.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">exercise</div>
                        <h3 data-i18n="allied.physio_f2_title">Functional Tests</h3>
                        <p data-i18n="allied.physio_f2_desc">Document special tests, functional outcome measures and standardised assessment scores with automatic scoring context.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">assignment</div>
                        <h3 data-i18n="allied.physio_f3_title">Treatment Plans</h3>
                        <p data-i18n="allied.physio_f3_desc">Generate goal\u2011oriented treatment plans with short\u2011term and long\u2011term objectives, modalities, frequency and expected timelines.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">trending_up</div>
                        <h3 data-i18n="allied.physio_f4_title">Progress Notes</h3>
                        <p data-i18n="allied.physio_f4_desc">Track patient progress against baseline measurements with structured progress notes that clearly demonstrate clinical change.</p>
                    </div>
                </div>

                <!-- Occupational Therapy -->
                <div class="subpage-header">
                    <span class="kicker" data-i18n="allied.ot_kicker">Occupational Therapy</span>
                    <h3 class="section-title" data-i18n="allied.ot_title">Document function, not just impairment.</h3>
                    <p class="section-copy" data-i18n="allied.ot_desc">Occupational therapy is centred on function and participation. Our OT module captures functional assessments, ADL evaluations and goal\u2011oriented planning in the language and frameworks that occupational therapists actually use.</p>
                </div>

                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">accessibility_new</div>
                        <h3 data-i18n="allied.ot_f1_title">Functional Assessments</h3>
                        <p data-i18n="allied.ot_f1_desc">Capture upper\u2011limb function, cognitive assessments, sensory evaluations and standardised OT outcome measures in structured formats.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">home_health</div>
                        <h3 data-i18n="allied.ot_f2_title">ADL Evaluations</h3>
                        <p data-i18n="allied.ot_f2_desc">Document activities of daily living performance, independence levels and assistive device requirements with consistent, measurable descriptors.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">target</div>
                        <h3 data-i18n="allied.ot_f3_title">Goal-Oriented Planning</h3>
                        <p data-i18n="allied.ot_f3_desc">Generate client\u2011centred, occupation\u2011based goals with measurable criteria, timeframes and intervention strategies aligned to OT practice frameworks.</p>
                    </div>
                </div>

                <!-- Speech & Language Therapy -->
                <div class="subpage-header">
                    <span class="kicker" data-i18n="allied.slt_kicker">Speech &amp; Language Therapy</span>
                    <h3 class="section-title" data-i18n="allied.slt_title">Capture every dimension of communication care.</h3>
                    <p class="section-copy" data-i18n="allied.slt_desc">From articulation and fluency to voice, language and swallowing disorders, ClinixSummary\u2019s SLT module recognises the full breadth of speech &amp; language therapy terminology and generates documentation that reflects your clinical expertise.</p>
                </div>

                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">record_voice_over</div>
                        <h3 data-i18n="allied.slt_f1_title">Speech Assessment</h3>
                        <p data-i18n="allied.slt_f1_desc">Document articulation inventories, phonological processes, fluency profiles and voice quality assessments in structured, standardised formats.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">spellcheck</div>
                        <h3 data-i18n="allied.slt_f2_title">SLT Terminology</h3>
                        <p data-i18n="allied.slt_f2_desc">Our models are trained on speech &amp; language therapy\u2011specific vocabulary \u2014 from CAPE\u2011V parameters to FOIS levels \u2014 so your notes use the right clinical language.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">medication</div>
                        <h3 data-i18n="allied.slt_f3_title">Dysphagia Documentation</h3>
                        <p data-i18n="allied.slt_f3_desc">Capture IDDSI levels, swallowing assessment findings, aspiration risk factors and diet texture recommendations with clinical precision.</p>
                    </div>
                </div>

                ${relatedBlockFor('allied')}

                <!-- CTA -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;" data-i18n="allied.cta_title">Start documenting with purpose-built allied health modules.</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="window.open('${BASE_PATH}/console', '_blank')" data-i18n="allied.cta_label">Start Free Trial</a>
                        <a href="/contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;" data-i18n="common.contact_us">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// ---------------------------------------------------------------------------
// 6. Midwifery
// ---------------------------------------------------------------------------

function CapMidwiferyPage() {
    return createCapabilityPage({
        ns: 'cap_midwifery',
        kicker: 'Midwifery',
        title: 'Midwifery Documentation for Every Stage of Care.',
        description:
            'Midwifery care spans the full continuum \u2014 from the first antenatal visit through labour, birth and postnatal recovery. ClinixSummary\u2019s midwifery module captures the clinical detail unique to each stage, supporting continuity of care and woman\u2011centred documentation.',
        features: [
            {
                icon: 'pregnant_woman',
                title: 'Antenatal Documentation',
                desc: 'Capture gestational assessments, risk screening, fundal height measurements, fetal monitoring and birth planning discussions in structured, visit\u2011by\u2011visit records.',
            },
            {
                icon: 'monitor_heart',
                title: 'Intrapartum Notes',
                desc: 'Document labour progress, partogram data, interventions, delivery details and neonatal observations in real time or immediately post\u2011delivery.',
            },
            {
                icon: 'child_care',
                title: 'Postnatal Care Records',
                desc: 'Generate structured postnatal assessments covering maternal recovery, feeding support, neonatal checks and mental health screening.',
            },
            {
                icon: 'handshake',
                title: 'Continuity of Care',
                desc: 'Maintain a coherent clinical narrative across the full maternity journey, ensuring that every midwife who picks up the record has the context they need.',
            },
        ],
        ctaTitle: 'Simplify midwifery documentation across the care continuum.',
        ctaToast: 'Starting free trial for midwifery.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 7. Veterinary Medicine
// ---------------------------------------------------------------------------

function CapVetPage() {
    return createCapabilityPage({
        ns: 'cap_vet',
        kicker: 'Veterinary Medicine',
        title: 'Veterinary Documentation, Purpose-Built.',
        description:
            'Veterinary medicine demands documentation that accounts for species\u2011specific anatomy, pharmacology and clinical workflows. ClinixSummary\u2019s veterinary module is purpose\u2011built for companion animal, equine and mixed practices \u2014 so your records are as precise as your care.',
        features: [
            {
                icon: 'pets',
                title: 'Species-Specific Terminology',
                desc: 'Our models recognise species\u2011specific anatomy, breed predispositions, dosing conventions and diagnostic terminology for canine, feline, equine and exotic patients.',
            },
            {
                icon: 'vaccines',
                title: 'Treatment & Procedure Notes',
                desc: 'Automatically generate structured surgical reports, anaesthesia records, treatment notes and discharge summaries tailored to veterinary practice standards.',
            },
            {
                icon: 'forum',
                title: 'Client Communication',
                desc: 'Produce client\u2011facing summaries, treatment estimates and post\u2011visit instructions in plain language \u2014 improving compliance and client satisfaction.',
            },
            {
                icon: 'inventory_2',
                title: 'Practice Management Ready',
                desc: 'Export notes in formats compatible with major veterinary practice management systems, streamlining record\u2011keeping and billing workflows.',
            },
        ],
        extraContent: `
            <div>
                <h2 class="section-title" data-i18n="cap_vet.faq_title">Veterinary documentation, answered</h2>
                <div class="grid-2">
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="cap_vet.faq1_q" data-faq-q>Does it understand veterinary terminology and species differences?</h3>
                    <p class="section-copy" data-i18n="cap_vet.faq1_a" data-faq-a>Yes — the veterinary console is purpose-built: species-specific anatomy, breed predispositions, dosing conventions and diagnostic terminology for canine, feline, equine and exotic patients.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="cap_vet.faq2_q" data-faq-q>Can it write surgical and anaesthesia records?</h3>
                    <p class="section-copy" data-i18n="cap_vet.faq2_a" data-faq-a>Yes. Structured surgical reports, anaesthesia records, treatment notes and discharge summaries are generated to veterinary practice standards.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="cap_vet.faq3_q" data-faq-q>What about client communication?</h3>
                    <p class="section-copy" data-i18n="cap_vet.faq3_a" data-faq-a>Client-facing summaries, treatment estimates and post-visit instructions are produced in plain language, improving compliance and client satisfaction.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="cap_vet.faq4_q" data-faq-q>Does it fit my practice management system?</h3>
                    <p class="section-copy" data-i18n="cap_vet.faq4_a" data-faq-a>Notes export in formats compatible with major veterinary practice management systems, keeping record-keeping and billing streamlined.</p>
                </div>
                </div>
            </div>`,
        ctaTitle: 'Upgrade your veterinary documentation today.',
        ctaToast: 'Starting free trial for veterinary.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 8. Operative Notes
// ---------------------------------------------------------------------------

function CapOperativePage() {
    return createCapabilityPage({
        ns: 'cap_operative',
        kicker: 'Operative Notes',
        title: 'Operative & Procedural Notes. Automatically.',
        description:
            'Surgical documentation is time\u2011critical and detail\u2011intensive. ClinixSummary captures operative narration \u2014 whether dictated during or immediately after a procedure \u2014 and transforms it into structured operative reports that meet regulatory and billing requirements.',
        features: [
            {
                icon: 'mic',
                title: 'Surgical Narration Capture',
                desc: 'Dictate your operative narrative naturally. Our models parse surgical terminology, anatomical references, instrument names and technique descriptions with high fidelity.',
            },
            {
                icon: 'summarize',
                title: 'Structured Operative Reports',
                desc: 'Automatically structure findings, procedure steps, specimens, complications and post\u2011operative orders into compliant operative report formats.',
            },
            {
                icon: 'draft',
                title: 'Procedure-Specific Templates',
                desc: 'Leverage procedure\u2011specific templates for common surgeries \u2014 from laparoscopic cholecystectomy to total joint replacement \u2014 pre\u2011populated with expected fields.',
            },
            {
                icon: 'receipt_long',
                title: 'Billing-Ready Documentation',
                desc: 'Generate documentation that supports accurate CPT coding and medical necessity justification, reducing post\u2011operative billing delays.',
            },
        ],
        extraContent: `
            <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 32px; margin-top: 20px;">
                <div style="display: flex; align-items: flex-start; gap: 16px;">
                    <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent); flex-shrink: 0;">headphones</span>
                    <div>
                        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;" data-i18n="cap_operative.extra_title">Auto Ambient Dictate \u2014 Operative Mode</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;" data-i18n="cap_operative.extra_desc">ClinixSummary\u2019s Auto Ambient Dictate feature includes a dedicated operative mode that automatically detects surgical narration, distinguishes it from team communication and background noise, and begins structured documentation capture without manual activation. Dictate naturally while you operate \u2014 your report is waiting when you\u2019re done.</p>
                    </div>
                </div>
            </div>
        `,
        ctaTitle: 'Automate your operative documentation workflow.',
        ctaToast: 'Starting free trial for operative notes.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 9. Billing Assistance (detailed page \u2014 custom layout, not using helper)
// ---------------------------------------------------------------------------

function BillingAssistPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="billing.kicker">Billing Assistance</span>
                    <h1 class="subpage-title" data-i18n="billing.title">Intelligent Billing Assistance for Healthcare Organisations.</h1>
                    <p class="subpage-copy" data-i18n="billing.desc">ClinixSummary\u2019s Billing Assistance module \u2014 available exclusively for organisation and enterprise accounts \u2014 captures the clinical activities, procedures and services performed during every encounter and maps them to your organisation\u2019s own CPT code library. The result: fewer coding errors, eliminated missed charges and faster claims submission.</p>
                </div>

                <!-- Enterprise badge -->
                <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(59,197,214,0.1); border: 1px solid rgba(59,197,214,0.3); border-radius: 8px; padding: 10px 20px; margin-bottom: 48px;">
                    <span class="material-symbols-rounded" style="font-size: 20px; color: var(--accent);">verified</span>
                    <span style="font-size: 14px; font-weight: 600; color: var(--text-primary);" data-i18n="billing.badge">Organisation & Enterprise Feature</span>
                </div>

                <!-- How it works -->
                <div class="subpage-header">
                    <span class="kicker" data-i18n="billing.how_kicker">How It Works</span>
                    <h3 class="section-title" data-i18n="billing.how_title">From encounter to suggested codes in seconds.</h3>
                    <p class="section-copy" data-i18n="billing.how_desc">During each encounter, ClinixSummary identifies billable activities from the clinical narrative and cross\u2011references them against your organisation\u2019s CPT code library. Suggested codes are presented for clinician review \u2014 never submitted as final billing without human approval.</p>
                </div>

                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">mic</div>
                        <h3 data-i18n="billing.step1_title">Capture</h3>
                        <p data-i18n="billing.step1_desc">Clinical activities, procedures and services are identified in real time from the consultation narrative or post\u2011visit dictation.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">sync_alt</div>
                        <h3 data-i18n="billing.step2_title">Map</h3>
                        <p data-i18n="billing.step2_desc">Identified activities are mapped to your organisation\u2019s own CPT code library, respecting your internal coding policies and payer contracts.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">checklist</div>
                        <h3 data-i18n="billing.step3_title">Suggest</h3>
                        <p data-i18n="billing.step3_desc">A set of suggested codes is generated for the clinician or coding team to review, approve or adjust before submission.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">send</div>
                        <h3 data-i18n="billing.step4_title">Submit</h3>
                        <p data-i18n="billing.step4_desc">Approved codes flow into your existing billing pipeline, reducing turnaround time and improving first\u2011pass claim acceptance rates.</p>
                    </div>
                </div>

                <!-- Key benefits -->
                <div class="subpage-header">
                    <span class="kicker" data-i18n="billing.benefits_kicker">Key Benefits</span>
                    <h3 class="section-title" data-i18n="billing.benefits_title">Measurable impact on your revenue cycle.</h3>
                </div>

                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">bug_report</span>
                        <h3 data-i18n="billing.benefit1_title">Reduce Coding Errors</h3>
                        <p data-i18n="billing.benefit1_desc">Automated code suggestions eliminate transposition errors, incorrect modifiers and mismatched diagnosis\u2011procedure pairings that cause claim rejections.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">money_off</span>
                        <h3 data-i18n="billing.benefit2_title">Eliminate Missed Charges</h3>
                        <p data-i18n="billing.benefit2_desc">Every billable activity captured during the encounter is surfaced for review, ensuring that no legitimate charge goes unsubmitted \u2014 a common source of revenue leakage.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">speed</span>
                        <h3 data-i18n="billing.benefit3_title">Accelerate Claims</h3>
                        <p data-i18n="billing.benefit3_desc">Faster, more accurate code generation shortens the revenue cycle from encounter to payment, improving cash flow and reducing administrative overhead.</p>
                    </div>
                </div>

                <!-- Important clarification -->
                <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 32px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: flex-start; gap: 16px;">
                        <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent); flex-shrink: 0;">info</span>
                        <div>
                            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;" data-i18n="billing.clarification_title">Suggested codes, not final submissions</h3>
                            <p style="color: var(--text-secondary); line-height: 1.7;" data-i18n="billing.clarification_desc">Billing Assistance generates <strong>suggested codes for review</strong>. All codes require clinician or coding team approval before they become part of a billing submission. This human\u2011in\u2011the\u2011loop design ensures accuracy, compliance and accountability at every step.</p>
                        </div>
                    </div>
                </div>

                ${relatedBlockFor('billing')}

                <!-- CTA -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;" data-i18n="billing.cta_title">Learn more about Billing Assistance for your organisation.</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="/contact" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" data-i18n="billing.cta_label">Request Information</a>
                        <a href="/organizations" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;" data-i18n="billing.cta_secondary">Enterprise Plans</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// ---------------------------------------------------------------------------
// 10. Patient Information Leaflet / Summary
// ---------------------------------------------------------------------------

function CapPatientLeafletPage() {
    return createCapabilityPage({
        ns: 'cap_leaflet',
        kicker: 'Patient Information Leaflet',
        title: 'Patient-Friendly Summaries at the Point of Care.',
        description:
            'ClinixSummary can generate a patient-facing summary section at the end of every clinical note \u2014 written in plain, layman\u2019s terms. Patients leave with a clear understanding of their diagnosis, treatment plan and next steps, improving adherence and satisfaction.',
        features: [
            {
                icon: 'description',
                title: 'Layman\u2019s Language Output',
                desc: 'Translates clinical terminology into clear, easy-to-understand language. Medical jargon is replaced with plain explanations that patients and their families can act on confidently.',
            },
            {
                icon: 'checklist',
                title: 'Structured Patient Handout',
                desc: 'Each summary includes: what was discussed, the diagnosis in simple terms, the treatment plan, medications prescribed, warning signs to watch for, and when to follow up.',
            },
            {
                icon: 'translate',
                title: 'Multilingual Support',
                desc: 'Patient summaries can be generated in any of ClinixSummary\u2019s supported languages, ensuring patients receive information in the language they are most comfortable with.',
            },
            {
                icon: 'print',
                title: 'Printable & Shareable',
                desc: 'Patient leaflets are formatted for easy printing at the point of care or can be exported as PDF and shared digitally via patient portals or messaging systems.',
            },
        ],
        extraContent: `
            <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 32px; margin-top: 20px;">
                <div style="display: flex; align-items: flex-start; gap: 16px;">
                    <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent); flex-shrink: 0;">toggle_on</span>
                    <div>
                        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;" data-i18n="cap_leaflet.extra_how_title">How It Works</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;" data-i18n="cap_leaflet.extra_how_desc">When you enable the Patient Information Leaflet option before or during a consultation, ClinixSummary appends a patient-facing summary to the end of your clinical note. The summary is generated from the same encounter data but rewritten for a non-clinical audience. You review and approve the summary before handing it to the patient \u2014 ensuring accuracy and personalisation.</p>
                    </div>
                </div>
            </div>

            <div class="subpage-header" style="margin-top: 60px;">
                <span class="kicker" data-i18n="cap_leaflet.extra_kicker">Benefits</span>
                <h3 class="section-title" data-i18n="cap_leaflet.extra_title">Better-informed patients, better outcomes.</h3>
            </div>

            <div class="grid-3" style="margin-bottom: 20px;">
                <div class="text-group" style="border-bottom: none;">
                    <span class="material-symbols-rounded list-item-icon">sentiment_satisfied</span>
                    <h3 data-i18n="cap_leaflet.benefit1_title">Improved Patient Satisfaction</h3>
                    <p data-i18n="cap_leaflet.benefit1_desc">Patients who receive written summaries of their visit report higher satisfaction, better understanding of their condition, and greater confidence in their care plan.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <span class="material-symbols-rounded list-item-icon">medication</span>
                    <h3 data-i18n="cap_leaflet.benefit2_title">Better Treatment Adherence</h3>
                    <p data-i18n="cap_leaflet.benefit2_desc">Research shows that patients who receive written discharge instructions are significantly more likely to follow treatment plans, take medications correctly and attend follow-up appointments.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <span class="material-symbols-rounded list-item-icon">reduce_capacity</span>
                    <h3 data-i18n="cap_leaflet.benefit3_title">Fewer Follow-up Calls</h3>
                    <p data-i18n="cap_leaflet.benefit3_desc">Clear, written information reduces the volume of \u201cWhat did the doctor say?\u201d calls to your front desk, freeing staff time and reducing administrative burden.</p>
                </div>
            </div>
        `,
        ctaTitle: 'Give your patients clarity at every visit.',
        ctaToast: 'Starting free trial with Patient Information Leaflet.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 11. Referrals
// ---------------------------------------------------------------------------

function ReferralsPage() {
    return createCapabilityPage({
        ns: 'referrals_page',
        kicker: 'Referrals Module',
        title: 'Automated Referral Letters from Your Clinical Note.',
        description:
            'When you select \u201cAdd Referral\u201d during a consultation, ClinixSummary generates a pertinent, structured referral letter to the requested specialty \u2014 directly from the clinical encounter. No separate dictation, no copy-pasting, no delays.',
        features: [
            {
                icon: 'send',
                title: 'One-Click Referral Generation',
                desc: 'Select \u201cAdd Referral\u201d and choose the target specialty. ClinixSummary extracts the relevant clinical details from the encounter and composes a structured referral letter automatically.',
            },
            {
                icon: 'clinical_notes',
                title: 'Clinically Pertinent Content',
                desc: 'Referral letters include presenting complaint, relevant history, examination findings, investigations, working diagnosis and the specific clinical question for the specialist \u2014 drawn directly from the consultation.',
            },
            {
                icon: 'tune',
                title: 'Specialty-Aware Formatting',
                desc: 'The referral format adapts to the target specialty. A cardiology referral emphasises cardiac history, ECG findings and risk factors; a psychiatric referral prioritises mental status, medication history and safety assessment.',
            },
            {
                icon: 'edit_note',
                title: 'Review & Customise',
                desc: 'Every generated referral is presented for your review before finalisation. Add personal notes, adjust urgency, or modify any section before exporting or sending.',
            },
        ],
        extraContent: `
            <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 32px; margin-top: 20px;">
                <div style="display: flex; align-items: flex-start; gap: 16px;">
                    <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent); flex-shrink: 0;">info</span>
                    <div>
                        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;" data-i18n="referrals_page.extra_title">Part of the Clinical Note Workflow</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;" data-i18n="referrals_page.extra_desc">Referrals are generated as part of the clinical note \u2014 not as a separate step. This means the referral letter is always contextually accurate and up to date with the encounter that triggered it. The referral is appended to the end of your note and can be exported independently as a PDF or integrated directly into your EHR referral workflow.</p>
                    </div>
                </div>
            </div>
        `,
        ctaTitle: 'Eliminate referral bottlenecks in your practice.',
        ctaToast: 'Starting free trial with Referrals module.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 12. ICD-10 Coding
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 13. Radiology Assist (Beta)
// ---------------------------------------------------------------------------

function RadiologyAssistPage() {
    return createCapabilityPage({
        ns: 'radiology_assist_page',
        betaNotice: true,
        kicker: 'Radiology Assist',
        title: 'AI-Assisted Radiology Report Generation.',
        description:
            'ClinixSummary\u2019s Radiology Assist module streamlines radiology documentation by generating structured, standards-compliant reports from imaging studies. From plain-film X\u2011rays to cross\u2011sectional imaging, Radiology Assist captures findings, impressions and recommendations in the language radiologists use \u2014 reducing turnaround times and improving report consistency.',
        features: [
            {
                icon: 'description',
                title: 'Structured Reporting Templates',
                desc: 'Generate radiology reports using structured templates aligned to ACR guidelines. Findings, impressions and recommendations are organised consistently across modalities and body regions.',
            },
            {
                icon: 'warning',
                title: 'Critical Findings Alerts',
                desc: 'Automatically flag critical and unexpected findings within the report, ensuring that urgent observations are prominently documented and ready for immediate clinical communication.',
            },
            {
                icon: 'compare',
                title: 'Comparison with Prior Studies',
                desc: 'Reference and compare findings against prior imaging studies in the clinical record, documenting interval changes, stability and progression with structured language.',
            },
            {
                icon: 'category',
                title: 'Classification Support',
                desc: 'Support for standardised classification systems including BI\u2011RADS, TI\u2011RADS and Lung\u2011RADS, ensuring that reports include the appropriate category assignments and management recommendations.',
            },
        ],
        // ctaHref: '#contact',
        ctaHref: 'https://clinixsummary.ai/console',
        ctaTitle: 'Interested in Radiology Assist? Join the beta.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 14. Dermatology Assist (Beta)
// ---------------------------------------------------------------------------

function DermatologyAssistPage() {
    return createCapabilityPage({
        ns: 'dermatology_assist_page',
        betaNotice: true,
        kicker: 'Dermatology Assist',
        title: 'AI-Assisted Dermatology Documentation.',
        description:
            'ClinixSummary\u2019s Dermatology Assist module is designed for the unique documentation demands of dermatology practice. From lesion morphology descriptions to dermoscopy findings, treatment protocols and photographic documentation, Dermatology Assist ensures your clinical records are thorough, standardised and audit\u2011ready.',
        features: [
            {
                icon: 'dermatology',
                title: 'Lesion Description Standardisation',
                desc: 'Document lesion morphology using standardised dermatological terminology \u2014 type, shape, colour, distribution, size and anatomical location \u2014 ensuring consistent, comparable records across visits.',
            },
            {
                icon: 'search',
                title: 'Dermoscopy Finding Documentation',
                desc: 'Capture dermoscopic patterns, structures and features using recognised dermatoscopy terminology, supporting clinical decision\u2011making and structured reporting for pigmented and non\u2011pigmented lesions.',
            },
            {
                icon: 'clinical_notes',
                title: 'Treatment Protocol Templates',
                desc: 'Generate structured treatment plans for common dermatological conditions, including topical regimens, phototherapy protocols, procedural notes and biologic therapy documentation.',
            },
            {
                icon: 'photo_library',
                title: 'Photographic Documentation Indexing',
                desc: 'Index and link clinical photographs to structured notes, enabling longitudinal visual tracking of lesion progression, treatment response and post\u2011procedural outcomes.',
            },
        ],
        // ctaHref: '#contact',
        ctaHref: 'https://clinixsummary.ai/console',
        ctaTitle: 'Interested in Dermatology Assist? Join the beta.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 15. Triage Assist (Beta)
// ---------------------------------------------------------------------------

function TriageAssistPage() {
    return createCapabilityPage({
        ns: 'triage_assist_page',
        betaNotice: true,
        kicker: 'Triage Assist',
        title: 'AI-Assisted Clinical Triage Documentation.',
        description:
            'ClinixSummary\u2019s Triage Assist module supports frontline clinical triage by generating structured, real\u2011time documentation of patient acuity assessments, chief complaints, vital sign trends and disposition decisions. Designed for emergency departments, urgent care centres and intake workflows where speed and accuracy are critical.',
        features: [
            {
                icon: 'speed',
                title: 'Acuity Scoring Documentation',
                desc: 'Document triage acuity levels using standardised scales (ESI, MTS, CTAS) with structured rationale, supporting consistent and defensible triage decisions across clinicians and shifts.',
            },
            {
                icon: 'category',
                title: 'Chief Complaint Categorisation',
                desc: 'Automatically categorise and structure chief complaints from the patient narrative, mapping presenting symptoms to standardised complaint categories for consistent documentation and downstream analytics.',
            },
            {
                icon: 'monitor_heart',
                title: 'Vital Sign Trend Analysis',
                desc: 'Capture and document vital sign measurements with contextual trend analysis, flagging clinically significant changes from baseline and highlighting values that fall outside normal parameters.',
            },
            {
                icon: 'swap_horiz',
                title: 'Disposition Recommendation Support',
                desc: 'Generate structured disposition documentation including discharge, admission, transfer or observation recommendations with supporting clinical rationale drawn from the triage assessment.',
            },
        ],
        // ctaHref: '#contact',
        ctaHref: 'https://clinixsummary.ai/console',
        ctaTitle: 'Interested in Triage Assist? Join the beta.',
        ctaLabel: 'Start Free Trial',
    });
}

// ---------------------------------------------------------------------------
// 12. ICD-10 Coding
// ---------------------------------------------------------------------------

function ICDCodingPage() {
    return createCapabilityPage({
        ns: 'icd_page',
        kicker: 'ICD-10 Coding',
        title: 'Accurate ICD-10 Coding from Every Encounter.',
        description:
            'ClinixSummary\u2019s ICD-10 coding module analyses the clinical narrative in real time and generates accurate diagnostic codes \u2014 reducing under-coding, eliminating errors and supporting cleaner claims submission.',
        features: [
            {
                icon: 'medical_information',
                title: 'Context-Driven Code Selection',
                desc: 'Our models don\u2019t just match keywords to codes. They understand clinical context \u2014 differentiating between a history of a condition and an active diagnosis, primary vs. secondary diagnoses, and laterality.',
            },
            {
                icon: 'verified',
                title: 'High-Specificity Coding',
                desc: 'ClinixSummary targets the highest appropriate specificity level, capturing the detail that payers require and reducing the \u201cunspecified\u201d codes that trigger claim queries and denials.',
            },
            {
                icon: 'checklist',
                title: 'Clinician Review & Approval',
                desc: 'All suggested codes are presented for clinician review before submission. The human-in-the-loop design ensures accuracy, compliance and accountability at every step.',
            },
            {
                icon: 'speed',
                title: 'Faster Claims Submission',
                desc: 'Accurate, same-day coding accelerates the revenue cycle from encounter to payment \u2014 reducing coding backlog, claim rejections and days in accounts receivable.',
            },
        ],
        extraContent: `
            <div class="subpage-header" style="margin-top: 20px;">
                <span class="kicker" data-i18n="icd_page.extra_kicker">Impact</span>
                <h3 class="section-title" data-i18n="icd_page.extra_title">Measurable improvements in coding accuracy.</h3>
            </div>

            <div class="grid-3" style="margin-bottom: 20px;">
                <div class="text-group" style="border-bottom: none;">
                    <span class="material-symbols-rounded list-item-icon">trending_down</span>
                    <h3 data-i18n="icd_page.impact1_title">Fewer Claim Denials</h3>
                    <p data-i18n="icd_page.impact1_desc">Accurate, specific codes reduce the mismatches and errors that trigger claim rejections, improving first-pass acceptance rates and reducing rework.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <span class="material-symbols-rounded list-item-icon">attach_money</span>
                    <h3 data-i18n="icd_page.impact2_title">Reduced Revenue Leakage</h3>
                    <p data-i18n="icd_page.impact2_desc">Under-coding costs practices thousands annually. ClinixSummary captures the full clinical picture, ensuring that all documented conditions are properly coded.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <span class="material-symbols-rounded list-item-icon">analytics</span>
                    <h3 data-i18n="icd_page.impact3_title">Better Analytics</h3>
                    <p data-i18n="icd_page.impact3_desc">Consistent, accurate coding improves population health analytics, quality reporting and benchmarking across your practice or health system.</p>
                </div>
            </div>
        `,
        ctaTitle: 'Start coding with confidence.',
        ctaToast: 'Starting free trial with ICD-10 coding.',
        ctaLabel: 'Start Free Trial',
    });
}


// ---------------------------------------------------------------------------
// Physiotherapy (dedicated console page - SEO PR4)
// ---------------------------------------------------------------------------

function PhysioPage() {
    return createCapabilityPage({
        ns: "physio_page",
        kicker: "Physiotherapy",
        title: "The AI Scribe Built for Physiotherapists.",
        description: "Physiotherapy documentation lives on measurements \u2014 range of motion, strength grades, functional tests, outcome measures. ClinixSummary's dedicated physiotherapy console captures them from your spoken assessment and structures them into treatment plans and progress notes that meet payer and regulatory standards, so you finish your notes before your patient reaches the car park.",
        features: [
            {
                icon: "accessibility_new",
                title: "ROM, Strength & Special Tests",
                desc: "Speak your findings naturally \u2014 range-of-motion measurements, manual muscle testing grades, ligament and special tests \u2014 and they land as structured, comparable data in the note.",
            },
            {
                icon: "assignment",
                title: "Assessment to Treatment Plan",
                desc: "Your clinical reasoning becomes a documented plan: goals, interventions, exercise prescription and progression criteria, written the way physiotherapists actually practise.",
            },
            {
                icon: "trending_up",
                title: "Progress & Discharge Notes",
                desc: "Serial visits stay consistent: prior measures carry context, progress is charted against goals, and discharge summaries write themselves from the treatment history.",
            },
            {
                icon: "verified",
                title: "Payer-Ready Structure",
                desc: "Notes carry the functional evidence, outcome measures and medical-necessity language that insurers and regulators expect \u2014 without you typing a word of it.",
            }
        ],
        extraContent: `
            <div style="margin-bottom: 60px;">
                <h2 class="section-title" data-i18n="physio_page.ns_title">What a generated physiotherapy note includes</h2>
                <div class="grid-3">
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="physio_page.ns_i1">Subjective history, mechanism of injury and functional limitations</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="physio_page.ns_i2">Objective findings: ROM, MMT grades, special tests, palpation, gait and movement analysis</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="physio_page.ns_i3">Clinical impression with evidence-based reasoning</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="physio_page.ns_i4">Treatment performed and patient response within the session</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="physio_page.ns_i5">Exercise prescription with sets, reps, load and progression criteria</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="physio_page.ns_i6">Outcome measures, goals, safety-netting and follow-up plan</p>
                </div>
                </div>
            </div>
            <div>
                <h2 class="section-title" data-i18n="physio_page.faq_title">Physiotherapy documentation, answered</h2>
                <div class="grid-2">
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="physio_page.faq1_q" data-faq-q>Does ClinixSummary understand physiotherapy terminology?</h3>
                    <p class="section-copy" data-i18n="physio_page.faq1_a" data-faq-a>Yes. The physiotherapy console is purpose-built: it recognises ROM conventions, MMT grading, special test names, outcome measures such as the LEFS or Oswestry, and exercise prescription language — it is not a general medical scribe with physio labels.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="physio_page.faq2_q" data-faq-q>Can I use it for both initial assessments and follow-up visits?</h3>
                    <p class="section-copy" data-i18n="physio_page.faq2_a" data-faq-a>Yes. Initial assessments generate a full subjective/objective examination with impression and plan; follow-ups produce progress notes that track change against goals and prior measures.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="physio_page.faq3_q" data-faq-q>Does it work for physical therapists in the US as well as physiotherapists?</h3>
                    <p class="section-copy" data-i18n="physio_page.faq3_a" data-faq-a>Yes. The console handles both physiotherapy and physical therapy conventions, including US payer-oriented documentation with medical-necessity language and CPT code suggestions.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="physio_page.faq4_q" data-faq-q>How long does a note take?</h3>
                    <p class="section-copy" data-i18n="physio_page.faq4_a" data-faq-a>Seconds after you finish speaking. Dictate during or after the session; the structured note, exercise plan and any selected extras — referral letters, patient handouts, coding suggestions — arrive together.</p>
                </div>
                </div>
            </div>`,
        ctaTitle: "Finish your physio notes before the patient leaves.",
        ctaToast: "Starting free trial.",
        ctaLabel: "Start Free Trial",
    });
}

// ---------------------------------------------------------------------------
// Occupational Therapy (dedicated console page - SEO PR4)
// ---------------------------------------------------------------------------

function OTPage() {
    return createCapabilityPage({
        ns: "ot_page",
        kicker: "Occupational Therapy",
        title: "Occupational Therapy Notes, Structured Around Function.",
        description: "Occupational therapy documentation is about occupation and function \u2014 ADLs, IADLs, cognition, environment, participation. ClinixSummary's dedicated OT console turns your spoken assessment into structured, goal-oriented notes that capture functional performance the way OTs reason about it.",
        features: [
            {
                icon: "self_care",
                title: "Function-First Structure",
                desc: "ADL and IADL performance, assistance levels, cognitive and perceptual findings, and environmental factors are captured as structured findings \u2014 not buried in free text.",
            },
            {
                icon: "flag",
                title: "Goal-Oriented Plans",
                desc: "Client-centred goals, graded interventions, equipment recommendations and home programmes are documented in the occupation-focused language your profession expects.",
            },
            {
                icon: "checklist",
                title: "Assessment Tools Recognised",
                desc: "Standardised measures \u2014 COPM, MoCA, FIM-style scoring and more \u2014 are recognised from your narration and recorded with their scores and interpretation.",
            },
            {
                icon: "diversity_3",
                title: "Across Settings",
                desc: "Hand therapy, neuro rehab, paediatrics, mental health or community practice: the console adapts its structure to the setting you describe.",
            }
        ],
        extraContent: `
            <div style="margin-bottom: 60px;">
                <h2 class="section-title" data-i18n="ot_page.ns_title">What a generated OT note includes</h2>
                <div class="grid-3">
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="ot_page.ns_i1">Occupational profile and reason for referral</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="ot_page.ns_i2">Functional performance: ADLs, IADLs, assistance levels and safety</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="ot_page.ns_i3">Cognitive, perceptual and psychosocial observations</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="ot_page.ns_i4">Standardised assessment scores and interpretation</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="ot_page.ns_i5">Client-centred goals and graded intervention plan</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="ot_page.ns_i6">Equipment, adaptations, home programme and follow-up</p>
                </div>
                </div>
            </div>
            <div>
                <h2 class="section-title" data-i18n="ot_page.faq_title">Occupational therapy documentation, answered</h2>
                <div class="grid-2">
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="ot_page.faq1_q" data-faq-q>Is this a general scribe with OT labels?</h3>
                    <p class="section-copy" data-i18n="ot_page.faq1_a" data-faq-a>No — it is a dedicated occupational therapy console. It structures notes around occupation and function: performance in daily activities, assistance levels, participation and environment, with the clinical reasoning OTs actually use.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="ot_page.faq2_q" data-faq-q>Can it document standardised assessments?</h3>
                    <p class="section-copy" data-i18n="ot_page.faq2_a" data-faq-a>Yes. Mention the tool and scores in your narration — COPM, MoCA and similar — and they are recorded with scores, context and interpretation in the structured note.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="ot_page.faq3_q" data-faq-q>Does it support paediatric and neuro settings?</h3>
                    <p class="section-copy" data-i18n="ot_page.faq3_a" data-faq-a>Yes. The console adapts to the setting you describe — paediatrics, neurological rehabilitation, hand therapy, mental health or community practice — and structures the note accordingly.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="ot_page.faq4_q" data-faq-q>What about referral letters and patient materials?</h3>
                    <p class="section-copy" data-i18n="ot_page.faq4_a" data-faq-a>Selected modules generate professional referral letters, plain-language patient handouts, follow-up plans and coding suggestions alongside the clinical note.</p>
                </div>
                </div>
            </div>`,
        ctaTitle: "Document function, not paperwork.",
        ctaToast: "Starting free trial.",
        ctaLabel: "Start Free Trial",
    });
}

// ---------------------------------------------------------------------------
// Speech & Language Therapy (dedicated console page - SEO PR4)
// ---------------------------------------------------------------------------

function SLTPage() {
    return createCapabilityPage({
        ns: "slt_page",
        kicker: "Speech & Language Therapy",
        title: "Speech & Language Therapy Notes That Speak Your Language.",
        description: "From dysphagia assessments to language sampling, SLT documentation is uniquely specialised. ClinixSummary's dedicated speech and language therapy console understands the terminology of communication and swallowing \u2014 and turns your spoken session summary into a structured clinical note in seconds.",
        features: [
            {
                icon: "record_voice_over",
                title: "Swallowing & Dysphagia",
                desc: "Bedside and instrumental findings, consistencies and IDDSI levels, aspiration risk and safe-swallow recommendations are structured into clear, defensible documentation.",
            },
            {
                icon: "graphic_eq",
                title: "Speech, Language & Voice",
                desc: "Articulation, phonology, expressive and receptive language, voice quality and fluency observations are captured with the precision your discipline demands.",
            },
            {
                icon: "child_care",
                title: "Paediatric & Adult Caseloads",
                desc: "Early language development, school-age communication, acquired neurological disorders, head and neck rehabilitation \u2014 the console adapts to the caseload you describe.",
            },
            {
                icon: "track_changes",
                title: "Therapy Goals & Outcomes",
                desc: "SMART goals, session performance against targets, cueing levels and outcome measures are documented consistently across the episode of care.",
            }
        ],
        extraContent: `
            <div style="margin-bottom: 60px;">
                <h2 class="section-title" data-i18n="slt_page.ns_title">What a generated SLT note includes</h2>
                <div class="grid-3">
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="slt_page.ns_i1">Case history and presenting communication or swallowing concern</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="slt_page.ns_i2">Assessment findings: speech, language, voice, fluency or dysphagia specifics</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="slt_page.ns_i3">Clinical impression and evidence-based reasoning</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="slt_page.ns_i4">Session activities, cueing levels and patient response</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="slt_page.ns_i5">SMART goals with measurable targets</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="slt_page.ns_i6">Recommendations, safety advice and follow-up plan</p>
                </div>
                </div>
            </div>
            <div>
                <h2 class="section-title" data-i18n="slt_page.faq_title">SLT documentation, answered</h2>
                <div class="grid-2">
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="slt_page.faq1_q" data-faq-q>Does it understand dysphagia terminology?</h3>
                    <p class="section-copy" data-i18n="slt_page.faq1_a" data-faq-a>Yes — including IDDSI levels, penetration-aspiration observations, bedside and instrumental assessment language, and safe-swallow recommendations, structured into clear clinical documentation.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="slt_page.faq2_q" data-faq-q>Is it suitable for paediatric speech therapy?</h3>
                    <p class="section-copy" data-i18n="slt_page.faq2_a" data-faq-a>Yes. The console handles developmental caseloads — early language, articulation and phonology, school-age communication — alongside adult and acquired disorders.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="slt_page.faq3_q" data-faq-q>Do American SLPs and British SLTs both fit?</h3>
                    <p class="section-copy" data-i18n="slt_page.faq3_a" data-faq-a>Yes. The console follows the conventions you use, whether you practise as a speech-language pathologist or a speech and language therapist, and adapts terminology accordingly.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="slt_page.faq4_q" data-faq-q>Can it produce parent- or patient-friendly summaries?</h3>
                    <p class="section-copy" data-i18n="slt_page.faq4_a" data-faq-a>Yes. The patient information leaflet module generates plain-language summaries and home practice guidance alongside the clinical note.</p>
                </div>
                </div>
            </div>`,
        ctaTitle: "Spend your sessions on communication, not keyboards.",
        ctaToast: "Starting free trial.",
        ctaLabel: "Start Free Trial",
    });
}

// ---------------------------------------------------------------------------
// Nutritional Therapy (dedicated console page - SEO PR4)
// ---------------------------------------------------------------------------

function NutritionPage() {
    return createCapabilityPage({
        ns: "nutrition_page",
        kicker: "Nutritional Therapy",
        title: "ADIME Notes for Nutrition Professionals. Automatically.",
        description: "Dietitians and nutrition professionals document in a structure all their own \u2014 ADIME. ClinixSummary's dedicated nutritional therapy console captures your consultation and writes the Assessment, Diagnosis, Intervention, Monitoring & Evaluation note for you, with PES statements where the evidence supports them.",
        features: [
            {
                icon: "restaurant",
                title: "True ADIME Structure",
                desc: "Assessment, Diagnosis, Intervention, Monitoring & Evaluation \u2014 the note follows the nutrition care process, with PES-style diagnoses where the encounter supports them.",
            },
            {
                icon: "monitoring",
                title: "Complete Nutrition Assessment",
                desc: "Intake history, anthropometrics, labs, medications, supplements, allergies and intolerances, and barriers to change are captured and stated explicitly \u2014 including allergy status.",
            },
            {
                icon: "health_and_safety",
                title: "Safety Built In",
                desc: "Allergen avoidance, drug\u2013nutrient interactions and refeeding risk are flagged in the education and safety sections, with red flags documented for follow-up.",
            },
            {
                icon: "menu_book",
                title: "Patient Education Materials",
                desc: "Plain-language dietary advice and patient handouts are generated alongside the clinical note \u2014 practical, personalised and ready to share.",
            }
        ],
        extraContent: `
            <div style="margin-bottom: 60px;">
                <h2 class="section-title" data-i18n="nutrition_page.ns_title">What a generated nutrition note includes</h2>
                <div class="grid-3">
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="nutrition_page.ns_i1">Assessment: nutrition history, intake, anthropometrics, labs, medications and supplements</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="nutrition_page.ns_i2">Explicit allergy and intolerance status</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="nutrition_page.ns_i3">Nutrition diagnosis, PES-style where supported</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="nutrition_page.ns_i4">Intervention: counselling, meal planning, behaviour change and supplementation</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="nutrition_page.ns_i5">Monitoring & evaluation with outcome measures and adherence tracking</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <p class="section-copy" data-i18n="nutrition_page.ns_i6">Education, agreed goals and red-flag safety-netting</p>
                </div>
                </div>
            </div>
            <div>
                <h2 class="section-title" data-i18n="nutrition_page.faq_title">Nutrition documentation, answered</h2>
                <div class="grid-2">
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="nutrition_page.faq1_q" data-faq-q>Does it really follow the ADIME format?</h3>
                    <p class="section-copy" data-i18n="nutrition_page.faq1_a" data-faq-a>Yes — the nutritional therapy console is built around the nutrition care process: Assessment, Diagnosis (PES-style where supported), Intervention, and Monitoring & Evaluation, plus education and agreed goals.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="nutrition_page.faq2_q" data-faq-q>How does it handle food allergies and intolerances?</h3>
                    <p class="section-copy" data-i18n="nutrition_page.faq2_a" data-faq-a>Allergy and intolerance status is stated explicitly in every note, and the education section carries allergen-avoidance advice and relevant drug–nutrient interaction warnings.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="nutrition_page.faq3_q" data-faq-q>Is it suitable for clinical dietitians in hospitals?</h3>
                    <p class="section-copy" data-i18n="nutrition_page.faq3_a" data-faq-a>Yes. The console documents refeeding risk, biochemical context and medical complexity alongside community and private-practice consultations.</p>
                </div>
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-i18n="nutrition_page.faq4_q" data-faq-q>Can my patients get a take-home summary?</h3>
                    <p class="section-copy" data-i18n="nutrition_page.faq4_a" data-faq-a>Yes. The patient information leaflet module produces a plain-language handout of the dietary advice and agreed goals, ready to print or send.</p>
                </div>
                </div>
            </div>`,
        ctaTitle: "Write the ADIME note while you say goodbye.",
        ctaToast: "Starting free trial.",
        ctaLabel: "Start Free Trial",
    });
}
