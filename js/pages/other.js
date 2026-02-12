// --- Other Pages: Security, Careers, Story, Terms & Policies ---

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

function PrivacyPolicyPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Legal</span>
                    <h2 class="subpage-title">Privacy Policy</h2>
                    <p class="subpage-copy">Last updated: 1 January 2026. This Privacy Policy explains how GATMEDI Ltd (\u201cClinixSummary\u201d, \u201cwe\u201d, \u201cour\u201d, \u201cus\u201d) collects, uses, discloses and safeguards personal information when you use our platform and services.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3>1. Information We Collect</h3>
                        <p><strong>Account Information.</strong> When you create an account we collect your name, email address, professional credentials, organisation name and billing details.</p>
                        <p style="margin-top: 10px;"><strong>Audio & Clinical Data.</strong> When you use the platform, audio recordings of clinical encounters are processed in real time. Audio is immediately and permanently deleted once the clinical note is generated. We never store audio recordings beyond the note-generation process.</p>
                        <p style="margin-top: 10px;"><strong>Generated Documentation.</strong> Clinical notes, transcripts, codes and other outputs generated by ClinixSummary are stored in your account for your access and use. You may export or permanently delete this data at any time.</p>
                        <p style="margin-top: 10px;"><strong>Usage Data.</strong> We collect anonymised usage analytics (feature usage, session duration, error logs) to improve platform performance. This data contains no Protected Health Information (PHI).</p>
                    </div>

                    <div class="text-group">
                        <h3>2. How We Use Your Information</h3>
                        <p>We use your information to: (a) provide and improve our services; (b) generate clinical documentation from audio input; (c) process billing and manage your subscription; (d) communicate product updates and support responses; (e) comply with legal obligations including healthcare regulations.</p>
                        <p style="margin-top: 10px;">We <strong>do not</strong> use your clinical data, transcripts or audio to train customer-facing AI models. Our models are trained exclusively on de-identified, non-PHI datasets sourced through compliant data partnerships.</p>
                    </div>

                    <div class="text-group">
                        <h3>3. Data Sharing & Disclosure</h3>
                        <p>We do not sell personal information. We may share data with: (a) sub-processors who assist in service delivery, under strict data processing agreements; (b) law enforcement or regulators where legally required; (c) professional advisors (legal, audit) under confidentiality obligations.</p>
                        <p style="margin-top: 10px;">All sub-processors are contractually required to maintain HIPAA and GDPR-equivalent protections. A current list of sub-processors is available upon request.</p>
                    </div>

                    <div class="text-group">
                        <h3>4. Data Retention</h3>
                        <p><strong>Audio:</strong> Immediately and permanently deleted upon note generation via cryptographic erasure. No audio is ever stored beyond the note-generation process.</p>
                        <p style="margin-top: 10px;"><strong>Clinical notes & transcripts:</strong> Retained in your account until you delete them or close your account. Upon account closure, all data is permanently erased within 30 days.</p>
                        <p style="margin-top: 10px;"><strong>Account information:</strong> Retained for the duration of your subscription plus any period required by applicable tax or regulatory law.</p>
                    </div>

                    <div class="text-group">
                        <h3>5. Security Measures</h3>
                        <p>We employ industry-standard security measures including: AES-256 encryption at rest; TLS 1.2+ encryption in transit; role-based access controls; comprehensive audit logging; regular penetration testing and vulnerability assessments; SOC 2-aligned processes; and physical security controls at our data-centre partners.</p>
                    </div>

                    <div class="text-group">
                        <h3>6. Your Rights</h3>
                        <p>Depending on your jurisdiction, you may have the right to: access your personal data; rectify inaccurate data; erase your data (\u201cright to be forgotten\u201d); restrict or object to processing; data portability; and withdraw consent. To exercise any of these rights, contact <a href="mailto:privacy@clinixsummary.ai" style="color: var(--accent);">privacy@clinixsummary.ai</a>.</p>
                    </div>

                    <div class="text-group">
                        <h3>7. HIPAA Compliance</h3>
                        <p>For users subject to HIPAA, ClinixSummary acts as a Business Associate. We enter into Business Associate Agreements (BAAs) upon request and maintain administrative, physical and technical safeguards as required by the HIPAA Security Rule. We conduct annual risk assessments and maintain breach notification procedures in accordance with the HITECH Act.</p>
                    </div>

                    <div class="text-group">
                        <h3>8. GDPR Compliance</h3>
                        <p>For users in the European Economic Area (EEA) and the United Kingdom, we process personal data under lawful bases including contract performance, legitimate interest and consent. We have appointed a Data Protection Officer reachable at <a href="mailto:dpo@clinixsummary.ai" style="color: var(--accent);">dpo@clinixsummary.ai</a>. Standard Contractual Clauses are used for any cross-border data transfers.</p>
                    </div>

                    <div class="text-group">
                        <h3>9. Cookies & Tracking</h3>
                        <p>Our platform uses essential cookies required for authentication and session management. We use anonymised analytics to measure feature adoption. We do not use advertising cookies or third-party behavioural tracking.</p>
                    </div>

                    <div class="text-group">
                        <h3>10. Children\u2019s Privacy</h3>
                        <p>ClinixSummary is designed for healthcare professionals and is not directed at individuals under the age of 18. We do not knowingly collect personal information from children.</p>
                    </div>

                    <div class="text-group">
                        <h3>11. Changes to This Policy</h3>
                        <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or an in-platform notification at least 30 days before they take effect. Continued use of the service after changes constitutes acceptance.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3>12. Contact</h3>
                        <p>For privacy-related enquiries, contact our Data Protection Officer at <a href="mailto:dpo@clinixsummary.ai" style="color: var(--accent);">dpo@clinixsummary.ai</a> or write to: GATMEDI Ltd, Privacy Team, United Kingdom.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function PrivacyChoicesPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Legal</span>
                    <h2 class="subpage-title">Privacy Choices</h2>
                    <p class="subpage-copy">You have control over how your data is collected and used. This page explains the privacy choices available to you as a ClinixSummary user.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">mic_off</span>
                        <h3>Audio Recording Control</h3>
                        <p>You control when recording starts and stops. ClinixSummary never records without your explicit action. All audio is immediately and permanently deleted once the clinical note is generated. No audio is ever stored, retained or used for model training.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">delete_forever</span>
                        <h3>Data Deletion</h3>
                        <p>You can permanently delete any transcript, note or generated document at any time from your account. Account deletion will erase all associated data within 30 days. To request full data erasure, contact <a href="mailto:privacy@clinixsummary.ai" style="color: var(--accent);">privacy@clinixsummary.ai</a>.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">download</span>
                        <h3>Data Export & Portability</h3>
                        <p>Export your clinical notes, transcripts and account data in standard formats (PDF, JSON, FHIR) at any time. Your data belongs to you, and you can take it with you if you leave ClinixSummary.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">cookie</span>
                        <h3>Cookie Preferences</h3>
                        <p>ClinixSummary uses only essential cookies required for authentication and session management. We do not use advertising, marketing or third-party tracking cookies. No action is needed on your part \u2014 your browsing is not tracked for advertising purposes.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">analytics</span>
                        <h3>Analytics & Improvement</h3>
                        <p>We collect anonymised, non-PHI usage analytics (feature usage frequency, session duration, error rates) to improve platform performance and user experience. This data cannot be used to identify individual patients or clinicians. You can opt out of anonymised analytics by contacting our support team.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">notifications</span>
                        <h3>Communication Preferences</h3>
                        <p>You can manage email notifications, product updates and marketing communications from your account settings. Transactional emails (billing, security alerts, regulatory notifications) cannot be opted out of, as they are required for service delivery and compliance.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">shield</span>
                        <h3>Exercising Your Rights</h3>
                        <p>Depending on your jurisdiction (GDPR, CCPA, PIPEDA/PHIPA), you may have additional rights including access, rectification, restriction, objection and portability. To exercise any privacy right, contact <a href="mailto:privacy@clinixsummary.ai" style="color: var(--accent);">privacy@clinixsummary.ai</a>. We respond to all requests within 30 days.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function TermsEnterprisePage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Legal</span>
                    <h2 class="subpage-title">Terms of Service: Enterprise</h2>
                    <p class="subpage-copy">Last updated: 1 January 2026. These Enterprise Terms of Service (\u201cTerms\u201d) govern the use of ClinixSummary by organisations, health systems and enterprise accounts.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3>1. Definitions</h3>
                        <p><strong>\u201cCustomer\u201d</strong> means the organisation or entity that enters into an Enterprise Agreement with GATMEDI Ltd. <strong>\u201cAuthorised Users\u201d</strong> means the individuals within the Customer\u2019s organisation who are permitted to access and use ClinixSummary under the Enterprise Agreement. <strong>\u201cPlatform\u201d</strong> means the ClinixSummary AI clinical documentation system and all associated tools, APIs and interfaces.</p>
                    </div>

                    <div class="text-group">
                        <h3>2. Licence & Access</h3>
                        <p>Subject to these Terms and payment of applicable fees, GATMEDI grants Customer a non-exclusive, non-transferable, revocable licence to access and use the Platform for the Customer\u2019s internal clinical documentation purposes. Customer may provision Authorised Users up to the number specified in the Enterprise Agreement.</p>
                    </div>

                    <div class="text-group">
                        <h3>3. Enterprise Features</h3>
                        <p>Enterprise accounts include: custom credit volumes; Billing Assistance module access; dedicated success manager; custom integration support (API, FHIR, HL7); team management and role-based access controls; organisation-level analytics dashboard; priority support with SLA guarantees; and custom BAA execution.</p>
                    </div>

                    <div class="text-group">
                        <h3>4. Data Ownership & Processing</h3>
                        <p>Customer retains all rights, title and interest in its clinical data, transcripts and generated documentation. GATMEDI processes Customer data solely for the purpose of providing the Platform. GATMEDI does not use Customer data for model training. A Data Processing Agreement (DPA) and Business Associate Agreement (BAA) are executed as part of every Enterprise Agreement.</p>
                    </div>

                    <div class="text-group">
                        <h3>5. Service Level Agreement</h3>
                        <p>GATMEDI commits to a platform availability target of 99.9% uptime measured monthly, excluding scheduled maintenance windows. Scheduled maintenance is communicated at least 72 hours in advance. In the event of a service-level breach, Customer may be eligible for service credits as specified in the Enterprise Agreement.</p>
                    </div>

                    <div class="text-group">
                        <h3>6. Security & Compliance</h3>
                        <p>GATMEDI maintains administrative, physical and technical safeguards consistent with industry standards including: AES-256 encryption at rest; TLS 1.2+ in transit; SOC 2-aligned processes; annual penetration testing; role-based access controls; comprehensive audit logging; and HIPAA, GDPR, PIPEDA/PHIPA, and CCPA compliance. Security documentation and audit reports are available upon request under NDA.</p>
                    </div>

                    <div class="text-group">
                        <h3>7. Fees & Payment</h3>
                        <p>Enterprise fees are set out in the Enterprise Agreement and may be based on: per-user licensing, credit volume, or custom pricing structures. Invoices are issued monthly or annually as agreed. Payment is due within 30 days of invoice date. Late payments may incur interest at the lesser of 1.5% per month or the maximum rate permitted by law.</p>
                    </div>

                    <div class="text-group">
                        <h3>8. Term & Termination</h3>
                        <p>Enterprise Agreements run for the initial term specified in the Agreement and renew automatically for successive 12-month periods unless either party provides 90 days\u2019 written notice of non-renewal. Either party may terminate for material breach if the breach remains uncured 30 days after written notice. Upon termination, Customer may export all data within 60 days, after which data is permanently erased.</p>
                    </div>

                    <div class="text-group">
                        <h3>9. Limitation of Liability</h3>
                        <p>ClinixSummary is a documentation assistance tool. All generated content requires clinician review and approval before clinical use. GATMEDI shall not be liable for clinical decisions made based on platform outputs. GATMEDI\u2019s total aggregate liability shall not exceed the fees paid by Customer in the 12 months preceding the claim. Neither party shall be liable for indirect, consequential, incidental or punitive damages.</p>
                    </div>

                    <div class="text-group">
                        <h3>10. Intellectual Property</h3>
                        <p>GATMEDI retains all intellectual property rights in the Platform, including algorithms, models, interfaces and documentation. Customer retains all rights in its clinical data. Neither party acquires any rights in the other party\u2019s intellectual property except as expressly granted in these Terms.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3>11. Governing Law</h3>
                        <p>These Terms are governed by the laws of England and Wales. Disputes shall be resolved through good-faith negotiation, followed by mediation and, if necessary, binding arbitration under the rules of the London Court of International Arbitration. For Enterprise customers, jurisdiction may be modified by mutual agreement in the Enterprise Agreement.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 40px; border: 1px solid var(--border-subtle); text-align: center;">
                    <h4 style="font-weight: 700; font-size: 20px; margin-bottom: 12px;">Ready to discuss Enterprise terms?</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">Our team can walk you through licensing, compliance requirements and custom agreements.</p>
                    <a href="#contact" class="btn-primary" onclick="setTimeout(function(){ var sel = document.getElementById('contact-topic'); if(sel) sel.value='Enterprise Licensing'; }, 200);">Contact Enterprise Sales</a>
                </div>
            </div>
        </section>
    `;
}

function UsagePolicyPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Legal</span>
                    <h2 class="subpage-title">Usage Policy</h2>
                    <p class="subpage-copy">Last updated: 1 January 2026. This Usage Policy sets out the acceptable and prohibited uses of the ClinixSummary platform and services.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3>1. Intended Use</h3>
                        <p>ClinixSummary is designed to assist licensed healthcare professionals with clinical documentation. The platform generates structured clinical notes, codes and summaries from audio input. All outputs are intended as drafts for clinician review and are not a substitute for clinical judgement.</p>
                    </div>

                    <div class="text-group">
                        <h3>2. Authorised Users</h3>
                        <p>The platform may only be used by: licensed healthcare professionals (physicians, dentists, psychologists, nurses, allied health professionals, midwives, veterinarians); clinical staff authorised by a licensed professional; and administrative personnel with appropriate access rights under an organisational account. Users must provide accurate professional credentials during registration.</p>
                    </div>

                    <div class="text-group">
                        <h3>3. Patient Consent</h3>
                        <p>Users are responsible for obtaining appropriate patient consent before recording consultations, in accordance with local laws and institutional policies. ClinixSummary provides patient-facing privacy notices and consent templates that can be adapted to your jurisdiction and practice setting.</p>
                    </div>

                    <div class="text-group">
                        <h3>4. Prohibited Uses</h3>
                        <p>You may not: (a) use the platform for any purpose other than clinical documentation and related healthcare workflows; (b) attempt to reverse-engineer, decompile or extract the underlying models or algorithms; (c) share, resell or sublicence access to the platform without authorisation; (d) use the platform to generate fraudulent documentation, upcoded claims or fabricated clinical records; (e) transmit malware, exploit vulnerabilities or interfere with platform security; (f) use the platform in a manner that violates HIPAA, GDPR or any applicable privacy law; (g) record individuals without appropriate consent.</p>
                    </div>

                    <div class="text-group">
                        <h3>5. Clinical Responsibility</h3>
                        <p>ClinixSummary is a documentation assistance tool, not a diagnostic or clinical decision-making system. All generated notes, codes and summaries must be reviewed, edited and approved by a qualified clinician before being used for clinical care, billing submission or legal purposes. The treating clinician retains full responsibility for the accuracy and appropriateness of all documentation submitted under their name.</p>
                    </div>

                    <div class="text-group">
                        <h3>6. Content Standards</h3>
                        <p>Users must ensure that all input audio is genuine clinical content. Do not use the platform for: test recordings containing fabricated patient scenarios for non-training purposes; recording non-clinical conversations; or any content that could be misleading if presented as clinical documentation.</p>
                    </div>

                    <div class="text-group">
                        <h3>7. Account Security</h3>
                        <p>Users are responsible for maintaining the security of their account credentials. Do not share login details with unauthorised individuals. Enable multi-factor authentication where available. Notify us immediately at <a href="mailto:security@clinixsummary.ai" style="color: var(--accent);">security@clinixsummary.ai</a> if you suspect unauthorised access to your account.</p>
                    </div>

                    <div class="text-group">
                        <h3>8. Fair Use</h3>
                        <p>Individual subscription plans are designed for single-clinician use. Sharing a single subscription across multiple clinicians is prohibited. Enterprise and organisational accounts must provision individual user accounts for each authorised user. Automated or programmatic abuse of the platform (e.g. bulk API calls exceeding reasonable clinical use) may result in account throttling or suspension.</p>
                    </div>

                    <div class="text-group">
                        <h3>9. Enforcement</h3>
                        <p>Violations of this Usage Policy may result in: a warning notification; temporary suspension of platform access; permanent account termination; and/or referral to the appropriate regulatory or law enforcement authority. We will provide reasonable notice and an opportunity to remedy non-wilful violations before taking enforcement action.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3>10. Reporting Violations</h3>
                        <p>If you become aware of any misuse of the ClinixSummary platform, please report it to <a href="mailto:compliance@clinixsummary.ai" style="color: var(--accent);">compliance@clinixsummary.ai</a>. Reports are treated confidentially.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function ContactPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Get in Touch</span>
                    <h2 class="subpage-title">Let\u2019s talk about your documentation needs.</h2>
                    <p class="subpage-copy">Whether you\u2019re a solo clinician exploring AI documentation or a health system looking for enterprise deployment, we\u2019re here to help.</p>
                </div>

                <div id="contact" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: flex-start;">
                    <div>
                        <h3 style="font-family: var(--font-serif); font-size: 24px; margin-bottom: 24px;">Contact channels</h3>

                        <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px;">
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">mail</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;">General enquiries</div>
                                    <a href="mailto:contact@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">contact@clinixsummary.ai</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">corporate_fare</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;">Enterprise & organisations</div>
                                    <a href="mailto:enterprise@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">enterprise@clinixsummary.ai</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">work</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;">Careers</div>
                                    <a href="mailto:careers@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">careers@clinixsummary.ai</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">shield</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;">Privacy & data protection</div>
                                    <a href="mailto:privacy@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">privacy@clinixsummary.ai</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">security</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;">Security</div>
                                    <a href="mailto:security@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">security@clinixsummary.ai</a>
                                </div>
                            </div>
                        </div>

                        <div style="background: var(--bg-subtle); padding: 24px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                            <h4 style="font-weight: 700; margin-bottom: 8px;">Follow us</h4>
                            <div style="display: flex; gap: 16px; margin-top: 12px;">
                                <a href="https://www.facebook.com/clinixsummary" target="_blank" rel="noopener" style="color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 6px;"><span style="font-weight: 700;">f</span> Facebook</a>
                                <a href="https://x.com/clinixsummary" target="_blank" rel="noopener" style="color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 6px;"><span style="font-weight: 700;">&#x1D54F;</span> X</a>
                                <a href="https://www.linkedin.com/company/clinixsummary" target="_blank" rel="noopener" style="color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 6px;"><span style="font-weight: 700;">in</span> LinkedIn</a>
                            </div>
                        </div>
                    </div>

                    <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 36px; box-shadow: 0 8px 24px rgba(0,0,0,0.06);">
                        <h3 style="font-family: var(--font-serif); font-size: 22px; margin-bottom: 24px;">Send us a message</h3>
                        <form id="contact-form" onsubmit="submitContactForm(event)">
                            <div class="form-group">
                                <label for="contact-name">Full Name *</label>
                                <input type="text" id="contact-name" name="name" required placeholder="Dr. Jane Smith">
                            </div>
                            <div class="form-group">
                                <label for="contact-email">Email Address *</label>
                                <input type="email" id="contact-email" name="email" required placeholder="jane.smith@clinic.com">
                            </div>
                            <div class="form-group">
                                <label for="contact-org">Organisation</label>
                                <input type="text" id="contact-org" name="organization" placeholder="Hospital / Practice name">
                            </div>
                            <div class="form-group">
                                <label for="contact-topic">Topic</label>
                                <select id="contact-topic" name="topic">
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Enterprise Licensing">Enterprise Licensing</option>
                                    <option value="Technical Support">Technical Support</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="Billing & Pricing">Billing & Pricing</option>
                                    <option value="Integration Support">Integration Support</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="contact-message">Message *</label>
                                <textarea id="contact-message" name="message" required rows="4" placeholder="Tell us about your documentation needs..."></textarea>
                            </div>
                            <button type="submit" class="btn-primary" style="width: 100%; text-align: center; justify-content: center; padding: 14px; font-size: 15px; font-weight: 600;">
                                Send Message
                            </button>
                            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 12px; text-align: center;">This will open your email client with the form details pre-filled.</p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function submitContactForm(event) {
    event.preventDefault();
    var name = document.getElementById('contact-name').value;
    var email = document.getElementById('contact-email').value;
    var org = document.getElementById('contact-org').value;
    var topic = document.getElementById('contact-topic').value;
    var message = document.getElementById('contact-message').value;

    var recipient = (topic === 'Enterprise Licensing') ? 'enterprise@clinixsummary.ai' : 'contact@clinixsummary.ai';
    var subject = encodeURIComponent('[ClinixSummary] ' + topic);
    var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Organisation: ' + (org || 'N/A') + '\n' +
        'Topic: ' + topic + '\n\n' +
        'Message:\n' + message
    );

    window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
    showToast('Opening your email client...');
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
