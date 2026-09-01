// --- Learn Pages: Publications, Whitepapers, News, Podcasts ---

// ---------------------------------------------------------------------------
// Shared: paper date formatting & card renderer
// ---------------------------------------------------------------------------

function _formatPaperDate(d) {
    try {
        return new Intl.DateTimeFormat(I18n.locale, { month: 'long', year: 'numeric' })
            .format(new Date(d.y, d.m - 1));
    } catch (_) { return d.m + '/' + d.y; }
}

function _renderPaperCard(p, ns) {
    const locale  = I18n.locale;

    const pLang = (p.lang || 'en').toLowerCase();
    const native  = (pLang === locale);

    const summary = p.desc;

    const dateStr = _formatPaperDate(p.date);

    const langName = I18n.t('papers.lang_' + pLang, p.lang);
    const isRtl   = pLang === 'ar';

    const provenance = !native ? `
            <p style="color: var(--accent); font-size: 11px; font-weight: 600; margin-bottom: 6px; letter-spacing: 0.02em;">
                ${I18n.t('papers.summary_label', 'Summary')} · ${I18n.t('papers.original_in', 'Original publication in')} ${langName}
            </p>` : '';

    const expandable = !native ? `
            <details style="margin-top: 8px;">
                <summary style="font-size: 12px; color: var(--text-secondary); cursor: pointer; user-select: none;">
                    ${I18n.t('papers.view_original', 'View original abstract')}
                </summary>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px; padding: 12px; background: var(--bg-subtle); border-radius: 8px; border-inline-start: 3px solid var(--accent);" ${isRtl ? 'dir="rtl"' : ''}>
                    ${p.desc}
                </p>
            </details>` : '';

    return `
        <div class="card" style="display: flex; flex-direction: column;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="card-icon material-symbols-rounded" style="margin-bottom: 0;">${p.icon}</div>
                ${p.lang ? `<span style="background: var(--accent); color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.05em;">${p.lang}</span>` : ''}
            </div>
            <h3 style="margin-top: 12px;" ${isRtl ? 'dir="rtl"' : ''}>${p.title}</h3>
            <p style="color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">${dateStr}</p>
            ${provenance}
            <p style="flex-grow: 1;">${summary}</p>
            ${expandable}
            <a href="${p.landing || p.pdf}" ${p.landing ? '' : 'target="_blank"'} class="btn-outline" style="margin-top: 16px; width: 100%; text-align: center; text-decoration: none; display: block;">
                ${p.landing ? I18n.t('papers.read_online', 'Read online') : I18n.t('papers.view_pdf', 'View PDF')}
            </a>
        </div>`;
}

async function fetchPublications() {
    try {
        const res = await fetch(BASE_PATH + '/api/v2/news?type=publications', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!res.ok) throw new Error(`Server returned ${res.status}`);

        const data = await res.json();
        
        if(data.statusCode == 200) {
            return data.data;
        }
        return [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

function PublicationsPage() {
    document.getElementById('app-content').innerHTML = ``;

    fetchPublications().then(function(response) {

        const publications = (response || []).map((item, index) => {
            let date = { y: 0, m: 0 };

            if (item.publish_month) {
                const parts = item.publish_month.split(' ');
                const monthNames = [
                    "January","February","March","April","May","June",
                    "July","August","September","October","November","December"
                ];

                const m = monthNames.indexOf(parts[0]) + 1;
                const y = parseInt(parts[1]);

                date = { y, m };
            }

            return {
                id: 'pub_' + (index + 1),
                lang: (item.language_code || 'EN').toUpperCase(),
                icon: 'auto_stories',
                date: date,
                title: item.title || '',
                desc: getSummaryByLang(item),
                pdf: item.attachment
            };
        });

        const pubCards = publications.map(p => _renderPaperCard(p, 'papers')).join('');

        document.getElementById('app-content').innerHTML = `
            <section class="subpage-container">
                <div class="page-width">
                    <div class="subpage-header">
                        <span class="kicker" data-i18n="papers.pub_kicker">Publications</span>
                        <h1 class="subpage-title" data-i18n="papers.pub_title">Research, evidence, and thought leadership.</h1>
                        <p class="subpage-copy" data-i18n="papers.pub_desc">ClinixSummary's design is grounded in evidence and clinical expertise.</p>
                    </div>
                    <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                        ${pubCards}
                    </div>
                    <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                        <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;" data-i18n="papers.pub_cta_title">Want to dig deeper into the research?</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="papers.pub_cta_desc">We're happy to share full papers.</p>
                        <div class="nav-actions" style="justify-content: flex-start; margin-inline-start: 0;">
                            <a href="/contact" class="btn-primary" data-i18n="papers.pub_cta_btn">Request Publications</a>
                            <a href="/contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    });
}

// (a duplicate one-arg getSummaryByLang used to shadow this one - removed
// 2026-09-01; in sloppy-mode scripts the later declaration always won anyway)
function getSummaryByLang(item, langCode) {
    switch (langCode) {
        case 'es': return item.summary_es;
        case 'fr': return item.summary_fr;
        case 'pt': return item.summary_pt;
        case 'it': return item.summary_it;
        case 'ar': return item.summary_ar;
        default: return item.summary_en;
    }
}

// ---------------------------------------------------------------------------
// White Papers
// ---------------------------------------------------------------------------

function WhitepapersPage() {
    const whitepapers = [
        {
            id: 'wp_01', lang: 'AR', icon: 'neurology', date: { y: 2025, m: 11 },
            title: '\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0637\u0628\u064a\u0629',
            desc: '\u0627\u0644\u062a\u0639\u0642\u064a\u062f \u0627\u0644\u0635\u0631\u0641\u064a \u0648\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0644\u0647\u062c\u0627\u062a \u0648\u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0628\u064a\u0646 \u0627\u0644\u0644\u063a\u0627\u062a \u0641\u064a \u0627\u0644\u0628\u064a\u0626\u0627\u062a \u0627\u0644\u0633\u0631\u064a\u0631\u064a\u0629 \u0627\u0644\u062e\u0644\u064a\u062c\u064a\u0629 \u0648\u0627\u0644\u0645\u0635\u0631\u064a\u0629 \u0648\u0627\u0644\u0634\u0627\u0645\u064a\u0629 \u0648\u0627\u0644\u0645\u063a\u0627\u0631\u0628\u064a\u0629.',
            pdf: '/docs/whitepapers/ar-arabic-nlp-medical-2026.pdf', landing: '/whitepapers/arabic-medical-nlp'
        },
        {
            id: 'wp_02', lang: 'FR', icon: 'policy', date: { y: 2025, m: 9 },
            title: 'Cadre de Conformit\u00e9 RGPD pour la Documentation Clinique Automatis\u00e9e',
            desc: 'Analyse approfondie des exigences du RGPD appliqu\u00e9es \u00e0 la documentation clinique par IA \u2014 obligations du responsable de traitement, AIPD, droits des patients et r\u00f4le de la CNIL.',
            pdf: '/docs/whitepapers/fr-conformite-rgpd-documentation-2026.pdf', landing: '/whitepapers/gdpr-clinical-documentation'
        },
        {
            id: 'wp_03', lang: 'EN', icon: 'graphic_eq', date: { y: 2025, m: 8 },
            title: 'Ambient Audio Processing: From Sound to Structured Note',
            desc: 'How raw audio becomes a structured clinical document \u2014 speaker diarisation, medical NER, section classification, and note assembly.',
            pdf: '/docs/whitepapers/ambient-audio-processing-2025.pdf', landing: '/whitepapers/ambient-audio-processing'
        },
        {
            id: 'wp_04', lang: 'EN', icon: 'verified', date: { y: 2025, m: 7 },
            title: 'Quality Management System (QMS): How Clinix QM Works',
            desc: 'The QA review process, feedback incorporation, model versioning, output monitoring, and continuous improvement protocols.',
            pdf: '/docs/whitepapers/quality-management-system-qms-2025.pdf', landing: '/whitepapers/quality-management-system'
        },
        {
            id: 'wp_05', lang: 'EN', icon: 'security', date: { y: 2025, m: 6 },
            title: 'Security & Compliance Technical Specification',
            desc: 'Encryption standards, access controls, audit logging, and HIPAA/GDPR technical implementation details for compliance officers and CTOs.',
            pdf: '/docs/whitepapers/security-compliance-specification-2025.pdf', landing: '/whitepapers/security-compliance-specification'
        },
        {
            id: 'wp_06', lang: 'EN', icon: 'integration_instructions', date: { y: 2025, m: 5 },
            title: 'Integration Framework: Connecting to EHR/EMR Systems',
            desc: 'API specifications, data formats, FHIR compatibility, and deployment models (cloud/hybrid) for seamless EHR integration.',
            pdf: '/docs/whitepapers/integration-framework-ehr-emr-2025.pdf', landing: '/whitepapers/ehr-integration-framework'
        },
        {
            id: 'wp_07', lang: 'EN', icon: 'model_training', date: { y: 2025, m: 4 },
            title: 'Clinical Model Training Methodology',
            desc: 'Data sourcing from de-identified sources, training pipeline, specialty-specific fine-tuning, evaluation metrics, and quality assurance processes.',
            pdf: '/docs/whitepapers/clinical-model-training-methodology-2025.pdf', landing: '/whitepapers/clinical-model-training'
        },
        {
            id: 'wp_08', lang: 'EN', icon: 'architecture', date: { y: 2025, m: 3 },
            title: 'ClinixSummary Architecture: A Technical Overview',
            desc: 'System architecture, model pipeline, audio processing, NLP layers, and output generation. A comprehensive look at how ClinixSummary transforms clinical audio into structured documentation.',
            pdf: '/docs/whitepapers/clinixsummary-architecture-overview-2025.pdf', landing: '/whitepapers/architecture-overview'
        }
    ];

    const wpCards = whitepapers.map(w => _renderPaperCard(w, 'papers')).join('');

    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="papers.wp_kicker">White Papers</span>
                    <h1 class="subpage-title" data-i18n="papers.wp_title">Technical methodology and deep dives.</h1>
                    <p class="subpage-copy" data-i18n="papers.wp_desc">Our white papers provide detailed technical documentation for CTOs, IT leaders, and compliance officers. Explore the architecture, methodology, and security framework behind ClinixSummary.</p>
                </div>

                <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                    ${wpCards}
                </div>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;" data-i18n="papers.wp_cta_title">Need a technical deep dive for your team?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="/contact" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" data-i18n="papers.wp_cta_btn">Request White Papers</a>
                        <a href="/security" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;" data-i18n="papers.wp_cta_secondary">View Trust Center</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

async function fetchNews() {
    try {
        const res = await fetch(BASE_PATH + '/api/v2/news?type=news', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!res.ok) throw new Error(`Server returned ${res.status}`);

        const data = await res.json();
        
        if (data.statusCode == 200) {
            return data.data;
        }
        return [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

function NewsPage() {
    document.getElementById('app-content').innerHTML = ``;

    fetchNews().then(function(response) {

        const newsItems = (response || []).map((item, index) => {
            let date = { y: 0, m: 0 };

            if (item.publish_month) {
                const parts = item.publish_month.split(' ');
                const monthNames = [
                    "January","February","March","April","May","June",
                    "July","August","September","October","November","December"
                ];

                const m = monthNames.indexOf(parts[0]) + 1;
                const y = parseInt(parts[1]);

                date = { y, m };
            }

            return {
                id: 'news_' + (index + 1),
                title: item.title || '',
                desc: getSummaryByLang(item,I18n.locale),
                date: date
            };
        });

        const newsHtml = newsItems.map(n => {
            const dateStr = _formatPaperDate(n.date);

            return `
                <div class="text-group">
                    <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">
                        ${dateStr}
                    </span>
                    <h3>${n.title}</h3>
                    <p>${n.desc}</p>
                </div>
            `;
        }).join('');

        document.getElementById('app-content').innerHTML = `
            <section class="subpage-container">
                <div class="page-width">
                    <div class="subpage-header">
                        <span class="kicker" data-i18n="news.kicker">News & Events</span>
                        <h1 class="subpage-title" data-i18n="news.title">Latest news & product updates.</h1>
                        <p class="subpage-copy" data-i18n="news.description">
                            Follow our journey as we expand into new specialties, roll out advanced modules and share major company milestones.
                        </p>
                    </div>

                    <div style="max-width: 800px;">
                        ${newsHtml}
                    </div>

                    <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                        <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;" data-i18n="news.story_title">
                            Want to share your story?
                        </h4>
                        <p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="news.story_desc">
                            If you’ve used ClinixSummary to transform your practice, we’d love to highlight your success.
                        </p>
                        <div class="nav-actions" style="justify-content: flex-start; margin-inline-start: 0;">
                            <a href="/contact" class="btn-primary" data-i18n="news.story_submit">Submit a story</a>
                            <a href="/contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    });
}

// function NewsPage() {
//     return `
//         <section class="subpage-container">
//             <div class="page-width">
//                 <div class="subpage-header">
//                     <span class="kicker" data-i18n="news.kicker">News & Events</span>
//                     <h1 class="subpage-title" data-i18n="news.title">Latest news & product updates.</h1>
//                     <p class="subpage-copy" data-i18n="news.description">Follow our journey as we expand into new specialties, roll out advanced modules and share major company milestones.</p>
//                 </div>

//                 <div style="max-width: 800px;">
//                     <div class="text-group">
//                         <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q1_2026_kicker">Q1 2026</span>
//                         <h3 data-i18n="news.q1_2026_title">Language Expansion: Arabic with Full RTL Support</h3>
//                         <p data-i18n="news.q1_2026_desc">ClinixSummary now supports Arabic with complete right-to-left interface and documentation support, joining English, French, Spanish, Portuguese, and Italian. This milestone extends our reach to clinicians across the Middle East and North Africa.</p>
//                     </div>
//                     <div class="text-group">
//                         <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q4_2025_kicker">Q4 2025</span>
//                         <h3 data-i18n="news.q4_2025a_title">Clinix Foundation Initiative Launched</h3>
//                         <p data-i18n="news.q4_2025a_desc">We\u2019re proud to announce the Clinix Foundation \u2014 our programme providing free ClinixSummary access to clinics and practices in relief areas and underserved communities. Applications are now open for humanitarian relief clinics, rural health centres, and NGO-operated medical facilities.</p>
//                     </div>
//                     <div class="text-group">
//                         <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q4_2025_kicker">Q4 2025</span>
//                         <h3 data-i18n="news.q4_2025b_title">CME/CPD Vault Launch</h3>
//                         <p data-i18n="news.q4_2025b_desc">The CME/CPD Vault is now live, integrating continuing medical education directly into the documentation workflow. Clinicians can now track learning hours and earn credits from their documented clinical encounters.</p>
//                     </div>
//                     <div class="text-group">
//                         <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q3_2025_kicker">Q3 2025</span>
//                         <h3 data-i18n="news.q3_2025a_title">UK Medical Device Registration Application</h3>
//                         <p data-i18n="news.q3_2025a_desc">ClinixSummary has formally applied for medical device registration in the United Kingdom, demonstrating our commitment to regulatory compliance and clinical safety standards. This marks an important step in our journey toward full regulatory recognition.</p>
//                     </div>
//                     <div class="text-group">
//                         <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q3_2025_kicker">Q3 2025</span>
//                         <h3 data-i18n="news.q3_2025b_title">Allied Health Modules Released</h3>
//                         <p data-i18n="news.q3_2025b_desc">New dedicated modules for Physiotherapy, Occupational Therapy, and Speech & Language Therapy are now available. Each module features discipline-specific documentation patterns, terminology, and assessment frameworks.</p>
//                     </div>
//                     <div class="text-group">
//                         <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q2_2025_kicker">Q2 2025</span>
//                         <h3 data-i18n="news.q2_2025_title">Module Updates: Expanded Specialty Coverage</h3>
//                         <p data-i18n="news.q2_2025_desc">Ongoing updates to our specialty modules have expanded coverage to 40+ medical specialties with improved accuracy, expanded terminology recognition, and enhanced language support across all modules.</p>
//                     </div>
//                     <div class="text-group">
//                         <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q1_2025_kicker">Q1 2025</span>
//                         <h3 data-i18n="news.q1_2025_title">ClinixSummary Platform Launch</h3>
//                         <p data-i18n="news.q1_2025_desc">ClinixSummary officially launches as a comprehensive AI medical scribe platform, offering ambient and dictation-based clinical documentation across multiple medical specialties with HIPAA and GDPR compliance from day one.</p>
//                     </div>
//                 </div>

//                 <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
//                     <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;" data-i18n="news.story_title">Want to share your story?</h4>
//                     <p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="news.story_desc">If you\u2019ve used ClinixSummary to transform your practice, we\u2019d love to highlight your success. Get in touch with our marketing team to be featured.</p>
//                     <div class="nav-actions" style="justify-content: flex-start; margin-inline-start: 0;">
//                         <a href="/contact" class="btn-primary" data-i18n="news.story_submit">Submit a story</a>
//                         <a href="/contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     `;
// }

function CaseStudiesPage() {
    const caseStudies = [
        {
            title: 'Documentation Time & Encounter Efficiency: A 12-Week Multi-Specialty Study',
            icon: 'timer',
            setting: 'Multi-specialty clinic \u2014 18 clinicians',
            period: '12 weeks',
            challenge: 'Clinicians were spending an average of 16 minutes per encounter on documentation, with an additional 45 minutes of \u201cpajama time\u201d after hours. Patient throughput was limited by documentation bottleneck, and clinician satisfaction scores were declining.',
            outcome: 'After deploying ClinixSummary, average documentation time dropped to 3 minutes per encounter \u2014 an 81% reduction. Clinicians reported reclaiming an average of 2.1 hours per day previously spent on documentation. After-hours documentation was virtually eliminated, with 94% of notes completed before the clinician left the exam room.',
            metrics: [
                { label: 'Documentation time reduction', value: '81%' },
                { label: 'Hours reclaimed per clinician per day', value: '2.1 hrs' },
                { label: 'Same-day note completion rate', value: '94%' },
            ]
        },
        {
            title: 'Billing Capture Before & After: Primary Care Group Practice',
            icon: 'request_quote',
            setting: 'Primary care group \u2014 8 physicians',
            period: '6 months (3 months pre, 3 months post)',
            challenge: 'The practice was experiencing significant revenue leakage from missed charges. Manual coding was inconsistent, and clinicians frequently under-coded encounters due to time pressure. An internal audit estimated 12\u201318% of billable services were going uncaptured.',
            outcome: 'With ClinixSummary\u2019s Billing Assistance module, charge capture improved by 30% in the first month. Over the full 3-month post-deployment period, the practice saw a sustained 26% improvement in charge capture accuracy, translating to an additional $47,000 in monthly revenue across the group.',
            metrics: [
                { label: 'Charge capture improvement (month 1)', value: '30%' },
                { label: 'Sustained improvement (3-month avg)', value: '26%' },
                { label: 'Additional monthly revenue', value: '$47K' },
            ]
        },
        {
            title: 'Billing Capture Before & After: Emergency Department',
            icon: 'payments',
            setting: 'Community hospital ED \u2014 22 physicians',
            period: '8 months (4 months pre, 4 months post)',
            challenge: 'Emergency department documentation was frequently incomplete, leading to under-coding of critical care time, procedures and supplies. Claim denial rates averaged 14%, and charge capture reviews identified an estimated $180,000 in annual revenue leakage from documentation gaps alone.',
            outcome: 'ClinixSummary\u2019s real-time charge capture identified billable procedures, supplies and critical care time directly from encounter audio. Claim denial rates dropped from 14% to 5.2%, and total charge capture increased by 22%. The ED recovered an estimated $210,000 in previously lost annual revenue.',
            metrics: [
                { label: 'Claim denial rate reduction', value: '14% \u2192 5.2%' },
                { label: 'Total charge capture increase', value: '22%' },
                { label: 'Annual revenue recovered', value: '$210K' },
            ]
        },
        {
            title: 'Patient Satisfaction: The Impact of Clinician Presence',
            icon: 'sentiment_satisfied',
            setting: 'Family medicine practice \u2014 6 clinicians',
            period: '4 months',
            challenge: 'Patient satisfaction surveys consistently flagged that clinicians spent too much time looking at the computer during consultations. Patients reported feeling \u201crushed\u201d and \u201cunheard\u201d. The practice\u2019s Press Ganey scores for \u201ctime spent with provider\u201d ranked in the 35th percentile.',
            outcome: 'After adopting ClinixSummary\u2019s ambient documentation, clinicians could maintain eye contact and verbalise their clinical reasoning during the encounter. Patient satisfaction scores for \u201ctime spent with provider\u201d improved from the 35th to the 78th percentile. 82% of patients reported that their clinician \u201cspent more time talking to them\u201d, and unsolicited positive feedback increased by 40%.',
            metrics: [
                { label: 'Patient satisfaction percentile', value: '35th \u2192 78th' },
                { label: 'Patients reporting more clinician engagement', value: '82%' },
                { label: 'Increase in positive patient feedback', value: '40%' },
            ]
        },
        {
            title: 'Multi-Specialty Deployment: Large Health System Rollout',
            icon: 'corporate_fare',
            setting: 'Regional health system \u2014 4 hospitals, 120+ clinicians',
            period: '6 months phased rollout',
            challenge: 'The health system needed a single documentation platform that could serve cardiology, orthopaedics, general surgery, internal medicine, paediatrics and psychiatry. Existing solutions required separate configurations per department, creating training burden and inconsistent documentation quality.',
            outcome: 'ClinixSummary\u2019s specialty-tuned models were deployed across all six departments using a phased rollout. Each department required no specialty-specific configuration beyond selecting the appropriate module. Documentation consistency scores (measured by internal QA audits) improved from 68% to 91% across all departments. Clinician adoption reached 89% within 8 weeks, and the system reduced the organisation\u2019s reliance on outsourced transcription by 95%.',
            metrics: [
                { label: 'Documentation consistency score', value: '68% \u2192 91%' },
                { label: 'Clinician adoption (8 weeks)', value: '89%' },
                { label: 'Reduction in outsourced transcription', value: '95%' },
            ]
        },
        {
            title: 'Multilingual Practice: Breaking Language Barriers in Documentation',
            icon: 'translate',
            setting: 'Urban multispecialty clinic \u2014 12 clinicians, 4 languages',
            period: '5 months',
            challenge: 'The clinic served a diverse patient population where consultations regularly switched between English, Spanish, French and Arabic. Clinicians were forced to document exclusively in English, losing clinical nuance from non-English portions of encounters. Bilingual staff spent additional time translating and re-documenting.',
            outcome: 'ClinixSummary\u2019s multilingual models processed code-switching naturally, capturing clinical content in whatever language it was spoken and generating structured notes in the clinician\u2019s preferred output language. Documentation accuracy for bilingual encounters improved from 72% to 94%. The clinic eliminated the need for dedicated documentation translators, saving 15 staff hours per week.',
            metrics: [
                { label: 'Bilingual documentation accuracy', value: '72% \u2192 94%' },
                { label: 'Staff hours saved per week', value: '15 hrs' },
                { label: 'Languages supported in practice', value: '4' },
            ]
        },
        {
            title: 'Allied Health: Physiotherapy Practice Transformation',
            icon: 'exercise',
            setting: 'Physiotherapy practice \u2014 5 therapists',
            period: '3 months',
            challenge: 'Physiotherapists spent 20\u201325 minutes per patient on documentation, manually recording ROM measurements, functional test scores, treatment plans and progress notes. The documentation burden meant therapists could only see 8\u20139 patients per day, and notes were often completed hours after the session.',
            outcome: 'ClinixSummary\u2019s allied health module captured ROM, strength grades, functional tests and treatment goals directly from session narration. Documentation time dropped to 4 minutes per patient. Therapists increased patient throughput to 11\u201312 per day without extending working hours. All notes were completed before the next patient entered the room.',
            metrics: [
                { label: 'Documentation time per patient', value: '22 min \u2192 4 min' },
                { label: 'Daily patient throughput increase', value: '33%' },
                { label: 'Same-session note completion', value: '100%' },
            ]
        }
    ];

    const studyCards = caseStudies.map(s => {
        const metricItems = s.metrics.map(m => `
            <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: 700; color: var(--accent); font-family: var(--font-serif);">${m.value}</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${m.label}</div>
            </div>
        `).join('');

        return `
            <div style="border: 1px solid var(--border-subtle); border-radius: 12px; padding: 36px; margin-bottom: 24px; background: var(--bg-surface);">
                <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px;">
                    <span class="material-symbols-rounded" style="font-size: 32px; color: var(--accent); flex-shrink: 0;">${s.icon}</span>
                    <div>
                        <h3 style="font-family: var(--font-serif); font-size: 20px; font-weight: 700; margin-bottom: 8px;">${s.title}</h3>
                        <div style="display: flex; gap: 16px; font-size: 13px; color: var(--text-secondary); flex-wrap: wrap;">
                            <span><strong>Setting:</strong> ${s.setting}</span>
                            <span><strong>Period:</strong> ${s.period}</span>
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
                    <div>
                        <h4 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; margin-bottom: 8px;">Challenge</h4>
                        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">${s.challenge}</p>
                    </div>
                    <div>
                        <h4 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; margin-bottom: 8px;">Outcome</h4>
                        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">${s.outcome}</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); border-radius: 8px; padding: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                    ${metricItems}
                </div>
            </div>
        `;
    }).join('');

    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Case Studies</span>
                    <h1 class="subpage-title">Real results from real practices.</h1>
                    <p class="subpage-copy">See how clinicians and organisations across specialties and settings are using ClinixSummary to transform documentation workflows, improve billing accuracy and enhance patient care.</p>
                </div>

                ${studyCards}

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Ready to write your own success story?</h2>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">Join practices worldwide that have transformed their documentation workflow with ClinixSummary.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="window.open('${BASE_PATH}/console', '_blank')">Start Free Trial</a>
                        <a href="/contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}



// ---------------------------------------------------------------------------
// Whitepaper landing pages (SEO/GEO plan Phase 5; spec PAGE-WP-001/002,
// CITE-006, GEO-TPL-001). English-only citation surfaces (like the comparison
// pages): each published whitepaper gets an HTML landing with the paper's own
// abstract and key content - STRICTLY EXTRACTED from the PDFs (extraction
// fidelity notes archived in clinixsummary-ops/marketing/), authored by
// Dr Youssef Ghaly and Dr Mostafa Helmy, with the PDF as the child asset.
// The prerenderer harvests the data-wp-* markers into a ScholarlyArticle node.
// ---------------------------------------------------------------------------

const WP_AUTHORS_LINE = 'By Dr Youssef Ghaly and Dr Mostafa Helmy';

const WP_ARTICLES = [
    {
        "slug": "arabic-medical-nlp",
        "title": "AI and Arabic Medical Language Processing: Towards More Accurate Clinical Documentation",
        "abstract": "This Arabic-language whitepaper (INTL-2026-008, November 2025) analyzes why Arabic is among the most challenging languages for clinical natural language processing: a root-and-pattern morphology, right-to-left script, dialects that differ fundamentally from Modern Standard Arabic, constant Arabic-English code-switching, and Arabic, English, and Latin medical terms mixed within a single sentence. It concludes with ClinixSummary's reported results in Arabic medical language processing: 93% Arabic medical-term recognition accuracy, 94% code-switching handling accuracy, a 91% note acceptance rate in bilingual environments, and dialect coverage spanning Gulf, Egyptian, Levantine, and Maghrebi Arabic.",
        "findings": [
            {
                "heading": "Morphological complexity of Arabic",
                "text": "Arabic morphology is built on a root-and-pattern system: from the triliteral root k-t-b derive words such as katib, maktub, kitaba, maktab, and kitab. Because a single word can take dozens of different forms, recognizing medical terminology is more complex than in European languages."
            },
            {
                "heading": "Arabic dialects in the clinical setting",
                "text": "There is a fundamental gap between Modern Standard Arabic and the local dialects physicians use with patients daily, with Gulf, Egyptian, Levantine, and Maghrebi dialects each using different words for symptoms and diseases. The paper illustrates each dialect with an example symptom phrase mapped to its standard-Arabic meaning (e.g., Gulf \"endi sudaa w harara\" = \"I have a headache and fever\")."
            },
            {
                "heading": "Code-switching in clinical practice",
                "text": "Arabic-English code-switching is a defining feature of clinical practice in the Arab world: a physician may say, in one sentence, that the patient has \"chest pain\" and \"shortness of breath,\" the \"ECG\" is normal, but the \"troponin\" is slightly elevated. This mixed pattern is completely natural in Arabic clinical environments yet poses a major challenge for NLP systems."
            },
            {
                "heading": "Terminological duality in Arabic medicine",
                "text": "Arabic carries a rich medical heritage from the Golden Age of Islamic civilization — Ibn Sina, Al-Razi, and Ibn al-Nafis established Arabic medical terms still in use today. Yet many modern medical terms are used in English in daily practice, creating a terminological duality that clinical documentation systems must handle."
            },
            {
                "heading": "Reported performance results",
                "text": "The paper states that ClinixSummary achieved advanced results in Arabic medical language processing: 93% accuracy in recognizing Arabic medical terminology, 94% accuracy in handling code-switching, and a 91% note acceptance rate in bilingual environments. Dialect coverage spans Gulf, Egyptian, Levantine, and Maghrebi Arabic."
            }
        ],
        "topics": [
            "Arabic NLP",
            "Clinical documentation",
            "Code-switching",
            "Arabic dialects",
            "Medical terminology",
            "Morphological analysis"
        ],
        "pdf": "/docs/whitepapers/ar-arabic-nlp-medical-2026.pdf",
        "date": "2025-11",
        "paperLang": "ar",
        "icon": "neurology"
    },
    {
        "slug": "gdpr-clinical-documentation",
        "title": "GDPR Compliance Framework for Automated Clinical Documentation",
        "abstract": "This paper presents the GDPR compliance framework implemented by ClinixSummary for AI-generated clinical documentation, addressed to data protection officers (DPOs), information security officers (RSSI), and the leadership of French-speaking healthcare institutions. It analyses the legal bases for processing health data (a special category under Article 9 GDPR), data protection impact assessments, data minimisation, patient rights, and French health-data hosting (HDS) requirements. It concludes that GDPR compliance is not an obstacle to deploying AI in healthcare but the framework that provides the trust needed for its adoption.",
        "findings": [
            {
                "heading": "Legal bases: never consent",
                "text": "Processing rests on Article 6(1)(b) (performance of the contract of care), Article 9(2)(h) (medical diagnosis and provision of healthcare), and Article 6(1)(f) (legitimate interest, for specific operations such as service-quality improvement, subject to a balancing test). ClinixSummary never uses consent as the primary legal basis for clinical-documentation processing, because the inherent imbalance of the doctor-patient relationship makes consent difficult to consider \"freely given\" under the GDPR."
            },
            {
                "heading": "Pre-drafted DPIA using the CNIL's PIA methodology",
                "text": "Because AI processing of health data meets Article 35's high-risk threshold, ClinixSummary provides each client institution a pre-drafted data protection impact assessment (AIPD) following the CNIL's PIA methodology. It covers the processing description (consultation audio, transcription, clinical note), necessity and proportionality, risk identification, and mitigation measures: AES-256 encryption, cryptographic erasure of audio, access controls, logging, and pseudonymisation."
            },
            {
                "heading": "Data minimisation and purpose limitation",
                "text": "Under Article 5(1)(c), the audio recording is deleted as soon as the clinical note is generated and no audio file is retained; patient data are never used for model training (models are trained exclusively on de-identified and synthetic data); and data transit in encrypted RAM during processing, never written to disk in cleartext. Data are used solely for the declared purpose of generating clinical documentation — no profiling, behavioural analysis, or non-consented research."
            },
            {
                "heading": "Data subject rights in practice",
                "text": "The paper maps each GDPR right to a concrete mechanism: access via the treating health professional (Art. 15), rectification of inaccuracies by the clinician (Art. 16), erasure subject to legal medical-record retention (20 years in France under Code de la santé publique, Art. R. 1112-7) (Art. 17), portability of notes in structured, interoperable formats (HL7 FHIR, CDA) (Art. 20), and the patient's right to object to AI use during a consultation without consequence for their care (Art. 21)."
            },
            {
                "heading": "HDS-certified hosting and EU data residency",
                "text": "For French clients, ClinixSummary states it uses exclusively hosting providers holding France's HDS health-data-hosting certification (decree no. 2018-137) for processing and storage, with data residency guaranteed within the European Union."
            }
        ],
        "topics": [
            "GDPR",
            "Health data protection",
            "DPIA / CNIL PIA methodology",
            "Data minimisation",
            "Patient rights",
            "HDS certification"
        ],
        "pdf": "/docs/whitepapers/fr-conformite-rgpd-documentation-2026.pdf",
        "date": "2025-09",
        "paperLang": "fr",
        "icon": "policy"
    },
    {
        "slug": "ambient-audio-processing",
        "title": "Ambient Audio Processing: From Sound to Structured Note",
        "abstract": "This white paper traces how a live clinical conversation becomes a structured clinical note, walking through ClinixSummary's six-stage processing pipeline: audio capture and preprocessing, speech recognition, speaker diarisation, medical named entity recognition, section classification and clinical reasoning, and document assembly. It explains the clinical intelligence behind each stage and reports typical performance figures, including end-to-end processing of under 30 seconds for a standard 15-minute consultation. The paper concludes that a purpose-built pipeline integrating speech technology, medical NLP, and clinical domain knowledge lets clinicians focus on patients while the system handles documentation.",
        "findings": [
            {
                "heading": "A six-stage pipeline from audio to note",
                "text": "Processing follows six stages, each building on the last: audio capture and preprocessing, speech recognition and transcription, speaker diarisation, medical NER, section classification and clinical reasoning, and document assembly. End-to-end latency from final audio segment to complete note is typically under 30 seconds for a standard 15-minute consultation."
            },
            {
                "heading": "Medical speech recognition built for the clinic",
                "text": "The medical ASR model uses a 250,000+ medical term vocabulary with specialty-specific pronunciation variants, a contextual language model that biases toward clinically probable terms (e.g. \"dyspnoea\" over \"Disney\" in a respiratory consultation), real-time code-switching for multilingual consultations, and robust handling of abbreviations, dosages, lab values, and vital signs. Audio-to-transcript streaming latency is under 500ms."
            },
            {
                "heading": "Speaker diarisation with clinical role assignment",
                "text": "The diarisation system supports 2-4 speakers per session (clinician, patient, family member, interpreter), uses voice embeddings trained on clinical dialogue, assigns clinical roles from speech patterns and terminology usage, and handles overlapping speech. The paper states >95% diarisation accuracy on 2-speaker consultations."
            },
            {
                "heading": "Medical NER with coding and negation detection",
                "text": "A specialised NER model extracts diagnoses mapped to ICD-10, medications with dosage/route/frequency/duration, procedures mapped to CPT where applicable, anatomical references and laterality, lab values with units, temporal markers, and negations (\"no chest pain\", \"denies fever\"). Stated F1 score is >0.93 across core entity types."
            },
            {
                "heading": "Section classification that follows conversational flow",
                "text": "The section classifier goes beyond keyword matching: from a patient saying \"I've been having this pain in my chest for about two weeks, it gets worse when I lie down,\" it files the content under History of Present Illness and extracts chest pain with a two-week duration and \"worse when supine\" as a modifier, even though the patient never used clinical terms. Stated accuracy is >91% on standard SOAP sections."
            },
            {
                "heading": "Document assembly and quality safeguards",
                "text": "The final stage selects templates by specialty, note type, and clinician preference, orders sections per documentation standards, normalises colloquial language into clinical terminology while preserving meaning, flags potentially missing sections or information, and suggests ICD-10/CPT codes from the extracted entities."
            }
        ],
        "topics": [
            "ambient clinical documentation",
            "medical speech recognition (ASR)",
            "speaker diarisation",
            "medical NER",
            "clinical note assembly",
            "SOAP notes"
        ],
        "pdf": "/docs/whitepapers/ambient-audio-processing-2025.pdf",
        "date": "2025-08",
        "paperLang": "en",
        "icon": "graphic_eq"
    },
    {
        "slug": "quality-management-system",
        "title": "Quality Management System (QMS): How Clinix QM Works",
        "abstract": "In clinical AI, output quality is a patient safety issue, and this paper presents Clinix QM — the systematic framework intended to ensure every ClinixSummary output meets clinical documentation standards. It describes the processes, metrics, and governance structures that constitute Clinix QM, aimed at quality officers, clinical leaders, and compliance teams evaluating ClinixSummary for deployment. The paper concludes that quality management in clinical AI requires the same rigour applied to medical devices and pharmaceuticals, and that Clinix QM makes that commitment operational, measurable, and governed.",
        "findings": [
            {
                "heading": "A four-pillar QMS framework",
                "text": "Clinix QM operates across four pillars: Proactive Quality (error prevention through model design, training methodology, and output validation rules), Reactive Quality (error detection via clinician feedback, automated monitoring, and manual QA review), Continuous Improvement (the Kai-zen loop), and Governance (oversight structures, documentation, and accountability)."
            },
            {
                "heading": "Model validation gates before deployment",
                "text": "Every model update must pass automated regression testing against a curated suite of 10,000+ clinical scenarios, specialty-specific accuracy benchmarks that must meet or exceed the previous model version, clinical review by specialty advisors for changes affecting clinical reasoning or terminology, and A/B testing on a subset of production traffic before full rollout."
            },
            {
                "heading": "Output validation rules on every note",
                "text": "Generated notes pass through a rule engine that flags potential issues before the clinician sees the output — missing mandatory sections, medication dosages outside normal ranges, contradictory clinical findings, and incomplete procedure documentation — with flagged items highlighted for clinician review."
            },
            {
                "heading": "Three reactive quality channels",
                "text": "Every clinician edit, correction, or rating is captured, categorised (e.g. terminology error, section misclassification, missing information), and prioritised for remediation; a dedicated clinical QA team of licensed clinicians conducts manual reviews stratified by specialty, note type, and complexity; and production outputs are continuously monitored for statistical anomalies that trigger automated alerts."
            },
            {
                "heading": "The Kai-zen loop and tracked metrics",
                "text": "Findings from all three reactive channels are aggregated weekly into a prioritised improvement backlog addressed in the next model update cycle. Tracked metrics include Clinician Acceptance Rate (target: >95% by end of 2025), Clinical Accuracy Score per specialty, mean edits per note (trending toward zero), critical error rate for medication, allergy, and procedure errors (target: <0.1%), and time from error detection to model fix deployment."
            },
            {
                "heading": "Governance and controlled documentation",
                "text": "Clinix QM is governed by a Quality Steering Committee — the Chief Medical Officer, Head of AI, Head of Quality, and external clinical advisors — which meets monthly to review metrics, approve model releases, and set quality targets. All QMS processes live in a controlled document system with version tracking and approval workflows, available for review by customers and regulators upon request."
            }
        ],
        "topics": [
            "quality management",
            "QA review",
            "model validation",
            "continuous improvement",
            "clinical accuracy metrics",
            "AI governance"
        ],
        "pdf": "/docs/whitepapers/quality-management-system-qms-2025.pdf",
        "date": "2025-07",
        "paperLang": "en",
        "icon": "verified"
    },
    {
        "slug": "security-compliance-specification",
        "title": "Security & Compliance Technical Specification",
        "abstract": "A technical specification of ClinixSummary's security architecture, written for compliance officers, CISOs, and CTOs, covering encryption standards, access controls, audit logging, and HIPAA/GDPR technical implementation details. The paper presents security and compliance as foundational architectural principles rather than added features, and concludes by inviting security teams to review its detailed documentation and schedule review sessions with the compliance team.",
        "findings": [
            {
                "heading": "Encryption in transit and at rest",
                "text": "All data in transit uses TLS 1.2 or higher (TLS 1.3 preferred), with certificate pinning on mobile clients and mutual TLS between internal services. Persistent storage uses AES-256 encryption with KMS/HSM-backed key management and 90-day key rotation with zero-downtime re-encryption."
            },
            {
                "heading": "Audio purged after note generation",
                "text": "Audio recordings are encrypted immediately upon capture and permanently deleted via cryptographic erasure as soon as the clinical note has been generated. The paper states no audio data is ever retained beyond note generation."
            },
            {
                "heading": "Authentication, RBAC, and data isolation",
                "text": "Authentication options include email/password with mandatory MFA (TOTP or WebAuthn), SAML 2.0 SSO for enterprises, and OAuth 2.0 with scoped, short-lived tokens. Fine-grained RBAC offers four default roles (Clinician, Reviewer, Administrator, Billing Manager) plus custom roles, with logically isolated multi-tenant data partitions and optional physically isolated database instances for enterprise customers."
            },
            {
                "heading": "Tamper-evident audit logging",
                "text": "Every action — authentication, data access, administrative changes, API calls, and system events — is recorded in a tamper-evident audit trail stored in append-only, cryptographically signed storage. Logs are retained for a minimum of 7 years and are available to organisation administrators through the ClinixSummary Console."
            },
            {
                "heading": "Regulatory coverage across jurisdictions",
                "text": "The paper describes HIPAA measures (BAAs, the required Administrative, Physical, and Technical Safeguards, risk assessments, workforce training, breach notification) and GDPR measures (lawful basis documentation, DPIAs, data subject rights, DPAs, EU data residency options). It also cites PIPEDA/PHIPA, CCPA, and the Australian Privacy Act, and says UK medical device registration (MHRA) is being pursued."
            },
            {
                "heading": "Incident response and breach notification",
                "text": "A documented incident response plan covers detection, containment, eradication, recovery, and post-incident review, backed by 24/7 security monitoring with automated anomaly detection. Customers are notified within 72 hours of any confirmed data breach per GDPR, or without unreasonable delay per HIPAA."
            }
        ],
        "topics": [
            "Encryption",
            "HIPAA",
            "GDPR",
            "Access control",
            "Audit logging",
            "Incident response"
        ],
        "pdf": "/docs/whitepapers/security-compliance-specification-2025.pdf",
        "date": "2025-06",
        "paperLang": "en",
        "icon": "security"
    },
    {
        "slug": "ehr-integration-framework",
        "title": "Integration Framework: Connecting to EHR/EMR Systems",
        "abstract": "This white paper details how AI-generated clinical notes flow from ClinixSummary into existing EHR/EMR systems, covering technical specifications, supported standards, deployment options, and security considerations. It presents a three-tier integration architecture — from simple manual export to deep bidirectional data exchange — built on FHIR-compatible RESTful APIs. The paper concludes that this tiered approach lets integration complexity scale with organisational needs, from solo practitioners to health systems.",
        "findings": [
            {
                "heading": "Three integration tiers",
                "text": "Tier 1 is manual export (copy-paste or document download) with zero integration overhead; Tier 2 is a RESTful API with FHIR-compatible endpoints pushing notes as standard clinical document resources; Tier 3 is deep bidirectional exchange including patient context import (demographics, medication lists, problem lists) and note push-back, requiring EHR vendor cooperation or open API access."
            },
            {
                "heading": "FHIR R4 resources and terminology bindings",
                "text": "ClinixSummary generates and consumes FHIR R4 resources including DocumentReference, Composition, Encounter, Patient, Condition, MedicationStatement, and Procedure. Clinical entities are mapped to ICD-10-CM/PCS (diagnoses and procedures), SNOMED-CT (clinical findings), RxNorm (medications), and LOINC (laboratory observations), with mapping accuracy validated under the Clinix QM process."
            },
            {
                "heading": "RESTful API with OAuth 2.0",
                "text": "The API defines six endpoints covering the full documentation lifecycle: create a session, stream audio, retrieve the generated note, submit clinician edits, push the finalised note to a configured EHR endpoint, and list specialty-specific note templates. Full documentation with an interactive sandbox is stated to be at docs.clinixsummary.ai/api."
            },
            {
                "heading": "Three deployment models",
                "text": "Cloud (SaaS) is the default, with data processed in the customer's chosen region (US, EU, UK, or AU). Hybrid runs audio processing and ASR on-premises or in the customer's private cloud while NLP and document assembly stay in ClinixSummary's cloud, for strict data-residency needs. On-Premises deploys the full stack in the customer's data centre with signed model-update packages, available for Plan Enterprise customers."
            },
            {
                "heading": "Uniform security across all pathways",
                "text": "All integration tiers enforce TLS 1.2+ in transit, OAuth 2.0 with short-lived tokens and refresh rotation, and audit logging of all API calls with tamper-evident log storage. IP whitelisting and mutual TLS are available for Tier 2/3 integrations, and a BAA is executed for all US healthcare customers."
            }
        ],
        "topics": [
            "EHR/EMR integration",
            "FHIR R4",
            "REST API",
            "Healthcare interoperability",
            "Deployment models",
            "Clinical terminologies"
        ],
        "pdf": "/docs/whitepapers/integration-framework-ehr-emr-2025.pdf",
        "date": "2025-05",
        "paperLang": "en",
        "icon": "integration_instructions"
    },
    {
        "slug": "clinical-model-training",
        "title": "Clinical Model Training Methodology",
        "abstract": "This white paper details ClinixSummary's multi-phase model training methodology, which combines large-scale de-identified clinical data with specialty-specific fine-tuning and continuous clinician-validated improvement. It covers data sourcing and ethics, the training pipeline, evaluation metrics, and the continuous improvement cycle that keeps outputs aligned with clinical standards across 40+ medical specialties, reporting a Clinician Acceptance Rate of over 92% across core specialties.",
        "findings": [
            {
                "heading": "De-identified data sourcing",
                "text": "All training data undergoes de-identification per HIPAA Safe Harbor and Expert Determination methods, combining automated NLP-based PHI detection with human review; the paper states no raw patient data is ever used in training. Corpora come from licensed de-identified clinical datasets, public medical literature and guidelines, clinician-validated synthetic data, and opt-in, fully de-identified aggregate patterns from consenting users."
            },
            {
                "heading": "Ethics board and data provenance",
                "text": "All data sourcing and training protocols are reviewed by an internal ethics board of practicing clinicians, data privacy specialists, and independent advisors. A data provenance registry tracks the origin and processing history of all training data."
            },
            {
                "heading": "Multi-stage training pipeline",
                "text": "Base language models are pre-trained on large medical text corpora (clinical notes, textbooks, journals, guidelines) before speech-specific training; ASR models are then fine-tuned on clinical recordings with verified transcriptions spanning diverse accents and environments. Each supported discipline receives specialty-specific adaptation: vocabulary augmentation, documentation pattern training, clinical reasoning calibration, and output format alignment."
            },
            {
                "heading": "Five evaluation metrics, >92% acceptance",
                "text": "Performance is measured on Word Error Rate, a proprietary Clinical Accuracy Score, a Section Completeness Index, Clinician Acceptance Rate, and Specialty Terminology Precision. The paper reports a Clinician Acceptance Rate of >92% across core specialties."
            },
            {
                "heading": "Kai-zen continuous improvement loop",
                "text": "The system operates on a weekly model update cycle in which clinician corrections, edits, and ratings are aggregated and de-identified to refine outputs. The process includes automated detection of systematic errors, prioritised retraining, A/B testing against baseline before deployment, and quarterly reviews by per-specialty clinician advisory panels."
            },
            {
                "heading": "Model governance and rollback",
                "text": "Every model version is tracked in a registry with full lineage — training data composition, hyperparameters, evaluation metrics, and deployment dates. Rollback capability allows any model update to be reverted within minutes if quality regressions are detected."
            }
        ],
        "topics": [
            "Model training",
            "Data de-identification",
            "Specialty fine-tuning",
            "Evaluation metrics",
            "Continuous improvement",
            "Model governance"
        ],
        "pdf": "/docs/whitepapers/clinical-model-training-methodology-2025.pdf",
        "date": "2025-04",
        "paperLang": "en",
        "icon": "model_training"
    },
    {
        "slug": "architecture-overview",
        "title": "ClinixSummary Architecture: A Technical Overview",
        "abstract": "A technical overview of the ClinixSummary platform for CTOs, IT leaders, and technical evaluators, covering the end-to-end data flow from clinical audio capture through speech recognition and clinical NLP to final document generation. The paper describes a vertically integrated, multi-stage pipeline purpose-built for clinical documentation, and concludes that this vertical integration — treating documentation as a clinical problem rather than a transcription problem — enables accuracy, speed, and specialty awareness that generic AI services layered with medical prompts cannot achieve.",
        "findings": [
            {
                "heading": "Five-subsystem microservice architecture",
                "text": "The platform comprises five independently scalable microservices communicating over encrypted internal channels: an Audio Ingestion Layer, a Speech Recognition Engine, a Clinical NLP Pipeline, a Document Assembly Engine, and an Integration & Delivery Layer with FHIR-compatible APIs and direct EHR/EMR export."
            },
            {
                "heading": "Three auto-detected capture modes",
                "text": "The Auto Ambient Dictate system automatically detects three capture modes: Ambient (multi-speaker consultation with speaker diarisation), Dictation (single-speaker post-visit narration), and Operative (real-time surgical narration). Signal preprocessing — noise reduction, gain control, and voice activity detection — runs on-device where possible, with server-side fallback."
            },
            {
                "heading": "Proprietary medical speech recognition",
                "text": "The paper describes the ASR as a proprietary encoder-decoder architecture trained from the ground up on de-identified clinical speech, with 250,000+ medical terms across ICD-10, CPT, SNOMED-CT and specialty lexicons, <500ms streaming latency, corpora spanning 40+ specialties, and six languages (English, French, Spanish, Portuguese, Italian, Arabic) with in-consultation code-switching."
            },
            {
                "heading": "Multi-stage clinical NLP pipeline",
                "text": "Four NLP stages follow transcription: speaker diarisation supporting up to 4 concurrent speakers, medical named entity recognition (diagnoses, medications, dosages, procedures, lab values, temporal markers), specialty-configurable section classification, and a contextual reasoning layer that infers unstated clinical logic such as references to prior visits or established regimens."
            },
            {
                "heading": "Specialty-aware document assembly",
                "text": "The Document Assembly Engine generates specialty-appropriate outputs — SOAP notes, procedure notes, therapy summaries, dental charting narratives, psychiatric evaluations, veterinary SOAP, and free-form transcripts — with completeness checks that flag potential omissions before the clinician finalises the note. Templates are refined through what the paper calls the Kai-zen feedback loop."
            },
            {
                "heading": "Cloud-native infrastructure guarantees",
                "text": "The platform states auto-scaling inference clusters, geographic data residency options (US, EU, UK, AU) to meet jurisdictional compliance requirements, a 99.9% uptime SLA with multi-region failover, TLS 1.3 for all inter-service communication, and AES-256 encryption at rest."
            }
        ],
        "topics": [
            "system architecture",
            "medical speech recognition",
            "clinical NLP",
            "ambient clinical documentation",
            "document assembly",
            "cloud infrastructure"
        ],
        "pdf": "/docs/whitepapers/clinixsummary-architecture-overview-2025.pdf",
        "date": "2025-03",
        "paperLang": "en",
        "icon": "architecture"
    }
];

const WP_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

function WhitepaperArticlePage(slug) {
    const a = WP_ARTICLES.find((x) => x.slug === slug);
    if (!a) { return '<h2>404 Page Not Found</h2>'; }
    const parts = a.date.split('-');
    const dateStr = WP_MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
    const langNote = a.paperLang === 'en' ? '' : `
                <p style="color: var(--accent); font-size: 13px; font-weight: 600; margin-top: 8px;">The full paper is written in ${a.paperLang === 'ar' ? 'Arabic' : 'French'} — this page summarises it in English.</p>`;
    const topics = (a.topics || []).map((t) =>
        `<span style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 999px; padding: 4px 12px; font-size: 12px;">${t}</span>`
    ).join(' ');
    const findings = (a.findings || []).map((f) => `
                    <div class="text-group" style="border-bottom: none;">
                        <h3>${f.heading}</h3>
                        <p class="section-copy">${f.text}</p>
                    </div>`).join('');

    return `
        <section class="subpage-container">
            <div class="page-width">
                <div data-wp-title="${a.title.replace(/"/g, '&quot;')}" data-wp-date="${a.date}" data-wp-pdf="${a.pdf}" data-wp-inlang="${a.paperLang}" hidden></div>
                <p style="margin-bottom: 16px;"><a href="/whitepapers" style="font-weight: 600;">&larr; All whitepapers</a></p>
                <div class="subpage-header" style="margin-bottom: 32px;">
                    <span class="kicker">Whitepaper</span>
                    <h1 class="subpage-title">${a.title}</h1>
                    <p style="color: var(--text-secondary); font-size: 14px;">${WP_AUTHORS_LINE} &middot; Published ${dateStr}</p>
                    ${langNote}
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px;">${topics}</div>

                <h2 class="section-title">Abstract</h2>
                <p class="section-copy" style="max-width: 820px; margin-bottom: 48px;">${a.abstract}</p>

                <h2 class="section-title">What the paper covers</h2>
                <div class="grid-2" style="margin-bottom: 48px;">${findings}</div>

                <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 40px;">Figures and statements reflect the paper as published in ${dateStr}.</p>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px;">
                    <h2 style="font-family: var(--font-serif); font-size: 28px; margin-bottom: 20px;">Read the full paper</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="${a.pdf}" target="_blank" rel="noopener" class="btn-primary" style="background: var(--accent); color: var(--text-primary);">Download the PDF</a>
                        <a href="/ai-medical-scribe" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Explore the AI medical scribe</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}
