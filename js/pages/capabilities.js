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
                    <h2 class="subpage-title"${d('title')}>${config.title}</h2>
                    <p class="subpage-copy"${d('description')}>${config.description}</p>
                </div>

                ${betaNotice}

                <div class="${gridClass}" style="margin-bottom: 60px;">
                    ${featureCards}
                </div>

                ${config.extraContent || ''}

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

function CapMedicalPage() {
    return createCapabilityPage({
        ns: 'cap_medical',
        kicker: 'Medical Specialties',
        title: 'All Medical Specialties. One Platform.',
        description:
            'ClinixSummary supports 40+ specialties \u2014 from primary care to cardiology, neurology, orthopaedics, dermatology, paediatrics and beyond. Every module is fine\u2011tuned for the terminology, workflows and documentation standards that define your discipline.',
        features: [
            {
                icon: 'tune',
                title: 'Specialty-Tuned Models',
                desc: 'Each specialty runs on a dedicated model layer trained on de\u2011identified clinical data specific to that discipline \u2014 ensuring the right terminology, structure and clinical nuance every time.',
            },
            {
                icon: 'description',
                title: 'Structured SOAP Notes',
                desc: 'Automatically generate fully structured SOAP notes that match the conventions of your specialty. Subjective, Objective, Assessment and Plan sections are populated with clinically relevant detail.',
            },
            {
                icon: 'medical_information',
                title: 'ICD-10 & CPT Coding',
                desc: 'Our AI maps clinical narratives to the most accurate ICD\u201110 and CPT codes, reducing under\u2011coding and claim denials while supporting cleaner revenue cycles.',
            },
            {
                icon: 'output',
                title: 'Multi-format Output',
                desc: 'Export documentation as SOAP notes, referral letters, patient instructions or custom templates \u2014 formatted and ready for your EHR, fax or patient portal.',
            },
        ],
        extraContent: `
            <div class="subpage-header" style="margin-top: 20px;">
                <span class="kicker" data-i18n="cap_medical.extra_kicker">Breadth & Depth</span>
                <h3 class="section-title" data-i18n="cap_medical.extra_title">One engine. Dozens of specialties.</h3>
                <p class="section-copy" data-i18n="cap_medical.extra_desc">Whether you practise family medicine, cardiology, gastroenterology, pulmonology, endocrinology, rheumatology, nephrology, haematology, oncology, ENT, urology, ophthalmology, emergency medicine, or any other discipline \u2014 ClinixSummary adapts to your clinical language and documentation requirements.</p>
            </div>
        `,
        ctaTitle: 'Start documenting smarter across every specialty.',
        ctaToast: 'Starting free trial for medical specialties.',
        ctaLabel: 'Start Free Trial',
    });
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
                    <h2 class="subpage-title" data-i18n="allied.title">Purpose-Built Documentation for Allied Health Professionals.</h2>
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
                    <h2 class="subpage-title" data-i18n="billing.title">Intelligent Billing Assistance for Healthcare Organisations.</h2>
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
        ctaHref: '#contact',
        ctaTitle: 'Interested in Radiology Assist? Join the beta.',
        ctaLabel: 'Request Beta Access',
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
        ctaHref: '#contact',
        ctaTitle: 'Interested in Dermatology Assist? Join the beta.',
        ctaLabel: 'Request Beta Access',
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
        ctaHref: '#contact',
        ctaTitle: 'Interested in Triage Assist? Join the beta.',
        ctaLabel: 'Request Beta Access',
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
