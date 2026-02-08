// --- Other Pages: Security & Story ---

function SecurityPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Security, Compliance & QMS</span>
                    <h2 class="subpage-title">Protecting patient privacy by default.</h2>
                    <p class="subpage-copy">Safeguarding patient data is non\u2011negotiable. ClinixSummary employs industry\u2011standard encryption, strict access controls and short retention policies to give you confidence that your practice and your patients are protected.</p>
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
                        <p>We never store audio recordings long\u2011term. Once your note is generated, recordings are deleted automatically and you remain in control of your transcripts, which you can remove at any time.</p>
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
                    <h3 class="section-title">Short retention & granular control.</h3>
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
