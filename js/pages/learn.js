// --- Learn Pages: Publications, Whitepapers, News, Podcasts ---

function PublicationsPage() {
    const publications = [
        {
            title: 'Setting the Gold Standard: Why Standardised Clinical Documentation Is the Future',
            desc: 'As healthcare globalises, documentation must be standardised. Just as aviation and nuclear industries adopted standardised documentation to reduce errors and save lives, medicine must follow.',
            icon: 'auto_stories',
            date: 'January 2025',
            pdf: 'docs/publications/standardised-clinical-documentation-2025.pdf'
        },
        {
            title: 'The Burnout Crisis: How AI Scribes Restore Clinical Joy',
            desc: 'Evidence on clinician burnout driven by documentation burden. How ambient AI documentation reduces cognitive load and gives clinicians back 2+ hours per day.',
            icon: 'sentiment_satisfied',
            date: 'February 2025',
            pdf: 'docs/publications/burnout-crisis-ai-scribes-2025.pdf'
        },
        {
            title: 'Contextual Reasoning in Clinical AI: Beyond Transcription',
            desc: 'Deep dive into how ClinixSummary\u2019s models infer clinical meaning from natural conversation \u2014 not just transcribe words, but understand clinical intent.',
            icon: 'psychology',
            date: 'March 2025',
            pdf: 'docs/publications/contextual-reasoning-clinical-ai-2025.pdf'
        },
        {
            title: 'Multilingual Clinical Documentation: Bridging Language Barriers in Global Healthcare',
            desc: 'How ClinixSummary handles multilingual consultations, code-switching, and documentation across 6 languages. Real-world use cases from Dubai to Montreal.',
            icon: 'translate',
            date: 'April 2025',
            pdf: 'docs/publications/multilingual-clinical-documentation-2025.pdf'
        },
        {
            title: 'Privacy by Design: Building Clinical AI Without Compromising Patient Data',
            desc: 'Our approach to training on de-identified data, HIPAA/GDPR compliance, and why proprietary models are inherently more secure than generic LLM wrappers.',
            icon: 'shield',
            date: 'May 2025',
            pdf: 'docs/publications/privacy-by-design-clinical-ai-2025.pdf'
        },
        {
            title: 'Allied Health Documentation: Why One Model Doesn\u2019t Fit All',
            desc: 'How physiotherapy, occupational therapy, and speech & language therapy each require fundamentally different documentation models \u2014 and why ClinixSummary built dedicated modules.',
            icon: 'accessibility_new',
            date: 'June 2025',
            pdf: 'docs/publications/allied-health-documentation-2025.pdf'
        },
        {
            title: 'The Economics of AI Scribes: ROI Analysis for Healthcare Organizations',
            desc: 'Hard numbers on cost savings, productivity gains, reimbursement improvements, and reduced coding errors when deploying AI documentation at scale.',
            icon: 'payments',
            date: 'July 2025',
            pdf: 'docs/publications/economics-of-ai-scribes-roi-2025.pdf'
        },
        {
            title: 'From Ambient to Operative: Auto-Detection of Clinical Documentation Modes',
            desc: 'Technical overview of how ClinixSummary automatically detects whether audio is ambient consultation, post-visit dictation, or operative narration \u2014 and adapts accordingly.',
            icon: 'graphic_eq',
            date: 'August 2025',
            pdf: 'docs/publications/auto-detection-documentation-modes-2025.pdf'
        },
        {
            title: 'Kai-zen in Healthcare AI: The Case for Continuous Model Improvement',
            desc: 'Why static AI models fail in medicine, and how ClinixSummary\u2019s weekly update cycle and clinician feedback loop produce consistently improving outputs.',
            icon: 'change_circle',
            date: 'September 2025',
            pdf: 'docs/publications/kaizen-continuous-model-improvement-2025.pdf'
        },
        {
            title: 'ICD-10 and CPT Coding Accuracy: How AI Reduces Claim Denials',
            desc: 'Data on coding errors in manual documentation vs. AI-assisted documentation. How contextual understanding improves coding accuracy and reimbursement.',
            icon: 'medical_information',
            date: 'October 2025',
            pdf: 'docs/publications/icd10-cpt-coding-accuracy-2025.pdf'
        },
        {
            title: 'The Future of Medical Education: Integrating CME/CPD into the Documentation Workflow',
            desc: 'How the CME/CPD Vault turns routine clinical documentation into learning opportunities, and the potential to earn continuing education credits through practice.',
            icon: 'school',
            date: 'November 2025',
            pdf: 'docs/publications/cme-cpd-documentation-workflow-2025.pdf'
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
            title: 'ClinixSummary Architecture: A Technical Overview',
            desc: 'System architecture, model pipeline, audio processing, NLP layers, and output generation. A comprehensive look at how ClinixSummary transforms clinical audio into structured documentation.',
            icon: 'architecture',
            date: 'March 2025',
            pdf: 'docs/whitepapers/clinixsummary-architecture-overview-2025.pdf'
        },
        {
            title: 'Clinical Model Training Methodology',
            desc: 'Data sourcing from de-identified sources, training pipeline, specialty-specific fine-tuning, evaluation metrics, and quality assurance processes.',
            icon: 'model_training',
            date: 'April 2025',
            pdf: 'docs/whitepapers/clinical-model-training-methodology-2025.pdf'
        },
        {
            title: 'Integration Framework: Connecting to EHR/EMR Systems',
            desc: 'API specifications, data formats, FHIR compatibility, and deployment models (cloud/hybrid) for seamless EHR integration.',
            icon: 'integration_instructions',
            date: 'May 2025',
            pdf: 'docs/whitepapers/integration-framework-ehr-emr-2025.pdf'
        },
        {
            title: 'Security & Compliance Technical Specification',
            desc: 'Encryption standards, access controls, audit logging, and HIPAA/GDPR technical implementation details for compliance officers and CTOs.',
            icon: 'security',
            date: 'June 2025',
            pdf: 'docs/whitepapers/security-compliance-specification-2025.pdf'
        },
        {
            title: 'Quality Management System (QMS): How Clinix QM Works',
            desc: 'The QA review process, feedback incorporation, model versioning, output monitoring, and continuous improvement protocols.',
            icon: 'verified',
            date: 'July 2025',
            pdf: 'docs/whitepapers/quality-management-system-qms-2025.pdf'
        },
        {
            title: 'Ambient Audio Processing: From Sound to Structured Note',
            desc: 'How raw audio becomes a structured clinical document \u2014 speaker diarisation, medical NER, section classification, and note assembly.',
            icon: 'graphic_eq',
            date: 'August 2025',
            pdf: 'docs/whitepapers/ambient-audio-processing-2025.pdf'
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
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Q1 2026</span>
                        <h3>Language Expansion: Arabic with Full RTL Support</h3>
                        <p>ClinixSummary now supports Arabic with complete right-to-left interface and documentation support, joining English, French, Spanish, Portuguese, and Italian. This milestone extends our reach to clinicians across the Middle East and North Africa.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Q4 2025</span>
                        <h3>Clinix Foundation Initiative Launched</h3>
                        <p>We\u2019re proud to announce the Clinix Foundation \u2014 our programme providing free ClinixSummary access to clinics and practices in relief areas and underserved communities. Applications are now open for humanitarian relief clinics, rural health centres, and NGO-operated medical facilities.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Q4 2025</span>
                        <h3>CME/CPD Vault Launch</h3>
                        <p>The CME/CPD Vault is now live, integrating continuing medical education directly into the documentation workflow. Clinicians can now track learning hours and earn credits from their documented clinical encounters.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Q3 2025</span>
                        <h3>UK Medical Device Registration Application</h3>
                        <p>ClinixSummary has formally applied for medical device registration in the United Kingdom, demonstrating our commitment to regulatory compliance and clinical safety standards. This marks an important step in our journey toward full regulatory recognition.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Q3 2025</span>
                        <h3>Allied Health Modules Released</h3>
                        <p>New dedicated modules for Physiotherapy, Occupational Therapy, and Speech & Language Therapy are now available. Each module features discipline-specific documentation patterns, terminology, and assessment frameworks.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Q2 2025</span>
                        <h3>Module Updates: Expanded Specialty Coverage</h3>
                        <p>Ongoing updates to our specialty modules have expanded coverage to 40+ medical specialties with improved accuracy, expanded terminology recognition, and enhanced language support across all modules.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Q1 2025</span>
                        <h3>ClinixSummary Platform Launch</h3>
                        <p>ClinixSummary officially launches as a comprehensive AI medical scribe platform, offering ambient and dictation-based clinical documentation across multiple medical specialties with HIPAA and GDPR compliance from day one.</p>
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

function PodcastsPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Podcasts</span>
                    <h2 class="subpage-title">ClinixSummary Podcasts</h2>
                    <p class="subpage-copy">Conversations with clinicians, health tech leaders, and the team building the future of clinical documentation.</p>
                </div>

                <div style="text-align: center; padding: 60px 40px; background: var(--bg-subtle); border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 60px;">
                    <span class="material-symbols-rounded" style="font-size: 64px; color: var(--accent); margin-bottom: 20px; display: block;">podcasts</span>
                    <h3 style="font-family: var(--font-serif); font-size: 28px; margin-bottom: 16px;">Coming Soon</h3>
                    <p style="font-size: 17px; color: var(--text-secondary); max-width: 600px; margin: 0 auto 30px;">We\u2019re preparing our first season of podcasts. Subscribe to be notified when episodes launch.</p>
                    <button class="btn-primary" onclick="showToast('Subscribed! We\\'ll notify you when episodes launch.'); return false;">Subscribe / Get Notified</button>
                </div>

                <div class="subpage-header">
                    <span class="kicker">Preview</span>
                    <h3 class="section-title">What\u2019s coming</h3>
                </div>

                <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                    <div class="card" style="opacity: 0.7;">
                        <div class="card-icon material-symbols-rounded">mic</div>
                        <h3>Episode 1: Why We Built ClinixSummary</h3>
                        <p>The founding story \u2014 practicing physicians frustrated with documentation burden, building an AI scribe from nights and weekends to a platform serving clinicians worldwide.</p>
                        <span class="beta-tag" style="margin-top: 12px;">Coming Soon</span>
                    </div>
                    <div class="card" style="opacity: 0.7;">
                        <div class="card-icon material-symbols-rounded">sentiment_dissatisfied</div>
                        <h3>Episode 2: The Clinician Burnout Crisis \u2014 And What AI Can Do About It</h3>
                        <p>Evidence on documentation-driven burnout, how ambient AI changes the equation, and perspectives from clinicians who\u2019ve made the switch.</p>
                        <span class="beta-tag" style="margin-top: 12px;">Coming Soon</span>
                    </div>
                    <div class="card" style="opacity: 0.7;">
                        <div class="card-icon material-symbols-rounded">translate</div>
                        <h3>Episode 3: Going Global \u2014 Multilingual Medicine and Documentation</h3>
                        <p>How real-world clinical consultations cross language boundaries, and how ClinixSummary handles multilingual documentation naturally.</p>
                        <span class="beta-tag" style="margin-top: 12px;">Coming Soon</span>
                    </div>
                </div>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Stay in the loop</h2>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">Be the first to know when new episodes drop.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <button class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="showToast('Subscribed! We\\'ll notify you when episodes launch.'); return false;">Subscribe / Get Notified</button>
                    </div>
                </div>
            </div>
        </section>
    `;
}
