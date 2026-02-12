// --- Other Pages: Security, Careers & Story ---

function SecurityPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Security, Compliance & QMS</span>
                    <h2 class="subpage-title">Protecting patient privacy by default.</h2>
                    <p class="subpage-copy">Safeguarding patient data is non\u2011negotiable. ClinixSummary employs industry\u2011standard encryption, strict access controls and immediate audio deletion to give you confidence that your practice and your patients are protected.</p>
                </div>

                <div class="grid-2">
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">lock</span>
                        <h3>End\u2011to\u2011end encryption</h3>
                        <p>All data is encrypted in transit using TLS 1.2+ and encrypted at rest with AES\u2011256. These bank\u2011grade standards ensure that voice recordings, transcripts and metadata remain confidential at all times.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">cleaning_services</span>
                        <h3>Ephemeral audio & data control</h3>
                        <p>We never store audio recordings. Once your note is generated, recordings are immediately and permanently deleted. You remain in control of your transcripts, which you can remove at any time.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">gavel</span>
                        <h3>HIPAA & GDPR compliance</h3>
                        <p>ClinixSummary meets the requirements of HIPAA, GDPR, PIPEDA/PHIPA, CCPA and other global privacy regulations. We sign Business Associate Agreements (BAAs) and maintain full regulatory alignment.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">auto_fix</span>
                        <h3>De-identified training data</h3>
                        <p>Our models are fine\u2011tuned on anonymised, de-identified, non\u2011PHI data and run inference on secure infrastructure. We never use your transcripts to train customer\u2011facing models.</p>
                    </div>
                </div>

                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker">Clinix Quality Management System</span>
                    <h3 class="section-title">Clinix QM: Quality at every layer.</h3>
                    <p class="section-copy">The Clinix Quality Management System (Clinix QM) ensures that every output meets clinical standards through systematic review, feedback loops, and continuous improvement protocols.</p>
                </div>

                <div class="grid-3" style="margin-bottom: 40px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">fact_check</div>
                        <h3>Clinical QA Reviews</h3>
                        <p>Dedicated quality assurance team conducts regular manual reviews of model outputs against clinical documentation standards, ensuring accuracy and completeness.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">admin_panel_settings</div>
                        <h3>Role-Based Access Controls</h3>
                        <p>Fine-grained permission systems ensure that only authorised personnel can access patient data, with full audit trails for every action taken in the system.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">verified</div>
                        <h3>Compliance Certifications</h3>
                        <p>Ongoing certification processes and third-party audits ensure ClinixSummary meets and exceeds healthcare industry security and compliance benchmarks.</p>
                    </div>
                </div>

                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker">Your Data, Your Rules</span>
                    <h3 class="section-title">Immediate deletion & granular control.</h3>
                    <div class="grid-4" style="margin-top: 30px;">
                        <div class="text-group" style="border: none;">
                            <h4 style="font-weight: 600; font-size: 16px;">Audio retention</h4>
                            <p>Deleted after note generation</p>
                        </div>
                        <div class="text-group" style="border: none;">
                            <h4 style="font-weight: 600; font-size: 16px;">Transcript storage</h4>
                            <p>Short retention / user\u2011controlled</p>
                        </div>
                        <div class="text-group" style="border: none;">
                            <h4 style="font-weight: 600; font-size: 16px;">User deletion</h4>
                            <p>Export & permanent erase at any time</p>
                        </div>
                        <div class="text-group" style="border: none;">
                            <h4 style="font-weight: 600; font-size: 16px;">Audit trails</h4>
                            <p>Full activity logs for governance</p>
                        </div>
                    </div>
                </div>

                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker">Clinic Resources</span>
                    <h3 class="section-title">Patient privacy notice for your practice.</h3>
                    <p class="section-copy">Download our printable patient privacy leaflet to display in your waiting room or consultation area. It explains how AI documentation works, what happens to the recording, and reassures patients about their privacy.</p>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-bottom: 60px; border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
                    <span class="material-symbols-rounded" style="font-size: 48px; color: var(--accent);">description</span>
                    <div style="flex: 1; min-width: 250px;">
                        <h4 style="font-weight: 700; font-size: 16px; margin-bottom: 6px;">Patient Privacy Notice \u2014 Printable Leaflet</h4>
                        <p style="color: var(--text-secondary); font-size: 14px; margin: 0;">A4 single-sided leaflet explaining recording usage, encryption, data deletion, and patient rights. Designed for clinic walls and waiting rooms.</p>
                    </div>
                    <a href="docs/resources/patient-privacy-notice.pdf" target="_blank" class="btn-primary" style="text-decoration: none; white-space: nowrap;">
                        <span class="material-symbols-rounded" style="font-size: 18px; vertical-align: middle; margin-right: 4px;">download</span> Download PDF
                    </a>
                </div>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 20px;">Ready to secure your documentation workflow?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: #fff; color: var(--text-primary);" onclick="showToast('Trial started!'); return false;" data-i18n="common.start_trial">Start free trial</a>
                        <a href="#contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;" data-i18n="common.contact_us">Contact our team</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function CareersPage() {
    const jobs = [
        {
            title: 'Machine Learning Engineer \u2014 Medical NLP',
            team: 'AI & Models',
            location: 'Remote (Global)',
            type: 'Full-time',
            icon: 'model_training',
            description: 'Design, train and deploy the proprietary clinical language models that power ClinixSummary. You will work with medical transcription datasets, fine-tune transformer architectures for specialty-specific documentation, and push the accuracy boundaries of real-time ambient speech recognition.',
            requirements: [
                'Experience with transformer architectures and fine-tuning LLMs',
                'Strong background in NLP, speech recognition or medical informatics',
                'Proficiency in Python, PyTorch or JAX',
                'Familiarity with healthcare data standards (HL7, FHIR) is a plus'
            ]
        },
        {
            title: 'Clinical Informatics Specialist',
            team: 'Clinical Quality',
            location: 'Remote (Global)',
            type: 'Full-time',
            icon: 'clinical_notes',
            description: 'Bridge the gap between clinical practice and AI engineering. You will define documentation standards across 40+ specialties, design QA review workflows for Clinix QM, and ensure every model output meets the bar clinicians expect \u2014 from SOAP notes to operative reports.',
            requirements: [
                'Clinical background (MD, RN, PA, allied health or equivalent)',
                'Experience with clinical documentation standards and EHR workflows',
                'Strong analytical skills and attention to clinical detail',
                'Comfort working cross-functionally with engineering teams'
            ]
        },
        {
            title: 'Full-Stack Software Engineer',
            team: 'Platform Engineering',
            location: 'Remote (Global)',
            type: 'Full-time',
            icon: 'code',
            description: 'Build and scale the web platform, real-time audio pipelines, and API layer that clinicians depend on daily. You will ship features across the console, integrations framework, and billing engine while keeping the system fast, secure and reliable at scale.',
            requirements: [
                'Strong JavaScript/TypeScript and modern framework experience',
                'Backend proficiency in Node.js, Python or Go',
                'Experience with real-time systems, WebSockets or audio streaming',
                'Understanding of HIPAA-compliant infrastructure and cloud security'
            ]
        },
        {
            title: 'Product Manager \u2014 Healthcare AI',
            team: 'Product',
            location: 'Remote (Global)',
            type: 'Full-time',
            icon: 'assignment',
            description: 'Own the product roadmap from clinician feedback to shipped feature. You will prioritise across specialty modules, integrations and workflow tools, run discovery with healthcare organisations, and ensure every release moves the needle on documentation time saved.',
            requirements: [
                'Product management experience in health-tech or SaaS',
                'Ability to translate clinical needs into clear product specifications',
                'Data-driven decision making with strong prioritisation skills',
                'Excellent communication across technical and clinical stakeholders'
            ]
        },
        {
            title: 'Clinical Linguist \u2014 Multi-language Models',
            team: 'AI & Models',
            location: 'Remote (Global)',
            type: 'Full-time / Contract',
            icon: 'translate',
            description: 'Expand ClinixSummary\u2019s language capabilities by developing medical terminology datasets, validating translations of clinical templates, and training code-switching models that handle real-world multilingual consultations across our supported language pairs.',
            requirements: [
                'Degree in linguistics, computational linguistics or translation studies',
                'Fluency in 2+ languages with medical terminology knowledge',
                'Experience with corpus annotation, lexicography or NLP data pipelines',
                'Healthcare or life-sciences domain experience preferred'
            ]
        }
    ];

    var jobCards = jobs.map(function(job) {
        var reqItems = job.requirements.map(function(req) {
            return '<li style="display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: var(--text-secondary);">'
                + '<span class="material-symbols-rounded" style="font-size: 16px; color: var(--accent); margin-top: 2px;">check_circle</span>'
                + req
                + '</li>';
        }).join('');

        return '<div style="border: 1px solid var(--border-subtle); border-radius: 12px; padding: 32px; margin-bottom: 20px;">'
            + '<div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">'
            + '<div style="display: flex; align-items: center; gap: 12px;">'
            + '<span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">' + job.icon + '</span>'
            + '<div>'
            + '<h4 style="font-size: 18px; font-weight: 600; margin-bottom: 4px;">' + job.title + '</h4>'
            + '<div style="display: flex; gap: 16px; font-size: 13px; color: var(--text-secondary);">'
            + '<span>' + job.team + '</span>'
            + '<span>' + job.location + '</span>'
            + '<span>' + job.type + '</span>'
            + '</div></div></div>'
            + '<a href="mailto:careers@clinixsummary.ai?subject=Application: ' + encodeURIComponent(job.title) + '" class="btn-primary" style="font-size: 13px; padding: 8px 20px; white-space: nowrap;">Apply now</a>'
            + '</div>'
            + '<p style="color: var(--text-secondary); margin-bottom: 16px; line-height: 1.6;">' + job.description + '</p>'
            + '<div>'
            + '<h5 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; margin-bottom: 8px;">Requirements</h5>'
            + '<ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 6px;">'
            + reqItems
            + '</ul></div></div>';
    }).join('');

    return '<section class="subpage-container"><div class="page-width">'
        + '<div class="subpage-header">'
        + '<span class="kicker">Join Us</span>'
        + '<h2 class="subpage-title">Build the future of clinical documentation.</h2>'
        + '<p class="subpage-copy">ClinixSummary is a small, global team of clinicians, engineers and designers on a mission to give healthcare professionals their time back. We work remotely, ship weekly, and believe the best ideas come from people who care deeply about the problem.</p>'
        + '</div>'
        + '<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 48px; justify-content: center;">'
        + '<div style="background: var(--bg-subtle); padding: 10px 20px; border-radius: 8px; font-size: 14px; display: flex; align-items: center; gap: 8px;">'
        + '<span class="material-symbols-rounded" style="font-size: 18px; color: var(--accent);">public</span> Remote-first, global team</div>'
        + '<div style="background: var(--bg-subtle); padding: 10px 20px; border-radius: 8px; font-size: 14px; display: flex; align-items: center; gap: 8px;">'
        + '<span class="material-symbols-rounded" style="font-size: 18px; color: var(--accent);">rocket_launch</span> Ship weekly, learn daily</div>'
        + '<div style="background: var(--bg-subtle); padding: 10px 20px; border-radius: 8px; font-size: 14px; display: flex; align-items: center; gap: 8px;">'
        + '<span class="material-symbols-rounded" style="font-size: 18px; color: var(--accent);">favorite</span> Healthcare impact at scale</div>'
        + '</div>'
        + '<h3 class="section-title" style="margin-bottom: 32px;">Open positions</h3>'
        + jobCards
        + '<div style="background: var(--bg-subtle); padding: 32px; border-radius: 12px; margin-top: 40px; text-align: center; border: 1px solid var(--border-subtle);">'
        + '<h4 style="font-weight: 700; font-size: 20px; margin-bottom: 12px;">Don\u2019t see the right role?</h4>'
        + '<p style="color: var(--text-secondary); margin-bottom: 20px;">We\u2019re always looking for talented people who are passionate about healthcare and technology. Send us your CV and tell us how you\u2019d like to contribute.</p>'
        + '<a href="mailto:careers@clinixsummary.ai?subject=General Application" class="btn-outline">Send open application</a>'
        + '</div>'
        + '</div></section>';
}

function StoryPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="story.kicker">Our Mission</span>
                    <h2 class="subpage-title" data-i18n="story.title">Putting clinicians & patients first.</h2>
                    <p class="subpage-copy" data-i18n="story.description">ClinixSummary exists to let healthcare professionals devote their full attention to those who matter most \u2013 their patients. We believe that documentation should empower care, not hinder it.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">diversity_2</span>
                        <h3 data-i18n="story.journey_title">Our Journey: From a single idea to a platform for all</h3>
                        <p data-i18n="story.journey_p1">ClinixSummary started as a project by practicing physicians frustrated with the time they spent typing instead of talking. Working nights and weekends, we built an AI scribe that could reliably capture the nuance of clinical conversations. When colleagues in dentistry, psychology and veterinary medicine asked if they could use it, we realised the need extended far beyond doctors.</p>
                        <p style="margin-top: 15px;" data-i18n="story.journey_p2">Today, our team spans clinicians, engineers and designers. We serve practices across medicine, dentistry, behavioural health, allied health and veterinary care. Our journey is defined by one constant: Kaizen \u2013 the Japanese principle of continuous improvement. We listen to feedback, ship updates weekly and never stop striving to make documentation invisible.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">change_circle</span>
                        <h3 data-i18n="story.different_title">What Makes Us Different: Clinician\u2011led, technology\u2011driven</h3>
                        <p data-i18n="story.different_desc">Unlike generic dictation software, ClinixSummary is built by clinicians for clinicians. Every decision we make is anchored in the realities of practice \u2013 from the need to code\u2011switch between languages, to the pressures of reimbursement, to the importance of seeing your patient, not your screen.</p>
                        <ul style="list-style: none; margin-top: 15px;">
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-inline-end: 8px; color: var(--accent);">diversity_2</span> <span data-i18n="story.bullet1">All clinicians welcome: Doctors, dentists, therapists, midwives, vets \u2013 our models are tuned for your specialty.</span></li>
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-inline-end: 8px; color: var(--accent);">change_circle</span> <span data-i18n="story.bullet2">Kaizen mindset: We ship improvements continuously, guided by your feedback. Good enough is never enough.</span></li>
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-inline-end: 8px; color: var(--accent);">public</span> <span data-i18n="story.bullet3">Global by design: Our platform supports multiple languages, jurisdictional privacy laws and healthcare systems.</span></li>
                        </ul>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 20px; border: 1px solid var(--border-subtle); text-align: center;">
                    <h4 style="font-weight: 700; font-size: 24px; margin-bottom: 15px;" data-i18n="story.cta_title">Join us on the journey</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="story.cta_desc">Whether you\u2019re a clinician, a clinic manager or a healthcare innovator, we invite you to be part of our mission to simplify documentation for all.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Trial started!'); return false;" data-i18n="story.cta_trial">Start free trial</a>
                        <a href="#contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}
