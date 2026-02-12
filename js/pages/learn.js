// --- Learn Pages: Publications, Whitepapers, News, Podcasts ---

function PublicationsPage() {
    const publications = [
        {
            title: 'Setting the Gold Standard: Why Standardised Clinical Documentation Is the Future',
            desc: 'As healthcare globalises, documentation must be standardised. Just as aviation and nuclear industries adopted standardised documentation to reduce errors and save lives, medicine must follow.',
            icon: 'auto_stories',
            date: 'January 2026',
            pdf: 'docs/publications/standardised-clinical-documentation-2025.pdf'
        },
        {
            title: 'Automated Charge Capture: How AI Documentation Closes the Revenue Gap',
            desc: 'How ClinixSummary identifies billable procedures, supplies, and interventions from clinical encounters \u2014 reducing charge leakage and improving revenue integrity. Pilot data shows 30% improvement in charge capture.',
            icon: 'request_quote',
            date: 'December 2025',
            pdf: 'docs/publications/automated-charge-capture-2025.pdf'
        },
        {
            title: 'The Future of Medical Education: Integrating CME/CPD into the Documentation Workflow',
            desc: 'How the CME/CPD Vault turns routine clinical documentation into learning opportunities, and the potential to earn continuing education credits through practice.',
            icon: 'school',
            date: 'November 2025',
            pdf: 'docs/publications/cme-cpd-documentation-workflow-2025.pdf'
        },
        {
            title: 'ICD-10 and CPT Coding Accuracy: How AI Reduces Claim Denials',
            desc: 'Data on coding errors in manual documentation vs. AI-assisted documentation. How contextual understanding improves coding accuracy and reimbursement.',
            icon: 'medical_information',
            date: 'October 2025',
            pdf: 'docs/publications/icd10-cpt-coding-accuracy-2025.pdf'
        },
        {
            title: 'Kai-zen (\u6539\u5584) in Healthcare AI: The Case for Continuous Model Improvement',
            desc: 'Why static AI models fail in medicine, and how ClinixSummary\u2019s weekly update cycle and clinician feedback loop produce consistently improving outputs.',
            icon: 'change_circle',
            date: 'September 2025',
            pdf: 'docs/publications/kaizen-continuous-model-improvement-2025.pdf'
        },
        {
            title: 'From Ambient to Operative: Auto-Detection of Clinical Documentation Modes',
            desc: 'Technical overview of how ClinixSummary automatically detects whether audio is ambient consultation, post-visit dictation, or operative narration \u2014 and adapts accordingly.',
            icon: 'graphic_eq',
            date: 'August 2025',
            pdf: 'docs/publications/auto-detection-documentation-modes-2025.pdf'
        },
        {
            title: 'The Economics of AI Scribes: ROI Analysis for Healthcare Organizations',
            desc: 'Hard numbers on cost savings, productivity gains, reimbursement improvements, and reduced coding errors when deploying AI documentation at scale.',
            icon: 'payments',
            date: 'July 2025',
            pdf: 'docs/publications/economics-of-ai-scribes-roi-2025.pdf'
        },
        {
            title: 'Allied Health Documentation: Why One Model Doesn\u2019t Fit All',
            desc: 'How physiotherapy, occupational therapy, and speech & language therapy each require fundamentally different documentation models \u2014 and why ClinixSummary built dedicated modules.',
            icon: 'accessibility_new',
            date: 'June 2025',
            pdf: 'docs/publications/allied-health-documentation-2025.pdf'
        },
        {
            title: 'Privacy by Design: Building Clinical AI Without Compromising Patient Data',
            desc: 'Our approach to training on de-identified data, HIPAA/GDPR compliance, and why proprietary models are inherently more secure than generic LLM wrappers.',
            icon: 'shield',
            date: 'May 2025',
            pdf: 'docs/publications/privacy-by-design-clinical-ai-2025.pdf'
        },
        {
            title: 'Multilingual Clinical Documentation: Bridging Language Barriers in Global Healthcare',
            desc: 'How ClinixSummary handles multilingual consultations, code-switching, and documentation across 6 languages. Real-world use cases from Dubai to Montreal.',
            icon: 'translate',
            date: 'April 2025',
            pdf: 'docs/publications/multilingual-clinical-documentation-2025.pdf'
        },
        {
            title: 'Contextual Reasoning in Clinical AI: Beyond Transcription',
            desc: 'Deep dive into how ClinixSummary\u2019s models infer clinical meaning from natural conversation \u2014 not just transcribe words, but understand clinical intent.',
            icon: 'psychology',
            date: 'March 2025',
            pdf: 'docs/publications/contextual-reasoning-clinical-ai-2025.pdf'
        },
        {
            title: 'The Burnout Crisis: How AI Scribes Restore Clinical Joy',
            desc: 'Evidence on clinician burnout driven by documentation burden. How ambient AI documentation reduces cognitive load and gives clinicians back 2+ hours per day.',
            icon: 'sentiment_satisfied',
            date: 'February 2025',
            pdf: 'docs/publications/burnout-crisis-ai-scribes-2025.pdf'
        }
    ];

    const pubCards = publications.map(p => `
        <div class="card" style="display: flex; flex-direction: column;">
            <div class="card-icon material-symbols-rounded">${p.icon}</div>
            <h3>${p.title}</h3>
            <p style="color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">${p.date}</p>
            <p style="flex-grow: 1;">${p.desc}</p>
            <a href="${p.pdf}" target="_blank" class="btn-outline" style="margin-top: 16px; width: 100%; text-align: center; text-decoration: none; display: block;">View PDF</a>
        </div>
    `).join('');

    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Publications</span>
                    <h2 class="subpage-title">Research, evidence, and thought leadership.</h2>
                    <p class="subpage-copy">ClinixSummary\u2019s design is grounded in evidence and clinical expertise. Explore our publications covering everything from the science of contextual reasoning to the economics of AI documentation at scale.</p>
                </div>

                <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                    ${pubCards}
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;">Want to dig deeper into the research?</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">We\u2019re happy to share full papers, aggregate metrics and connect you with researchers studying ambient AI scribes.</p>
                    <div class="nav-actions" style="justify-content: flex-start; margin-inline-start: 0;">
                        <a href="#" class="btn-primary" onclick="showToast('Publications requested.'); return false;">Request Publications</a>
                        <a href="#contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function WhitepapersPage() {
    const whitepapers = [
        {
            title: 'Ambient Audio Processing: From Sound to Structured Note',
            desc: 'How raw audio becomes a structured clinical document \u2014 speaker diarisation, medical NER, section classification, and note assembly.',
            icon: 'graphic_eq',
            date: 'August 2025',
            pdf: 'docs/whitepapers/ambient-audio-processing-2025.pdf'
        },
        {
            title: 'Quality Management System (QMS): How Clinix QM Works',
            desc: 'The QA review process, feedback incorporation, model versioning, output monitoring, and continuous improvement protocols.',
            icon: 'verified',
            date: 'July 2025',
            pdf: 'docs/whitepapers/quality-management-system-qms-2025.pdf'
        },
        {
            title: 'Security & Compliance Technical Specification',
            desc: 'Encryption standards, access controls, audit logging, and HIPAA/GDPR technical implementation details for compliance officers and CTOs.',
            icon: 'security',
            date: 'June 2025',
            pdf: 'docs/whitepapers/security-compliance-specification-2025.pdf'
        },
        {
            title: 'Integration Framework: Connecting to EHR/EMR Systems',
            desc: 'API specifications, data formats, FHIR compatibility, and deployment models (cloud/hybrid) for seamless EHR integration.',
            icon: 'integration_instructions',
            date: 'May 2025',
            pdf: 'docs/whitepapers/integration-framework-ehr-emr-2025.pdf'
        },
        {
            title: 'Clinical Model Training Methodology',
            desc: 'Data sourcing from de-identified sources, training pipeline, specialty-specific fine-tuning, evaluation metrics, and quality assurance processes.',
            icon: 'model_training',
            date: 'April 2025',
            pdf: 'docs/whitepapers/clinical-model-training-methodology-2025.pdf'
        },
        {
            title: 'ClinixSummary Architecture: A Technical Overview',
            desc: 'System architecture, model pipeline, audio processing, NLP layers, and output generation. A comprehensive look at how ClinixSummary transforms clinical audio into structured documentation.',
            icon: 'architecture',
            date: 'March 2025',
            pdf: 'docs/whitepapers/clinixsummary-architecture-overview-2025.pdf'
        }
    ];

    const wpCards = whitepapers.map(w => `
        <div class="card" style="display: flex; flex-direction: column;">
            <div class="card-icon material-symbols-rounded">${w.icon}</div>
            <h3>${w.title}</h3>
            <p style="color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">${w.date}</p>
            <p style="flex-grow: 1;">${w.desc}</p>
            <a href="${w.pdf}" target="_blank" class="btn-outline" style="margin-top: 16px; width: 100%; text-align: center; text-decoration: none; display: block;">View PDF</a>
        </div>
    `).join('');

    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">White Papers</span>
                    <h2 class="subpage-title">Technical methodology and deep dives.</h2>
                    <p class="subpage-copy">Our white papers provide detailed technical documentation for CTOs, IT leaders, and compliance officers. Explore the architecture, methodology, and security framework behind ClinixSummary.</p>
                </div>

                <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                    ${wpCards}
                </div>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Need a technical deep dive for your team?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#contact" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="showToast('Requesting white papers.'); return false;">Request White Papers</a>
                        <a href="#security" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">View Security & Compliance</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function NewsPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="news.kicker">News & Events</span>
                    <h2 class="subpage-title" data-i18n="news.title">Latest news & product updates.</h2>
                    <p class="subpage-copy" data-i18n="news.description">Follow our journey as we expand into new specialties, roll out advanced modules and share major company milestones.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q1_2026_kicker">Q1 2026</span>
                        <h3 data-i18n="news.q1_2026_title">Language Expansion: Arabic with Full RTL Support</h3>
                        <p data-i18n="news.q1_2026_desc">ClinixSummary now supports Arabic with complete right-to-left interface and documentation support, joining English, French, Spanish, Portuguese, and Italian. This milestone extends our reach to clinicians across the Middle East and North Africa.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q4_2025_kicker">Q4 2025</span>
                        <h3 data-i18n="news.q4_2025a_title">Clinix Foundation Initiative Launched</h3>
                        <p data-i18n="news.q4_2025a_desc">We\u2019re proud to announce the Clinix Foundation \u2014 our programme providing free ClinixSummary access to clinics and practices in relief areas and underserved communities. Applications are now open for humanitarian relief clinics, rural health centres, and NGO-operated medical facilities.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q4_2025_kicker">Q4 2025</span>
                        <h3 data-i18n="news.q4_2025b_title">CME/CPD Vault Launch</h3>
                        <p data-i18n="news.q4_2025b_desc">The CME/CPD Vault is now live, integrating continuing medical education directly into the documentation workflow. Clinicians can now track learning hours and earn credits from their documented clinical encounters.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q3_2025_kicker">Q3 2025</span>
                        <h3 data-i18n="news.q3_2025a_title">UK Medical Device Registration Application</h3>
                        <p data-i18n="news.q3_2025a_desc">ClinixSummary has formally applied for medical device registration in the United Kingdom, demonstrating our commitment to regulatory compliance and clinical safety standards. This marks an important step in our journey toward full regulatory recognition.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q3_2025_kicker">Q3 2025</span>
                        <h3 data-i18n="news.q3_2025b_title">Allied Health Modules Released</h3>
                        <p data-i18n="news.q3_2025b_desc">New dedicated modules for Physiotherapy, Occupational Therapy, and Speech & Language Therapy are now available. Each module features discipline-specific documentation patterns, terminology, and assessment frameworks.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q2_2025_kicker">Q2 2025</span>
                        <h3 data-i18n="news.q2_2025_title">Module Updates: Expanded Specialty Coverage</h3>
                        <p data-i18n="news.q2_2025_desc">Ongoing updates to our specialty modules have expanded coverage to 40+ medical specialties with improved accuracy, expanded terminology recognition, and enhanced language support across all modules.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;" data-i18n="news.q1_2025_kicker">Q1 2025</span>
                        <h3 data-i18n="news.q1_2025_title">ClinixSummary Platform Launch</h3>
                        <p data-i18n="news.q1_2025_desc">ClinixSummary officially launches as a comprehensive AI medical scribe platform, offering ambient and dictation-based clinical documentation across multiple medical specialties with HIPAA and GDPR compliance from day one.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;" data-i18n="news.story_title">Want to share your story?</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="news.story_desc">If you\u2019ve used ClinixSummary to transform your practice, we\u2019d love to highlight your success. Get in touch with our marketing team to be featured.</p>
                    <div class="nav-actions" style="justify-content: flex-start; margin-inline-start: 0;">
                        <a href="#" class="btn-primary" onclick="showToast('Story submission form activated.'); return false;" data-i18n="news.story_submit">Submit a story</a>
                        <a href="#contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

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
                    <h2 class="subpage-title">Real results from real practices.</h2>
                    <p class="subpage-copy">See how clinicians and organisations across specialties and settings are using ClinixSummary to transform documentation workflows, improve billing accuracy and enhance patient care.</p>
                </div>

                ${studyCards}

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Ready to write your own success story?</h2>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">Join practices worldwide that have transformed their documentation workflow with ClinixSummary.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="showToast('Starting free trial...'); return false;">Start Free Trial</a>
                        <a href="#contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function PodcastsPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="podcasts.kicker">Podcasts</span>
                    <h2 class="subpage-title" data-i18n="podcasts.title">ClinixSummary Podcasts</h2>
                    <p class="subpage-copy" data-i18n="podcasts.desc">Conversations with clinicians, health tech leaders, and the team building the future of clinical documentation.</p>
                </div>

                <div style="text-align: center; padding: 60px 40px; background: var(--bg-subtle); border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 60px;">
                    <span class="material-symbols-rounded" style="font-size: 64px; color: var(--accent); margin-bottom: 20px; display: block;">podcasts</span>
                    <h3 style="font-family: var(--font-serif); font-size: 28px; margin-bottom: 16px;" data-i18n="podcasts.coming_soon">Coming Soon</h3>
                    <p style="font-size: 17px; color: var(--text-secondary); max-width: 600px; margin: 0 auto 30px;" data-i18n="podcasts.coming_soon_desc">We\u2019re preparing our first season of podcasts. Subscribe to be notified when episodes launch.</p>
                    <button class="btn-primary" onclick="showToast('Subscribed! We\\'ll notify you when episodes launch.'); return false;" data-i18n="podcasts.subscribe_btn">Subscribe / Get Notified</button>
                </div>

                <div class="subpage-header">
                    <span class="kicker" data-i18n="podcasts.preview_kicker">Preview</span>
                    <h3 class="section-title" data-i18n="podcasts.preview_title">What\u2019s coming</h3>
                </div>

                <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                    <div class="card" style="opacity: 0.7;">
                        <div class="card-icon material-symbols-rounded">mic</div>
                        <h3 data-i18n="podcasts.ep1_title">Episode 1: Why We Built ClinixSummary</h3>
                        <p data-i18n="podcasts.ep1_desc">The founding story \u2014 practicing physicians frustrated with documentation burden, building an AI scribe from nights and weekends to a platform serving clinicians worldwide.</p>
                        <span class="beta-tag" style="margin-top: 12px;" data-i18n="podcasts.coming_soon_badge">Coming Soon</span>
                    </div>
                    <div class="card" style="opacity: 0.7;">
                        <div class="card-icon material-symbols-rounded">sentiment_dissatisfied</div>
                        <h3 data-i18n="podcasts.ep2_title">Episode 2: The Clinician Burnout Crisis \u2014 And What AI Can Do About It</h3>
                        <p data-i18n="podcasts.ep2_desc">Evidence on documentation-driven burnout, how ambient AI changes the equation, and perspectives from clinicians who\u2019ve made the switch.</p>
                        <span class="beta-tag" style="margin-top: 12px;" data-i18n="podcasts.coming_soon_badge">Coming Soon</span>
                    </div>
                    <div class="card" style="opacity: 0.7;">
                        <div class="card-icon material-symbols-rounded">translate</div>
                        <h3 data-i18n="podcasts.ep3_title">Episode 3: Going Global \u2014 Multilingual Medicine and Documentation</h3>
                        <p data-i18n="podcasts.ep3_desc">How real-world clinical consultations cross language boundaries, and how ClinixSummary handles multilingual documentation naturally.</p>
                        <span class="beta-tag" style="margin-top: 12px;" data-i18n="podcasts.coming_soon_badge">Coming Soon</span>
                    </div>
                </div>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;" data-i18n="podcasts.cta_title">Stay in the loop</h2>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;" data-i18n="podcasts.cta_desc">Be the first to know when new episodes drop.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <button class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="showToast('Subscribed! We\\'ll notify you when episodes launch.'); return false;" data-i18n="podcasts.subscribe_btn">Subscribe / Get Notified</button>
                    </div>
                </div>
            </div>
        </section>
    `;
}
