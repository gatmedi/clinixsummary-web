// --- Other Pages: Security, Careers, Story, Terms & Policies ---

function SecurityPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Section 1: Hero -->
                <div class="subpage-header">
                    <span class="kicker" data-i18n="security.kicker">Trust Center</span>
                    <h2 class="subpage-title" data-i18n="security.title">Security, privacy and compliance \u2014 verified.</h2>
                    <p class="subpage-copy" data-i18n="security.desc">Safeguarding patient data is non\u2011negotiable. ClinixSummary employs industry\u2011standard encryption, strict access controls and immediate audio deletion \u2014 governed by the ClinixQM Quality Management System \u2014 to give you confidence that your practice and your patients are protected.</p>
                </div>

                <!-- Section 2: Compliance Frameworks -->
                <div class="compliance-badges">
                    <div class="compliance-badge">
                        <span class="material-symbols-rounded">verified_user</span>
                        <div>
                            <div style="font-size: 15px;">HIPAA</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 400;" data-i18n="security.badge_ready">Ready</div>
                        </div>
                    </div>
                    <div class="compliance-badge">
                        <span class="material-symbols-rounded">shield</span>
                        <div>
                            <div style="font-size: 15px;">SOC 2</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 400;" data-i18n="security.badge_aligned">Aligned</div>
                        </div>
                    </div>
                    <div class="compliance-badge">
                        <span class="material-symbols-rounded">privacy_tip</span>
                        <div>
                            <div style="font-size: 15px;">GDPR</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 400;" data-i18n="security.badge_compliant">Compliant</div>
                        </div>
                    </div>
                    <div class="compliance-badge">
                        <span class="material-symbols-rounded">encrypted</span>
                        <div>
                            <div style="font-size: 15px;">AES-256</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 400;" data-i18n="security.badge_encryption">Encryption</div>
                        </div>
                    </div>
                    <div class="compliance-badge">
                        <span class="material-symbols-rounded">flag</span>
                        <div>
                            <div style="font-size: 15px;">PIPEDA / PHIPA</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 400;" data-i18n="security.badge_compliant">Compliant</div>
                        </div>
                    </div>
                    <div class="compliance-badge">
                        <span class="material-symbols-rounded">policy</span>
                        <div>
                            <div style="font-size: 15px;">CCPA</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 400;" data-i18n="security.badge_compliant">Compliant</div>
                        </div>
                    </div>
                    <div class="compliance-badge">
                        <span class="material-symbols-rounded">domain_verification</span>
                        <div>
                            <div style="font-size: 15px;">ISO 27001</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 400;" data-i18n="security.badge_aligned">Aligned</div>
                        </div>
                    </div>
                </div>

                <!-- Section 3: Security Practices -->
                <div class="grid-3" style="margin-top: 48px;">
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">lock</span>
                        <h3 data-i18n="security.encryption_title">End\u2011to\u2011end encryption</h3>
                        <p data-i18n="security.encryption_desc">All data is encrypted in transit using TLS 1.2+ and encrypted at rest with AES\u2011256. These bank\u2011grade standards ensure that voice recordings, transcripts and metadata remain confidential at all times.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">cleaning_services</span>
                        <h3 data-i18n="security.ephemeral_title">Ephemeral audio & data control</h3>
                        <p data-i18n="security.ephemeral_desc">We never store audio recordings. Once your note is generated, recordings are immediately and permanently deleted. You remain in control of your transcripts, which you can remove at any time.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">gavel</span>
                        <h3 data-i18n="security.compliance_title">HIPAA & GDPR compliance</h3>
                        <p data-i18n="security.compliance_desc">ClinixSummary meets the requirements of HIPAA, GDPR, PIPEDA/PHIPA, CCPA and other global privacy regulations. We sign Business Associate Agreements (BAAs) and maintain full regulatory alignment.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">auto_fix</span>
                        <h3 data-i18n="security.deidentified_title">De-identified training data</h3>
                        <p data-i18n="security.deidentified_desc">Our models are fine\u2011tuned on anonymised, de-identified, non\u2011PHI data and run inference on secure infrastructure. We never use your transcripts to train customer\u2011facing models.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">bug_report</span>
                        <h3 data-i18n="security.pentest_title">Penetration testing</h3>
                        <p data-i18n="security.pentest_desc">Regular third\u2011party penetration tests and vulnerability assessments are conducted against our infrastructure and applications. Findings are triaged, remediated and re\u2011tested on a continuous basis.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">emergency_home</span>
                        <h3 data-i18n="security.incident_title">Incident response</h3>
                        <p data-i18n="security.incident_desc">A documented incident response plan ensures breach notification within 72 hours as required by GDPR. 24/7 monitoring, alerting and defined escalation playbooks keep response times minimal.</p>
                    </div>
                </div>

                <!-- Section 4: ClinixQM Quality Management -->
                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker" data-i18n="security.qms_kicker">ClinixQM Quality Management Process</span>
                    <h3 class="section-title" data-i18n="security.qms_title">Clinix QM: Quality at every layer.</h3>
                    <p class="section-copy" data-i18n="security.qms_desc">The Clinix Quality Management System (Clinix QM) ensures that every output meets clinical standards through systematic review, feedback loops, and continuous improvement protocols.</p>
                </div>

                <div class="grid-3" style="margin-bottom: 40px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">fact_check</div>
                        <h3 data-i18n="security.qa_title">Clinical QA Reviews</h3>
                        <p data-i18n="security.qa_desc">Dedicated quality assurance team conducts regular manual reviews of model outputs against clinical documentation standards, ensuring accuracy and completeness.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">admin_panel_settings</div>
                        <h3 data-i18n="security.rbac_title">Role-Based Access Controls</h3>
                        <p data-i18n="security.rbac_desc">Fine-grained permission systems ensure that only authorised personnel can access patient data, with full audit trails for every action taken in the system.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">verified</div>
                        <h3 data-i18n="security.cert_title">Compliance Certifications</h3>
                        <p data-i18n="security.cert_desc">Ongoing certification processes and third-party audits ensure ClinixSummary meets and exceeds healthcare industry security and compliance benchmarks.</p>
                    </div>
                </div>

                <!-- Section 5: Sub-Processors -->
                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker" data-i18n="security.sp_kicker">Sub-Processor Transparency</span>
                    <h3 class="section-title" data-i18n="security.sp_title">Our vendors, disclosed.</h3>
                    <p class="section-copy" data-i18n="security.sp_desc">We believe in full transparency about the third parties that help us deliver our service. Every sub-processor is bound by data protection obligations no less protective than our own. We provide at least 30 days\u2019 written notice before engaging a new sub-processor.</p>
                </div>

                <div class="subprocessor-wrap">
                    <table class="subprocessor-table">
                        <thead>
                            <tr>
                                <th data-i18n="security.sp_col_name">Sub-Processor</th>
                                <th data-i18n="security.sp_col_purpose">Purpose</th>
                                <th data-i18n="security.sp_col_data">Data Processed</th>
                                <th data-i18n="security.sp_col_location">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td class="sp-name"><img src="images/sp-openai.svg" alt="" class="sp-logo">OpenAI</td><td data-i18n="security.sp_openai_purpose">LLM inference for clinical note generation</td><td data-i18n="security.sp_openai_data">De-identified clinical text</td><td>USA</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-elevenlabs.svg" alt="" class="sp-logo">ElevenLabs</td><td data-i18n="security.sp_elevenlabs_purpose">Text-to-speech synthesis</td><td data-i18n="security.sp_elevenlabs_data">Non-PHI audio data</td><td>USA / EU</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-google.svg" alt="" class="sp-logo">Google (GCP)</td><td data-i18n="security.sp_google_purpose">Cloud infrastructure & speech-to-text</td><td data-i18n="security.sp_google_data">Encrypted clinical data</td><td data-i18n="security.sp_multiregion">Multi-region</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-azure.svg" alt="" class="sp-logo">Microsoft Azure</td><td data-i18n="security.sp_azure_purpose">Cloud infrastructure & AI services</td><td data-i18n="security.sp_azure_data">Encrypted clinical data</td><td data-i18n="security.sp_multiregion">Multi-region</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-stripe.svg" alt="" class="sp-logo">Stripe</td><td data-i18n="security.sp_stripe_purpose">Payment processing</td><td data-i18n="security.sp_stripe_data">Billing data (no PHI)</td><td>USA</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-postmark.svg" alt="" class="sp-logo">Postmark</td><td data-i18n="security.sp_postmark_purpose">Transactional email delivery</td><td data-i18n="security.sp_postmark_data">Email addresses, notifications (no PHI)</td><td>USA</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-apple.svg" alt="" class="sp-logo">Apple App Store</td><td data-i18n="security.sp_apple_purpose">iOS app distribution</td><td data-i18n="security.sp_apple_data">App metadata, user account</td><td>USA</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-gplay.svg" alt="" class="sp-logo">Google Play Store</td><td data-i18n="security.sp_gplay_purpose">Android app distribution</td><td data-i18n="security.sp_gplay_data">App metadata, user account</td><td>USA</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-sectigo.svg" alt="" class="sp-logo">Sectigo</td><td data-i18n="security.sp_sectigo_purpose">SSL/TLS certificate authority</td><td data-i18n="security.sp_sectigo_data">Domain validation data</td><td>USA / UK</td></tr>
                            <tr><td class="sp-name"><img src="images/sp-dmarc.svg" alt="" class="sp-logo">DMARC Digests</td><td data-i18n="security.sp_dmarc_purpose">Email authentication monitoring</td><td data-i18n="security.sp_dmarc_data">Domain & email auth reports (no PHI)</td><td>USA</td></tr>
                        </tbody>
                    </table>
                </div>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 16px;" data-i18n-html="security.sp_note">This list is maintained as part of our <a href="/dpa" style="color: var(--accent);">Data Processing Agreement</a>. We provide at least 30 days\u2019 prior written notice before engaging a new sub-processor.</p>

                <!-- Section 6: Organisational Security -->
                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker" data-i18n="security.org_kicker">Organisational Security</span>
                    <h3 class="section-title" data-i18n="security.org_title">Security is a culture, not just a feature.</h3>
                </div>

                <div class="grid-3" style="margin-bottom: 40px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">badge</div>
                        <h3 data-i18n="security.org_employee_title">Employee Security</h3>
                        <p data-i18n="security.org_employee_desc">All team members undergo background checks and mandatory security awareness training. Access follows the principle of least privilege and is reviewed regularly.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">handshake</div>
                        <h3 data-i18n="security.org_vendor_title">Vendor Management</h3>
                        <p data-i18n="security.org_vendor_desc">Every sub-processor undergoes due diligence review before engagement. Contractual data protection obligations, regular reassessment and right-to-audit clauses are standard.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">backup</div>
                        <h3 data-i18n="security.org_continuity_title">Business Continuity</h3>
                        <p data-i18n="security.org_continuity_desc">Disaster recovery plans, encrypted backups and uptime monitoring ensure service availability. Infrastructure spans multiple regions for geographic redundancy.</p>
                    </div>
                </div>

                <!-- Section 7: Documents & Resources -->
                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker" data-i18n="security.docs_kicker">Documents & Resources</span>
                    <h3 class="section-title" data-i18n="security.docs_title">Everything you need for due diligence.</h3>
                </div>

                <div class="doc-grid">
                    <a href="/baa" class="doc-card">
                        <span class="material-symbols-rounded">description</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_baa">Business Associate Agreement</h4>
                            <p data-i18n="security.doc_baa_desc">HIPAA BAA for covered entities and business associates.</p>
                        </div>
                    </a>
                    <a href="/dpa" class="doc-card">
                        <span class="material-symbols-rounded">description</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_dpa">Data Processing Agreement</h4>
                            <p data-i18n="security.doc_dpa_desc">GDPR-compliant DPA with sub-processor details.</p>
                        </div>
                    </a>
                    <a href="/privacy-policy" class="doc-card">
                        <span class="material-symbols-rounded">policy</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_privacy">Privacy Policy</h4>
                            <p data-i18n="security.doc_privacy_desc">How we collect, use and protect your data.</p>
                        </div>
                    </a>
                    <a href="/privacy-choices" class="doc-card">
                        <span class="material-symbols-rounded">tune</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_choices">Your Privacy Choices</h4>
                            <p data-i18n="security.doc_choices_desc">Manage consent, data access and deletion requests.</p>
                        </div>
                    </a>
                    <a href="/terms" class="doc-card">
                        <span class="material-symbols-rounded">gavel</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_terms">Terms of Service</h4>
                            <p data-i18n="security.doc_terms_desc">Standard terms governing platform usage.</p>
                        </div>
                    </a>
                    <a href="/terms-enterprise" class="doc-card">
                        <span class="material-symbols-rounded">corporate_fare</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_enterprise">Enterprise Terms</h4>
                            <p data-i18n="security.doc_enterprise_desc">Additional terms for enterprise and organisational accounts.</p>
                        </div>
                    </a>
                    <a href="/usage-policy" class="doc-card">
                        <span class="material-symbols-rounded">rule</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_usage">Usage Policy</h4>
                            <p data-i18n="security.doc_usage_desc">Acceptable use guidelines and restrictions.</p>
                        </div>
                    </a>
                    <a href="docs/whitepapers/security-compliance-specification-2025.pdf" target="_blank" class="doc-card">
                        <span class="material-symbols-rounded">shield</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_sec_wp">Security & Compliance Whitepaper</h4>
                            <p data-i18n="security.doc_sec_wp_desc">Technical security specification (PDF).</p>
                        </div>
                    </a>
                    <a href="docs/whitepapers/quality-management-system-qms-2025.pdf" target="_blank" class="doc-card">
                        <span class="material-symbols-rounded">verified</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_qms_wp">QMS Whitepaper</h4>
                            <p data-i18n="security.doc_qms_wp_desc">Quality management system methodology (PDF).</p>
                        </div>
                    </a>
                    <a href="docs/whitepapers/clinixsummary-architecture-overview-2025.pdf" target="_blank" class="doc-card">
                        <span class="material-symbols-rounded">architecture</span>
                        <div class="doc-card-text">
                            <h4 data-i18n="security.doc_arch_wp">Architecture Overview</h4>
                            <p data-i18n="security.doc_arch_wp_desc">System architecture and infrastructure design (PDF).</p>
                        </div>
                    </a>
                </div>

                <!-- Section 8: Data Handling -->
                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker" data-i18n="security.data_kicker">Your Data, Your Rules</span>
                    <h3 class="section-title" data-i18n="security.data_title">Immediate deletion & granular control.</h3>
                    <div class="grid-4" style="margin-top: 30px;">
                        <div class="text-group" style="border: none;">
                            <h4 style="font-weight: 600; font-size: 16px;" data-i18n="security.audio_title">Audio retention</h4>
                            <p data-i18n="security.audio_desc">Deleted after note generation</p>
                        </div>
                        <div class="text-group" style="border: none;">
                            <h4 style="font-weight: 600; font-size: 16px;" data-i18n="security.transcript_title">Transcript storage</h4>
                            <p data-i18n="security.transcript_desc">Short retention / user\u2011controlled</p>
                        </div>
                        <div class="text-group" style="border: none;">
                            <h4 style="font-weight: 600; font-size: 16px;" data-i18n="security.deletion_title">User deletion</h4>
                            <p data-i18n="security.deletion_desc">Export & permanent erase at any time</p>
                        </div>
                        <div class="text-group" style="border: none;">
                            <h4 style="font-weight: 600; font-size: 16px;" data-i18n="security.audit_title">Audit trails</h4>
                            <p data-i18n="security.audit_desc">Full activity logs for governance</p>
                        </div>
                    </div>
                </div>

                <!-- Section 9: Clinic Resources -->
                <div class="subpage-header" style="margin-top: 60px;">
                    <span class="kicker" data-i18n="security.resources_kicker">Clinic Resources</span>
                    <h3 class="section-title" data-i18n="security.resources_title">Patient privacy notice for your practice.</h3>
                    <p class="section-copy" data-i18n="security.resources_desc">Download our printable patient privacy leaflet to display in your waiting room or consultation area. It explains how AI documentation works, what happens to the recording, and reassures patients about their privacy.</p>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-bottom: 60px; border: 1px solid var(--border-subtle);">
                    <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-bottom: 20px;">
                        <span class="material-symbols-rounded" style="font-size: 48px; color: var(--accent);">description</span>
                        <div style="flex: 1; min-width: 250px;">
                            <h4 style="font-weight: 700; font-size: 16px; margin-bottom: 6px;" data-i18n="security.leaflet_title">Patient Privacy Notice \u2014 Printable Leaflet</h4>
                            <p style="color: var(--text-secondary); font-size: 14px; margin: 0;" data-i18n="security.leaflet_desc">Available in 6 languages. Designed for clinic walls and waiting rooms.</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <a href="assets/leaflets/patient-privacy-notice-en.pdf" download class="btn-primary" style="text-decoration: none; white-space: nowrap; font-size: 14px;">
                            <span class="material-symbols-rounded" style="font-size: 16px; vertical-align: middle; margin-right: 4px;">download</span> English
                        </a>
                        <a href="assets/leaflets/patient-privacy-notice-fr.pdf" download class="btn-outline" style="text-decoration: none; white-space: nowrap; font-size: 14px;">Fran\u00e7ais</a>
                        <a href="assets/leaflets/patient-privacy-notice-es.pdf" download class="btn-outline" style="text-decoration: none; white-space: nowrap; font-size: 14px;">Espa\u00f1ol</a>
                        <a href="assets/leaflets/patient-privacy-notice-pt.pdf" download class="btn-outline" style="text-decoration: none; white-space: nowrap; font-size: 14px;">Portugu\u00eas</a>
                        <a href="assets/leaflets/patient-privacy-notice-it.pdf" download class="btn-outline" style="text-decoration: none; white-space: nowrap; font-size: 14px;">Italiano</a>
                        <a href="assets/leaflets/patient-privacy-notice-ar.pdf" download class="btn-outline" style="text-decoration: none; white-space: nowrap; font-size: 14px;">\u0627\u0644\u0639\u0631\u0628\u064a\u0629</a>
                    </div>
                </div>

                <!-- ClinixQM Banner -->
                <div class="trust-qm-banner" style="margin-top: 60px;">
                    <img src="images/clinixqm-logo.png" alt="ClinixQM" onerror="this.style.display='none'">
                    <div>
                        <div style="font-weight: 600; font-size: 14px;" data-i18n="security.qm_powered">Quality assured by ClinixQM</div>
                        <a href="https://clinixqm.gacrux.ai/" target="_blank" rel="noopener" style="font-size: 13px;">clinixqm.gacrux.ai <span class="material-symbols-rounded" style="font-size: 14px; vertical-align: middle;">open_in_new</span></a>
                    </div>
                </div>

                <!-- Section 10: CTA -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 20px;" data-i18n="security.cta_title">Ready to secure your documentation workflow?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: #fff; color: var(--text-primary);" onclick="showToast('Trial started!'); return false;" data-i18n="common.start_trial">Start free trial</a>
                        <a href="/contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;" data-i18n="common.contact_us">Contact our team</a>
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
            + '<h5 class="kicker" style="font-size: 13px; color: #999; margin-bottom: 8px;">Requirements</h5>'
            + '<ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 6px;">'
            + reqItems
            + '</ul></div></div>';
    }).join('');

    return '<section class="subpage-container"><div class="page-width">'
        + '<div class="subpage-header">'
        + '<span class="kicker" data-i18n="careers.kicker">Join Us</span>'
        + '<h2 class="subpage-title" data-i18n="careers.title">Build the future of clinical documentation.</h2>'
        + '<p class="subpage-copy" data-i18n="careers.desc">ClinixSummary is a small, global team of clinicians, engineers and designers on a mission to give healthcare professionals their time back. We work remotely, ship weekly, and believe the best ideas come from people who care deeply about the problem.</p>'
        + '</div>'
        + '<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 48px; justify-content: center;">'
        + '<div style="background: var(--bg-subtle); padding: 10px 20px; border-radius: 8px; font-size: 14px; display: flex; align-items: center; gap: 8px;">'
        + '<span class="material-symbols-rounded" style="font-size: 18px; color: var(--accent);">public</span> Remote-first, global team</div>'
        + '<div style="background: var(--bg-subtle); padding: 10px 20px; border-radius: 8px; font-size: 14px; display: flex; align-items: center; gap: 8px;">'
        + '<span class="material-symbols-rounded" style="font-size: 18px; color: var(--accent);">rocket_launch</span> Ship weekly, learn daily</div>'
        + '<div style="background: var(--bg-subtle); padding: 10px 20px; border-radius: 8px; font-size: 14px; display: flex; align-items: center; gap: 8px;">'
        + '<span class="material-symbols-rounded" style="font-size: 18px; color: var(--accent);">favorite</span> Healthcare impact at scale</div>'
        + '</div>'
        + '<h3 class="section-title" style="margin-bottom: 32px;" data-i18n="careers.open_positions">Open positions</h3>'
        + jobCards
        + '<div style="background: var(--bg-subtle); padding: 32px; border-radius: 12px; margin-top: 40px; text-align: center; border: 1px solid var(--border-subtle);">'
        + '<h4 style="font-weight: 700; font-size: 20px; margin-bottom: 12px;" data-i18n="careers.no_role_title">Don’t see the right role?</h4>'
        + '<p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="careers.no_role_desc">We\u2019re always looking for talented people who are passionate about healthcare and technology. Send us your CV and tell us how you\u2019d like to contribute.</p>'
        + '<a href="mailto:careers@clinixsummary.ai?subject=General Application" class="btn-outline" data-i18n="careers.open_application">Send open application</a>'
        + '</div>'
        + '</div></section>';
}

function PrivacyPolicyPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="common.legal">Legal</span>
                    <h2 class="subpage-title" data-i18n="privacy_policy.title">Privacy Policy</h2>
                    <p class="subpage-copy" data-i18n="privacy_policy.intro">Last updated: 1 January 2026. This Privacy Policy explains how GATMEDI Ltd (\u201cClinixSummary\u201d, \u201cwe\u201d, \u201cour\u201d, \u201cus\u201d) collects, uses, discloses and safeguards personal information when you use our platform and services.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s1_title">1. Information We Collect</h3>
                        <p data-i18n-html="privacy_policy.s1_p1"><strong>Account Information.</strong> When you create an account we collect your name, email address, professional credentials, organisation name and billing details.</p>
                        <p style="margin-top: 10px;" data-i18n-html="privacy_policy.s1_p2"><strong>Audio & Clinical Data.</strong> When you use the platform, audio recordings of clinical encounters are processed in real time. Audio is immediately and permanently deleted once the clinical note is generated. We never store audio recordings beyond the note-generation process.</p>
                        <p style="margin-top: 10px;" data-i18n-html="privacy_policy.s1_p3"><strong>Generated Documentation.</strong> Clinical notes, transcripts, codes and other outputs generated by ClinixSummary are stored in your account for your access and use. You may export or permanently delete this data at any time.</p>
                        <p style="margin-top: 10px;" data-i18n-html="privacy_policy.s1_p4"><strong>Usage Data.</strong> We collect anonymised usage analytics (feature usage, session duration, error logs) to improve platform performance. This data contains no Protected Health Information (PHI).</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s2_title">2. How We Use Your Information</h3>
                        <p data-i18n="privacy_policy.s2_p1">We use your information to: (a) provide and improve our services; (b) generate clinical documentation from audio input; (c) process billing and manage your subscription; (d) communicate product updates and support responses; (e) comply with legal obligations including healthcare regulations.</p>
                        <p style="margin-top: 10px;" data-i18n-html="privacy_policy.s2_p2">We <strong>do not</strong> use your clinical data, transcripts or audio to train customer-facing AI models. Our models are trained exclusively on de-identified, non-PHI datasets sourced through compliant data partnerships.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s3_title">3. Data Sharing & Disclosure</h3>
                        <p data-i18n="privacy_policy.s3_p1">We do not sell personal information. We may share data with: (a) sub-processors who assist in service delivery, under strict data processing agreements; (b) law enforcement or regulators where legally required; (c) professional advisors (legal, audit) under confidentiality obligations.</p>
                        <p style="margin-top: 10px;" data-i18n-html="privacy_policy.s3_p2">All sub-processors are contractually required to maintain HIPAA and GDPR-equivalent protections. A current list of sub-processors is published on our <a href="/security" style="color: var(--accent);">Trust Center</a>.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s4_title">4. Data Retention</h3>
                        <p data-i18n-html="privacy_policy.s4_p1"><strong>Audio:</strong> Immediately and permanently deleted upon note generation via cryptographic erasure. No audio is ever stored beyond the note-generation process.</p>
                        <p style="margin-top: 10px;" data-i18n-html="privacy_policy.s4_p2"><strong>Clinical notes & transcripts:</strong> Retained in your account until you delete them or close your account. Upon account closure, all data is permanently erased within 30 days.</p>
                        <p style="margin-top: 10px;" data-i18n-html="privacy_policy.s4_p3"><strong>Account information:</strong> Retained for the duration of your subscription plus any period required by applicable tax or regulatory law.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s5_title">5. Security Measures</h3>
                        <p data-i18n="privacy_policy.s5_p1">We employ industry-standard security measures including: AES-256 encryption at rest; TLS 1.2+ encryption in transit; role-based access controls; comprehensive audit logging; regular penetration testing and vulnerability assessments; SOC 2-aligned processes; and physical security controls at our data-centre partners.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s6_title">6. Your Rights</h3>
                        <p data-i18n-html="privacy_policy.s6_p1">Depending on your jurisdiction, you may have the right to: access your personal data; rectify inaccurate data; erase your data (\u201cright to be forgotten\u201d); restrict or object to processing; data portability; and withdraw consent. To exercise any of these rights, contact <a href="mailto:privacy@clinixsummary.ai" style="color: var(--accent);">privacy@clinixsummary.ai</a>.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s7_title">7. HIPAA Compliance</h3>
                        <p data-i18n="privacy_policy.s7_p1">For users subject to HIPAA, ClinixSummary acts as a Business Associate. We enter into Business Associate Agreements (BAAs) upon request and maintain administrative, physical and technical safeguards as required by the HIPAA Security Rule. We conduct annual risk assessments and maintain breach notification procedures in accordance with the HITECH Act.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s8_title">8. GDPR Compliance</h3>
                        <p data-i18n-html="privacy_policy.s8_p1">For users in the European Economic Area (EEA) and the United Kingdom, we process personal data under lawful bases including contract performance, legitimate interest and consent. We have appointed a Data Protection Officer reachable at <a href="mailto:dpo@clinixsummary.ai" style="color: var(--accent);">dpo@clinixsummary.ai</a>. Standard Contractual Clauses are used for any cross-border data transfers.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s9_title">9. Cookies & Tracking</h3>
                        <p data-i18n="privacy_policy.s9_p1">Our platform uses essential cookies required for authentication and session management. We use anonymised analytics to measure feature adoption. We do not use advertising cookies or third-party behavioural tracking.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s10_title">10. Children\u2019s Privacy</h3>
                        <p data-i18n="privacy_policy.s10_p1">ClinixSummary is designed for healthcare professionals and is not directed at individuals under the age of 18. We do not knowingly collect personal information from children.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="privacy_policy.s11_title">11. Changes to This Policy</h3>
                        <p data-i18n="privacy_policy.s11_p1">We may update this Privacy Policy from time to time. Material changes will be communicated via email or an in-platform notification at least 30 days before they take effect. Continued use of the service after changes constitutes acceptance.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="privacy_policy.s12_title">12. Contact</h3>
                        <p data-i18n-html="privacy_policy.s12_p1">For privacy-related enquiries, contact our Data Protection Officer at <a href="mailto:dpo@clinixsummary.ai" style="color: var(--accent);">dpo@clinixsummary.ai</a> or write to: GATMEDI Ltd, Privacy Team, United Kingdom.</p>
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
                    <span class="kicker" data-i18n="common.legal">Legal</span>
                    <h2 class="subpage-title" data-i18n="privacy_choices.title">Privacy Choices</h2>
                    <p class="subpage-copy" data-i18n="privacy_choices.intro">You have control over how your data is collected and used. This page explains the privacy choices available to you as a ClinixSummary user.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">mic_off</span>
                        <h3 data-i18n="privacy_choices.s1_title">Audio Recording Control</h3>
                        <p data-i18n="privacy_choices.s1_p1">You control when recording starts and stops. ClinixSummary never records without your explicit action. All audio is immediately and permanently deleted once the clinical note is generated. No audio is ever stored, retained or used for model training.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">delete_forever</span>
                        <h3 data-i18n="privacy_choices.s2_title">Data Deletion</h3>
                        <p data-i18n-html="privacy_choices.s2_p1">You can permanently delete any transcript, note or generated document at any time from your account. Account deletion will erase all associated data within 30 days. To request full data erasure, contact <a href="mailto:privacy@clinixsummary.ai" style="color: var(--accent);">privacy@clinixsummary.ai</a>.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">download</span>
                        <h3 data-i18n="privacy_choices.s3_title">Data Export & Portability</h3>
                        <p data-i18n="privacy_choices.s3_p1">Export your clinical notes, transcripts and account data in standard formats (PDF, JSON, FHIR) at any time. Your data belongs to you, and you can take it with you if you leave ClinixSummary.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">cookie</span>
                        <h3 data-i18n="privacy_choices.s4_title">Cookie Preferences</h3>
                        <p data-i18n="privacy_choices.s4_p1">ClinixSummary uses only essential cookies required for authentication and session management. We do not use advertising, marketing or third-party tracking cookies. No action is needed on your part \u2014 your browsing is not tracked for advertising purposes.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">analytics</span>
                        <h3 data-i18n="privacy_choices.s5_title">Analytics & Improvement</h3>
                        <p data-i18n="privacy_choices.s5_p1">We collect anonymised, non-PHI usage analytics (feature usage frequency, session duration, error rates) to improve platform performance and user experience. This data cannot be used to identify individual patients or clinicians. You can opt out of anonymised analytics by contacting our support team.</p>
                    </div>

                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">notifications</span>
                        <h3 data-i18n="privacy_choices.s6_title">Communication Preferences</h3>
                        <p data-i18n="privacy_choices.s6_p1">You can manage email notifications, product updates and marketing communications from your account settings. Transactional emails (billing, security alerts, regulatory notifications) cannot be opted out of, as they are required for service delivery and compliance.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">shield</span>
                        <h3 data-i18n="privacy_choices.s7_title">Exercising Your Rights</h3>
                        <p data-i18n-html="privacy_choices.s7_p1">Depending on your jurisdiction (GDPR, CCPA, PIPEDA/PHIPA), you may have additional rights including access, rectification, restriction, objection and portability. To exercise any privacy right, contact <a href="mailto:privacy@clinixsummary.ai" style="color: var(--accent);">privacy@clinixsummary.ai</a>. We respond to all requests within 30 days.</p>
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
                    <span class="kicker" data-i18n="common.legal">Legal</span>
                    <h2 class="subpage-title" data-i18n="terms_enterprise.title">Terms of Service: Enterprise</h2>
                    <p class="subpage-copy" data-i18n="terms_enterprise.intro">Last updated: 1 January 2026. These Enterprise Terms of Service (\u201cTerms\u201d) govern the use of ClinixSummary by organisations, health systems and enterprise accounts.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s1_title">1. Definitions</h3>
                        <p data-i18n-html="terms_enterprise.s1_p1"><strong>\u201cCustomer\u201d</strong> means the organisation or entity that enters into an Enterprise Agreement with GATMEDI Ltd. <strong>\u201cAuthorised Users\u201d</strong> means the individuals within the Customer\u2019s organisation who are permitted to access and use ClinixSummary under the Enterprise Agreement. <strong>\u201cPlatform\u201d</strong> means the ClinixSummary AI clinical documentation system and all associated tools, APIs and interfaces.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s2_title">2. Licence & Access</h3>
                        <p data-i18n="terms_enterprise.s2_p1">Subject to these Terms and payment of applicable fees, GATMEDI grants Customer a non-exclusive, non-transferable, revocable licence to access and use the Platform for the Customer\u2019s internal clinical documentation purposes. Customer may provision Authorised Users up to the number specified in the Enterprise Agreement.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s3_title">3. Enterprise Features</h3>
                        <p data-i18n="terms_enterprise.s3_p1">Enterprise accounts include: custom credit volumes; Billing Assistance module access; dedicated success manager; custom integration support (API, FHIR, HL7); team management and role-based access controls; organisation-level analytics dashboard; priority support with SLA guarantees; and custom BAA execution.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s4_title">4. Data Ownership & Processing</h3>
                        <p data-i18n="terms_enterprise.s4_p1">Customer retains all rights, title and interest in its clinical data, transcripts and generated documentation. GATMEDI processes Customer data solely for the purpose of providing the Platform. GATMEDI does not use Customer data for model training. A Data Processing Agreement (DPA) and Business Associate Agreement (BAA) are executed as part of every Enterprise Agreement.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s5_title">5. Service Level Agreement</h3>
                        <p data-i18n="terms_enterprise.s5_p1">GATMEDI commits to a platform availability target of 99.9% uptime measured monthly, excluding scheduled maintenance windows. Scheduled maintenance is communicated at least 72 hours in advance. In the event of a service-level breach, Customer may be eligible for service credits as specified in the Enterprise Agreement.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s6_title">6. Security & Compliance</h3>
                        <p data-i18n="terms_enterprise.s6_p1">GATMEDI maintains administrative, physical and technical safeguards consistent with industry standards including: AES-256 encryption at rest; TLS 1.2+ in transit; SOC 2-aligned processes; annual penetration testing; role-based access controls; comprehensive audit logging; and HIPAA, GDPR, PIPEDA/PHIPA, and CCPA compliance. Security documentation and audit reports are available upon request under NDA.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s7_title">7. Fees & Payment</h3>
                        <p data-i18n="terms_enterprise.s7_p1">Enterprise fees are set out in the Enterprise Agreement and may be based on: per-user licensing, credit volume, or custom pricing structures. Invoices are issued monthly or annually as agreed. Payment is due within 30 days of invoice date. Late payments may incur interest at the lesser of 1.5% per month or the maximum rate permitted by law.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s8_title">8. Term & Termination</h3>
                        <p data-i18n="terms_enterprise.s8_p1">Enterprise Agreements run for the initial term specified in the Agreement and renew automatically for successive 12-month periods unless either party provides 90 days\u2019 written notice of non-renewal. Either party may terminate for material breach if the breach remains uncured 30 days after written notice. Upon termination, Customer may export all data within 60 days, after which data is permanently erased.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s9_title">9. Limitation of Liability</h3>
                        <p data-i18n="terms_enterprise.s9_p1">ClinixSummary is a documentation assistance tool. All generated content requires clinician review and approval before clinical use. GATMEDI shall not be liable for clinical decisions made based on platform outputs. GATMEDI\u2019s total aggregate liability shall not exceed the fees paid by Customer in the 12 months preceding the claim. Neither party shall be liable for indirect, consequential, incidental or punitive damages.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms_enterprise.s10_title">10. Intellectual Property</h3>
                        <p data-i18n="terms_enterprise.s10_p1">GATMEDI retains all intellectual property rights in the Platform, including algorithms, models, interfaces and documentation. Customer retains all rights in its clinical data. Neither party acquires any rights in the other party\u2019s intellectual property except as expressly granted in these Terms.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="terms_enterprise.s11_title">11. Governing Law</h3>
                        <p data-i18n="terms_enterprise.s11_p1">These Terms are governed by the laws of England and Wales. Disputes shall be resolved through good-faith negotiation, followed by mediation and, if necessary, binding arbitration under the rules of the London Court of International Arbitration. For Enterprise customers, jurisdiction may be modified by mutual agreement in the Enterprise Agreement.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 40px; border: 1px solid var(--border-subtle); text-align: center;">
                    <h4 style="font-weight: 700; font-size: 20px; margin-bottom: 12px;" data-i18n="terms_enterprise.cta_title">Ready to discuss Enterprise terms?</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="terms_enterprise.cta_desc">Our team can walk you through licensing, compliance requirements and custom agreements.</p>
                    <a href="/contact" class="btn-primary" onclick="setTimeout(function(){ var sel = document.getElementById('contact-topic'); if(sel) sel.value='Enterprise Licensing'; }, 200);" data-i18n="terms_enterprise.cta_btn">Contact Enterprise Sales</a>
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
                    <span class="kicker" data-i18n="common.legal">Legal</span>
                    <h2 class="subpage-title" data-i18n="usage_policy.title">Usage Policy</h2>
                    <p class="subpage-copy" data-i18n="usage_policy.intro">Last updated: 1 January 2026. This Usage Policy sets out the acceptable and prohibited uses of the ClinixSummary platform and services.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s1_title">1. Intended Use</h3>
                        <p data-i18n="usage_policy.s1_p1">ClinixSummary is designed to assist licensed healthcare professionals with clinical documentation. The platform generates structured clinical notes, codes and summaries from audio input. All outputs are intended as drafts for clinician review and are not a substitute for clinical judgement.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s2_title">2. Authorised Users</h3>
                        <p data-i18n="usage_policy.s2_p1">The platform may only be used by: licensed healthcare professionals (physicians, dentists, psychologists, nurses, allied health professionals, midwives, veterinarians); clinical staff authorised by a licensed professional; and administrative personnel with appropriate access rights under an organisational account. Users must provide accurate professional credentials during registration.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s3_title">3. Patient Consent</h3>
                        <p data-i18n="usage_policy.s3_p1">Users are responsible for obtaining appropriate patient consent before recording consultations, in accordance with local laws and institutional policies. ClinixSummary provides patient-facing privacy notices and consent templates that can be adapted to your jurisdiction and practice setting.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s4_title">4. Prohibited Uses</h3>
                        <p data-i18n="usage_policy.s4_p1">You may not: (a) use the platform for any purpose other than clinical documentation and related healthcare workflows; (b) attempt to reverse-engineer, decompile or extract the underlying models or algorithms; (c) share, resell or sublicence access to the platform without authorisation; (d) use the platform to generate fraudulent documentation, upcoded claims or fabricated clinical records; (e) transmit malware, exploit vulnerabilities or interfere with platform security; (f) use the platform in a manner that violates HIPAA, GDPR or any applicable privacy law; (g) record individuals without appropriate consent.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s5_title">5. Clinical Responsibility</h3>
                        <p data-i18n="usage_policy.s5_p1">ClinixSummary is a documentation assistance tool, not a diagnostic or clinical decision-making system. All generated notes, codes and summaries must be reviewed, edited and approved by a qualified clinician before being used for clinical care, billing submission or legal purposes. The treating clinician retains full responsibility for the accuracy and appropriateness of all documentation submitted under their name.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s6_title">6. Content Standards</h3>
                        <p data-i18n="usage_policy.s6_p1">Users must ensure that all input audio is genuine clinical content. Do not use the platform for: test recordings containing fabricated patient scenarios for non-training purposes; recording non-clinical conversations; or any content that could be misleading if presented as clinical documentation.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s7_title">7. Account Security</h3>
                        <p data-i18n-html="usage_policy.s7_p1">Users are responsible for maintaining the security of their account credentials. Do not share login details with unauthorised individuals. Enable multi-factor authentication where available. Notify us immediately at <a href="mailto:security@clinixsummary.ai" style="color: var(--accent);">security@clinixsummary.ai</a> if you suspect unauthorised access to your account.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s8_title">8. Fair Use</h3>
                        <p data-i18n="usage_policy.s8_p1">Individual subscription plans are designed for single-clinician use. Sharing a single subscription across multiple clinicians is prohibited. Enterprise and organisational accounts must provision individual user accounts for each authorised user. Automated or programmatic abuse of the platform (e.g. bulk API calls exceeding reasonable clinical use) may result in account throttling or suspension.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="usage_policy.s9_title">9. Enforcement</h3>
                        <p data-i18n="usage_policy.s9_p1">Violations of this Usage Policy may result in: a warning notification; temporary suspension of platform access; permanent account termination; and/or referral to the appropriate regulatory or law enforcement authority. We will provide reasonable notice and an opportunity to remedy non-wilful violations before taking enforcement action.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="usage_policy.s10_title">10. Reporting Violations</h3>
                        <p data-i18n-html="usage_policy.s10_p1">If you become aware of any misuse of the ClinixSummary platform, please report it to <a href="mailto:compliance@clinixsummary.ai" style="color: var(--accent);">compliance@clinixsummary.ai</a>. Reports are treated confidentially.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function BAAPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="common.legal">Legal</span>
                    <h2 class="subpage-title" data-i18n="baa.title">Business Associate Agreement</h2>
                    <p class="subpage-copy" data-i18n="baa.intro">Last updated: 1 January 2026. This Business Associate Agreement (\u201cBAA\u201d) is entered into between the Covered Entity (\u201cYou\u201d) and GATMEDI Ltd, trading as ClinixSummary (\u201cBusiness Associate\u201d, \u201cwe\u201d, \u201cus\u201d).</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3 data-i18n="baa.s1_title">1. Definitions</h3>
                        <p data-i18n-html="baa.s1_p1"><strong>\u201cBusiness Associate\u201d</strong> means GATMEDI Ltd, which creates, receives, maintains or transmits Protected Health Information on behalf of the Covered Entity in connection with the ClinixSummary platform. <strong>\u201cCovered Entity\u201d</strong> means the healthcare provider, health plan or healthcare clearinghouse that enters into this BAA. <strong>\u201cProtected Health Information\u201d (PHI)</strong> means individually identifiable health information as defined under 45 CFR \u00a7 160.103. <strong>\u201cElectronic PHI\u201d (ePHI)</strong> means PHI that is created, received, maintained or transmitted in electronic form.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="baa.s2_title">2. Obligations of Business Associate</h3>
                        <p data-i18n="baa.s2_p1">Business Associate agrees to: (a) not use or disclose PHI other than as permitted by this BAA or as required by law; (b) implement administrative, physical and technical safeguards to protect ePHI; (c) report any Security Incident or Breach of Unsecured PHI to Covered Entity within 72 hours of discovery; (d) make PHI available to Covered Entity to fulfil data subject access requests; (e) make its internal practices and records relating to PHI available for audit; (f) return or destroy all PHI upon termination where feasible.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="baa.s3_title">3. Permitted Uses and Disclosures</h3>
                        <p data-i18n="baa.s3_p1">Business Associate may use and disclose PHI solely for the purpose of providing the ClinixSummary clinical documentation service to the Covered Entity, and as required by law. Business Associate shall not use PHI for marketing, sale, or any purpose other than service delivery without prior written consent.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="baa.s4_title">4. Safeguards</h3>
                        <p data-i18n="baa.s4_p1">Business Associate maintains the following safeguards to protect ePHI: AES-256 encryption at rest; TLS 1.2+ encryption in transit; SOC 2-aligned administrative and technical controls; role-based access controls and audit logging; immediate and permanent deletion of audio recordings upon note generation; regular penetration testing and vulnerability assessments.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="baa.s5_title">5. Breach Notification</h3>
                        <p data-i18n="baa.s5_p1">Business Associate shall notify the Covered Entity within 72 hours of discovering a Breach of Unsecured PHI. Notification shall include: the nature and extent of the PHI involved; the identity of any unauthorised person who accessed or used the PHI; whether the PHI was actually acquired or viewed; and the corrective actions taken or planned.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="baa.s6_title">6. Term and Termination</h3>
                        <p data-i18n="baa.s6_p1">This BAA remains in effect for the duration of the underlying service agreement between the parties. Either party may terminate this BAA if the other party materially breaches its obligations and fails to cure the breach within 30 days of written notice. Upon termination, Business Associate shall return or destroy all PHI in its possession. If return or destruction is not feasible, Business Associate shall extend the protections of this BAA to any retained PHI.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="baa.s7_title">7. Return or Destruction of PHI</h3>
                        <p data-i18n="baa.s7_p1">Upon termination of this BAA, Business Associate shall, at the Covered Entity\u2019s election, return or destroy all PHI received from or created on behalf of the Covered Entity. Business Associate shall retain no copies of PHI except where required by law. Destruction shall be carried out using methods consistent with NIST SP 800-88 guidelines.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="baa.s8_title">8. Contact</h3>
                        <p data-i18n-html="baa.s8_p1">For questions about this BAA or to request execution, contact <a href="mailto:compliance@clinixsummary.ai" style="color: var(--accent);">compliance@clinixsummary.ai</a>.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function DPAPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="common.legal">Legal</span>
                    <h2 class="subpage-title" data-i18n="dpa.title">Data Processing Agreement</h2>
                    <p class="subpage-copy" data-i18n="dpa.intro">Last updated: 1 January 2026. This Data Processing Agreement (\u201cDPA\u201d) forms part of the agreement between GATMEDI Ltd, trading as ClinixSummary (\u201cProcessor\u201d, \u201cwe\u201d, \u201cus\u201d) and the entity using our services (\u201cController\u201d, \u201cYou\u201d), pursuant to the UK GDPR and EU GDPR.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3 data-i18n="dpa.s1_title">1. Scope and Purpose of Processing</h3>
                        <p data-i18n="dpa.s1_p1">The Processor processes personal data on behalf of the Controller solely for the purpose of providing the ClinixSummary AI clinical documentation service. Processing activities include: receiving and processing audio recordings of clinical encounters; generating structured clinical notes, transcripts and codes; storing generated documentation in the Controller\u2019s account; and processing account and billing information.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s2_title">2. Types of Personal Data</h3>
                        <p data-i18n-html="dpa.s2_p1"><strong>Account Information.</strong> Name, email address, professional credentials, organisation name and billing details. <strong>Audio Recordings.</strong> Recordings of clinical encounters, which are immediately and permanently deleted upon note generation. <strong>Clinical Notes.</strong> AI-generated clinical documentation including transcripts, structured notes, codes and referral letters. <strong>Usage Analytics.</strong> Anonymised, non-PHI usage data (feature usage, session duration, error logs).</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s3_title">3. Data Subject Categories</h3>
                        <p data-i18n="dpa.s3_p1">Data subjects include: (a) healthcare professionals who use the ClinixSummary platform; and (b) patients whose clinical encounters are documented through the service. Patient data is processed solely as part of the clinical documentation generated from audio input.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s4_title">4. Controller and Processor Obligations</h3>
                        <p data-i18n="dpa.s4_p1">The Controller shall: ensure a lawful basis for processing; provide clear notice to data subjects; and issue documented instructions for processing. The Processor shall: process personal data only on documented instructions from the Controller; ensure personnel are bound by confidentiality obligations; implement appropriate technical and organisational measures; assist the Controller with data subject rights requests; and delete or return all personal data upon termination.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s5_title">5. Sub-processor Management</h3>
                        <p data-i18n-html="dpa.s5_p1">The Processor engages sub-processors to assist in providing the service. A current list of sub-processors is published on our <a href="/security" style="color: var(--accent);">Trust Center</a>. The Processor shall provide the Controller with at least 30 days\u2019 prior written notice before engaging a new sub-processor. All sub-processors are bound by data protection obligations no less protective than those in this DPA.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s6_title">6. International Data Transfers</h3>
                        <p data-i18n="dpa.s6_p1">Where personal data is transferred outside the UK or EEA, the Processor shall ensure appropriate safeguards are in place, including the use of Standard Contractual Clauses (SCCs) as approved by the European Commission and/or the UK Information Commissioner\u2019s Office. The Processor shall conduct transfer impact assessments where required.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s7_title">7. Technical and Organisational Measures</h3>
                        <p data-i18n="dpa.s7_p1">The Processor maintains the following measures to protect personal data: AES-256 encryption at rest; TLS 1.2+ encryption in transit; role-based access controls with least-privilege principles; comprehensive audit logging of all data access; regular penetration testing and vulnerability assessments; immediate and permanent deletion of audio upon note generation; and incident response procedures.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s8_title">8. Data Subject Rights</h3>
                        <p data-i18n="dpa.s8_p1">The Processor shall assist the Controller in responding to data subject requests including: access, rectification, erasure, restriction of processing, data portability, and objection. The Processor shall respond to Controller instructions regarding data subject requests without undue delay.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s9_title">9. Audit Rights</h3>
                        <p data-i18n="dpa.s9_p1">The Controller has the right to conduct audits of the Processor\u2019s data processing activities, including inspections, to verify compliance with this DPA. Audits shall be conducted no more than once annually, with at least 30 days\u2019 prior written notice. The Processor shall make available all information necessary to demonstrate compliance.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s10_title">10. Breach Notification</h3>
                        <p data-i18n="dpa.s10_p1">The Processor shall notify the Controller without undue delay, and in any event within 72 hours, after becoming aware of a personal data breach. Notification shall include: the nature of the breach; the categories and approximate number of data subjects affected; the likely consequences; and the measures taken or proposed to address the breach.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="dpa.s11_title">11. Term and Duration</h3>
                        <p data-i18n="dpa.s11_p1">This DPA remains in effect for the duration of the underlying service agreement. Upon termination, the Processor shall, at the Controller\u2019s election, delete or return all personal data and certify deletion in writing, unless retention is required by applicable law.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="dpa.s12_title">12. Contact</h3>
                        <p data-i18n-html="dpa.s12_p1">For questions about this DPA or to request execution, contact our Data Protection Officer at <a href="mailto:dpo@clinixsummary.ai" style="color: var(--accent);">dpo@clinixsummary.ai</a>.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function TermsPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="common.legal">Legal</span>
                    <h2 class="subpage-title" data-i18n="terms.title">Terms of Service</h2>
                    <p class="subpage-copy" data-i18n="terms.intro">Last updated: 1 January 2026. These Terms of Service (\u201cTerms\u201d) govern your use of the ClinixSummary platform and services provided by GATMEDI Ltd (\u201cClinixSummary\u201d, \u201cwe\u201d, \u201cour\u201d, \u201cus\u201d). By accessing or using the service, you agree to be bound by these Terms.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <h3 data-i18n="terms.s1_title">1. Acceptance of Terms</h3>
                        <p data-i18n="terms.s1_p1">By creating an account or using ClinixSummary, you confirm that you have read, understood and agree to these Terms, our Privacy Policy and our Usage Policy. If you do not agree, you must not use the service. We may update these Terms from time to time; material changes will be communicated at least 30 days in advance.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s2_title">2. Service Description</h3>
                        <p data-i18n="terms.s2_p1">ClinixSummary is an AI-assisted clinical documentation platform that generates structured clinical notes, transcripts, codes and referral letters from audio input. The service is designed for use by licensed healthcare professionals. ClinixSummary is not a medical device and does not provide clinical advice, diagnosis or treatment recommendations.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s3_title">3. Account Registration and Security</h3>
                        <p data-i18n-html="terms.s3_p1">You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must notify us immediately at <a href="mailto:security@clinixsummary.ai" style="color: var(--accent);">security@clinixsummary.ai</a> if you suspect unauthorised access. We reserve the right to suspend accounts that violate these Terms.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s4_title">4. Subscription Plans and Billing</h3>
                        <p data-i18n="terms.s4_p1">ClinixSummary operates on a credit-based subscription model. Each plan includes a monthly allocation of credits (1 credit = 10 minutes of audio documentation). Subscriptions renew automatically at the end of each billing period unless cancelled. You may cancel at any time; cancellation takes effect at the end of the current billing period. Unused credits do not roll over. Refunds are not provided for partial billing periods.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s5_title">5. Acceptable Use</h3>
                        <p data-i18n="terms.s5_p1">You agree to use ClinixSummary solely for legitimate clinical documentation purposes. You are responsible for: obtaining appropriate patient consent before recording; reviewing and approving all AI-generated outputs before clinical use; ensuring all documentation submitted under your name is accurate and complete. ClinixSummary is a documentation assistance tool, not a substitute for clinical judgement. The treating clinician retains full responsibility for all clinical decisions and documentation.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s6_title">6. Intellectual Property</h3>
                        <p data-i18n="terms.s6_p1">You retain all rights, title and interest in your clinical data, transcripts and generated documentation. GATMEDI Ltd retains all intellectual property rights in the ClinixSummary platform, including its algorithms, models, interfaces, designs and documentation. You may not copy, modify, reverse-engineer, decompile or create derivative works of the platform.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s7_title">7. Limitation of Liability</h3>
                        <p data-i18n="terms.s7_p1">To the maximum extent permitted by law, GATMEDI\u2019s total aggregate liability for any claims arising from or related to these Terms or the service shall not exceed the fees paid by you in the 12 months preceding the claim. GATMEDI shall not be liable for any indirect, incidental, consequential, special or punitive damages, including loss of profits, data or business opportunity.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s8_title">8. Disclaimers</h3>
                        <p data-i18n="terms.s8_p1">The service is provided \u201cas is\u201d and \u201cas available\u201d without warranties of any kind, whether express or implied. ClinixSummary is not a substitute for professional clinical judgement. All AI-generated content is a draft that requires clinician review. GATMEDI does not guarantee uninterrupted, error-free or completely accurate service. GATMEDI is not liable for clinical decisions made based on platform outputs.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s9_title">9. Termination</h3>
                        <p data-i18n="terms.s9_p1">You may terminate your account at any time by contacting support or through your account settings. We may suspend or terminate your account if you breach these Terms, with notice where practicable. Upon termination, you may export your data within 30 days, after which all data is permanently deleted.</p>
                    </div>

                    <div class="text-group">
                        <h3 data-i18n="terms.s10_title">10. Governing Law</h3>
                        <p data-i18n="terms.s10_p1">These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
                    </div>

                    <div class="text-group" style="border-bottom: none;">
                        <h3 data-i18n="terms.s11_title">11. Contact</h3>
                        <p data-i18n-html="terms.s11_p1">For questions about these Terms, contact <a href="mailto:legal@clinixsummary.ai" style="color: var(--accent);">legal@clinixsummary.ai</a> or write to: GATMEDI Ltd, Legal Team, United Kingdom.</p>
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
                    <span class="kicker" data-i18n="contact.kicker">Get in Touch</span>
                    <h2 class="subpage-title" data-i18n="contact.title">Let\u2019s talk about your documentation needs.</h2>
                    <p class="subpage-copy" data-i18n="contact.desc">Whether you\u2019re a solo clinician exploring AI documentation or a health system looking for enterprise deployment, we\u2019re here to help.</p>
                </div>

                <div id="contact" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: flex-start;">
                    <div>
                        <h3 style="font-family: var(--font-serif); font-size: 24px; margin-bottom: 24px;" data-i18n="contact.channels_title">Contact channels</h3>

                        <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px;">
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">mail</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;" data-i18n="contact.general_label">General enquiries</div>
                                    <a href="mailto:contact@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">contact@clinixsummary.ai</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">corporate_fare</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;" data-i18n="contact.enterprise_label">Enterprise & organisations</div>
                                    <a href="mailto:enterprise@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">enterprise@clinixsummary.ai</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">work</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;" data-i18n="contact.careers_label">Careers</div>
                                    <a href="mailto:careers@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">careers@clinixsummary.ai</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">shield</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;" data-i18n="contact.privacy_label">Privacy & data protection</div>
                                    <a href="mailto:privacy@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">privacy@clinixsummary.ai</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent);">security</span>
                                <div>
                                    <div style="font-weight: 600; font-size: 15px;" data-i18n="contact.security_label">Security</div>
                                    <a href="mailto:security@clinixsummary.ai" style="font-size: 14px; color: var(--accent);">security@clinixsummary.ai</a>
                                </div>
                            </div>
                        </div>

                        <div style="background: var(--bg-subtle); padding: 24px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                            <h4 style="font-weight: 700; margin-bottom: 8px;" data-i18n="contact.follow_title">Follow us</h4>
                            <div style="display: flex; gap: 16px; margin-top: 12px;">
                                <a href="https://www.facebook.com/clinixsummary" target="_blank" rel="noopener" style="color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 6px;"><span style="font-weight: 700;">f</span> Facebook</a>
                                <a href="https://x.com/clinixsummary" target="_blank" rel="noopener" style="color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 6px;"><span style="font-weight: 700;">&#x1D54F;</span> X</a>
                                <a href="https://www.linkedin.com/company/clinixsummary" target="_blank" rel="noopener" style="color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 6px;"><span style="font-weight: 700;">in</span> LinkedIn</a>
                            </div>
                        </div>
                    </div>

                    <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 36px; box-shadow: 0 8px 24px rgba(0,0,0,0.06);">
                        <h3 style="font-family: var(--font-serif); font-size: 22px; margin-bottom: 24px;" data-i18n="contact.form_title">Send us a message</h3>
                        <form id="contact-form" onsubmit="submitContactForm(event)">
                            <div class="form-group">
                                <label for="contact-name" data-i18n="contact.name_label">Full Name *</label>
                                <input type="text" id="contact-name" name="name" required placeholder="Dr. Jane Smith">
                            </div>
                            <div class="form-group">
                                <label for="contact-email" data-i18n="contact.email_label">Email Address *</label>
                                <input type="email" id="contact-email" name="email" required placeholder="jane.smith@clinic.com">
                            </div>
                            <div class="form-group">
                                <label for="contact-org" data-i18n="contact.org_label">Organisation</label>
                                <input type="text" id="contact-org" name="organization" placeholder="Hospital / Practice name">
                            </div>
                            <div class="form-group">
                                <label for="contact-topic" data-i18n="contact.topic_label">Topic</label>
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
                                <label for="contact-message" data-i18n="contact.message_label">Message *</label>
                                <textarea id="contact-message" name="message" required rows="4" placeholder="Tell us about your documentation needs..."></textarea>
                            </div>
                            <button type="submit" class="btn-primary" style="width: 100%; text-align: center; justify-content: center; padding: 14px; font-size: 15px; font-weight: 600;" data-i18n="contact.submit_btn">
                                Send Message
                            </button>
                            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 12px; text-align: center;" data-i18n="contact.submit_note">This will open your email client with the form details pre-filled.</p>
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
                        <a href="/contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function LeafletPage() {
    const langs = [
        { code: 'en', native: 'English', flag: 'English' },
        { code: 'fr', native: 'Français', flag: 'French' },
        { code: 'es', native: 'Español', flag: 'Spanish' },
        { code: 'pt', native: 'Português', flag: 'Portuguese' },
        { code: 'it', native: 'Italiano', flag: 'Italian' },
        { code: 'ar', native: 'العربية', flag: 'Arabic' }
    ];

    const cards = langs.map(l => `
        <a href="assets/leaflets/patient-privacy-notice-${l.code}.pdf" download class="card" style="text-decoration: none; display: flex; align-items: center; gap: 16px; cursor: pointer;">
            <span class="material-symbols-rounded" style="font-size: 36px; color: var(--accent);">download</span>
            <div>
                <h3 style="margin-bottom: 2px;">${l.native}</h3>
                <p style="margin: 0;">${l.flag} &middot; PDF</p>
            </div>
        </a>
    `).join('');

    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="security.resources_kicker">Clinic Resources</span>
                    <h2 class="subpage-title" data-i18n="leaflet.page_title">Patient Privacy Notice</h2>
                    <p class="subpage-copy" data-i18n="leaflet.subtitle">A printable leaflet for your waiting room or consultation area.</p>
                </div>

                <p class="section-copy" style="margin-bottom: 32px;" data-i18n="leaflet.all_languages">Available in all languages</p>

                <div class="grid-3">
                    ${cards}
                </div>

                <div style="margin-top: 48px; padding: 24px; background: var(--bg-subtle); border-radius: 12px; border: 1px solid var(--border-subtle);">
                    <p style="font-size: 14px; color: var(--text-secondary); margin: 0;">
                        <span class="material-symbols-rounded" style="font-size: 18px; vertical-align: middle; margin-right: 6px; color: var(--accent);">info</span>
                        <span data-i18n="security.resources_desc">Download our printable patient privacy leaflet to display in your waiting room or consultation area. It explains how AI documentation works, what happens to the recording, and reassures patients about their privacy.</span>
                    </p>
                </div>
            </div>
        </section>
    `;
}

