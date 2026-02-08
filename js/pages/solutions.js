// --- Solutions Pages ---

function CliniciansPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="clinicians.kicker">For Private & Solo Practice</span>
                    <h2 class="subpage-title" data-i18n="clinicians.title">Reclaim Your Practice: Focused Care, Zero Paperwork.</h2>
                    <p class="subpage-copy" data-i18n="clinicians.description">ClinixSummary is your dedicated partner against administrative fatigue. Designed for the clinician who values patient time above all else, our AI scribe allows you to focus 100% on the consultation while ensuring your documentation, coding, and billing are immaculate.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">sentiment_satisfied</span>
                        <h3 data-i18n="clinicians.relationship_title">Patient Relationship Restoration</h3>
                        <p data-i18n="clinicians.relationship_desc">Stop the documentation drain and restore true eye contact and engagement with your patients. With ambient AI, the computer fades into the background, and the therapeutic relationship comes to the foreground.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">visibility</span> <span data-i18n="clinicians.relationship_b1">Zero screen time during the encounter.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">schedule</span> <span data-i18n="clinicians.relationship_b2">Reclaim 2+ hours per day for yourself or for clinical work.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">family_restroom</span> <span data-i18n="clinicians.relationship_b3">Reduce risk of burnout and enhance work-life balance.</span></li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">payments</span>
                        <h3 data-i18n="clinicians.revenue_title">Revenue Cycle Perfection</h3>
                        <p data-i18n="clinicians.revenue_desc">For solo practice, every dollar counts. Our AI is tuned to automatically suggest the most accurate and highest-fidelity ICD-10 and CPT codes based on the clinical narrative, reducing under-coding and claim denials.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">attach_money</span> <span data-i18n="clinicians.revenue_b1">Maximize reimbursement accuracy.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">description</span> <span data-i18n="clinicians.revenue_b2">Instant, error-free claims submissions.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">shield</span> <span data-i18n="clinicians.revenue_b3">Audit-proof notes ready for any review.</span></li>
                        </ul>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker" data-i18n="clinicians.efficiency_kicker">Personalized Efficiency</span>
                    <h3 class="section-title" data-i18n="clinicians.efficiency_title">One-touch integration with your EHR and style.</h3>
                    <p class="section-copy" data-i18n="clinicians.efficiency_desc">ClinixSummary adapts to you\u2014not the other way around. Your unique abbreviations, preferences, and note structure are learned and applied consistently across every single document.</p>
                </div>

                <div class="grid-4">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">tune</span> <span data-i18n="clinicians.adaptive_title">Adaptive Formatting</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="clinicians.adaptive_desc">Learns and applies your preferred SOAP, narrative, or specialized template.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">lock_person</span> <span data-i18n="clinicians.hipaa_title">HIPAA & GDPR Safe</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="clinicians.hipaa_desc">Secure, compliant, and ready to meet all global privacy standards.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">integration_instructions</span> <span data-i18n="clinicians.ehr_title">Easy EHR Paste</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="clinicians.ehr_desc">Direct copy/paste integration into all major (and custom) EHR systems.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">support_agent</span> <span data-i18n="clinicians.support_title">Dedicated Support</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="clinicians.support_desc">Quick support via email and chat for rapid resolution.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); color: var(--text-primary); text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;" data-i18n="clinicians.cta_title">Start Saving Time and Reclaiming Your Clinical Focus Today.</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Starting free trial for clinicians.'); return false;" data-i18n="clinicians.cta_trial">Start My Free Trial</a>
                        <a href="#roi-calculator" class="btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);" data-i18n="clinicians.cta_roi">Calculate My ROI</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function InsurersPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="insurers.kicker">For Insurance & Payer Organizations</span>
                    <h2 class="subpage-title" data-i18n="insurers.title">Drive Utilization Efficiency and Reduce Claims Complexity.</h2>
                    <p class="subpage-copy" data-i18n="insurers.description">ClinixSummary offers a powerful partnership to major payers. By ensuring provider documentation is standardized, verifiable, and precise at the source, we reduce manual review, minimize disputes, and accelerate the transition to value-based care models.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">auto_fix_high</span>
                        <h3 data-i18n="insurers.doc_title">Meticulous Documentation for Audit Readiness</h3>
                        <p data-i18n="insurers.doc_desc">Our AI platform guarantees every record adheres to the highest level of clinical and regulatory rigor (ICD-10/CPT guidelines, medical necessity). This meticulousness directly translates into reduced ambiguity during claims processing.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">fact_check</span> <span data-i18n="insurers.doc_b1">99% reduction in manual data entry errors.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">gavel</span> <span data-i18n="insurers.doc_b2">Built-in compliance engine for regulatory adherence.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">lock_reset</span> <span data-i18n="insurers.doc_b3">Enhanced audit trails for payor integrity programs.</span></li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">trending_up</span>
                        <h3 data-i18n="insurers.util_title">Utilization Management & Cost Reduction</h3>
                        <p data-i18n="insurers.util_desc">We streamline the information flow needed for Utilization Review and claims adjudication. Clear, structured SOAP notes allow for automated checks against medical policy criteria, cutting turnaround times and reducing administrative overhead.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">payments</span> <span data-i18n="insurers.util_b1">15% faster claims processing.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">analytics</span> <span data-i18n="insurers.util_b2">Better insights into provider practice patterns.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">handshake</span> <span data-i18n="insurers.util_b3">Improved provider network satisfaction due to fewer queries.</span></li>
                        </ul>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker" data-i18n="insurers.partner_kicker">Strategic Partnership</span>
                    <h3 class="section-title" data-i18n="insurers.partner_title">Co-development of clinical guidelines and quality metrics.</h3>
                    <p class="section-copy" data-i18n="insurers.partner_desc">Partner with ClinixSummary to co-develop custom AI modules that align directly with your internal medical policies, quality assurance protocols, and emerging value-based care initiatives.</p>
                </div>

                <div class="grid-4">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">model_training</span> <span data-i18n="insurers.template_title">Template Co-creation</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="insurers.template_desc">Tailored documentation templates enforced by AI standards.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">shield_with_house</span> <span data-i18n="insurers.security_title">Data Security & BAAs</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="insurers.security_desc">HIPAA-compliant infrastructure and Business Associate Agreements.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">network_check</span> <span data-i18n="insurers.ehr_title">EHR Interoperability</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="insurers.ehr_desc">Seamless data exchange with your existing payer systems.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">supervisor_account</span> <span data-i18n="insurers.pilot_title">Pilot Program Support</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="insurers.pilot_desc">Dedicated deployment and support for initial regional rollouts.</p>
                    </div>
                </div>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 20px;" data-i18n="insurers.cta_title">Ready to Transform Your Claims Processing?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#contact" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="showToast('Contacting sales for Insurer Partnership.'); return false;" data-i18n="insurers.cta_button">Request a Strategic Consultation</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function OrganizationsPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker" data-i18n="orgs.kicker">For Organisations</span>
                    <h2 class="subpage-title" data-i18n="orgs.title">Unlock productivity & satisfaction across your practice.</h2>
                    <p class="subpage-copy" data-i18n="orgs.description">ClinixSummary delivers measurable outcomes for clinics, groups and health systems. Our fine\u2011tuned AI saves hours per clinician, boosts patient satisfaction and reduces denied claims \u2013 all while integrating seamlessly into your existing workflows.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">model_training</span>
                        <h3 data-i18n="orgs.tech_title">Technology: Ambient, dictation & inference in one platform</h3>
                        <p data-i18n="orgs.tech_desc">ClinixSummary combines ambient capture, quick dictation and advanced inference to fit every workflow. Our AI infers clinical meaning from natural conversations \u2013 deducing context without fabricating facts.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">mic</span> <span data-i18n="orgs.ambient_b">Ambient capture: Hands\u2011free documentation.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">keyboard_voice</span> <span data-i18n="orgs.dictation_b">Rapid dictation: Narrate your assessment and plan.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">emoji_objects</span> <span data-i18n="orgs.inference_b">Inference engine: Infers context from captured facts.</span></li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">trending_up</span>
                        <h3 data-i18n="orgs.results_title">Proven results: Quantified impact at scale</h3>
                        <p data-i18n="orgs.results_desc">Research and real-world deployments show that ambient AI scribes dramatically improve operations for healthcare organisations.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">schedule</span> <span data-i18n="orgs.time_b">2+ hours saved per clinician.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">sentiment_satisfied</span> <span data-i18n="orgs.satisfaction_b">Higher satisfaction scores.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">payments</span> <span data-i18n="orgs.reimbursement_b">Reduced denials & faster reimbursement.</span></li>
                        </ul>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker" data-i18n="orgs.billing_kicker">Billing Capture</span>
                    <h3 class="section-title">Organisation-level billing assistance.</h3>
                    <p class="section-copy">ClinixSummary captures what was done during each encounter and maps it to your organisation's own CPT code library. Reduce coding errors, eliminate missed charges, and speed up claims \u2014 all tailored to your specific billing workflows.</p>
                </div>

                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">receipt_long</span> Activity Capture</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Captures procedures, services, and clinical activities performed during encounters.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">map</span> Code Mapping</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Maps to your organisation's specific CPT code library for accurate billing.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">speed</span> Faster Claims</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Eliminates missed charges and reduces time to claim submission.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">group</span> Team Management</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Multi-clinician deployment with team dashboards and usage analytics.</p>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker" data-i18n="orgs.why_kicker">Why Choose Us</span>
                    <h3 class="section-title" data-i18n="orgs.why_title">Built for enterprise healthcare.</h3>
                </div>

                <div class="grid-4">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">lock_open</span> <span data-i18n="orgs.sso_title">SSO & RBAC</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="orgs.sso_desc">Seamless sign\u2011in & fine\u2011grained permissions.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">fact_check</span> <span data-i18n="orgs.audit_title">Audit trails</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="orgs.audit_desc">Full activity logs for governance.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">deployed_code</span> <span data-i18n="orgs.multi_title">Multi\u2011disciplinary</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="orgs.multi_desc">Supports medical, dental, allied & veterinary teams.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">globe</span> <span data-i18n="orgs.global_title">Global availability</span></h4>
                        <p style="font-size: 13px; color: var(--text-secondary);" data-i18n="orgs.global_desc">Works in multiple languages & jurisdictions.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); color: var(--text-primary); text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;" data-i18n="orgs.cta_title">Ready to pilot ClinixSummary in your organisation?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Sign in to enterprise portal.'); return false;" data-i18n="orgs.cta_signin">Sign in to enterprise portal</a>
                        <a href="#contact" class="btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);" data-i18n="orgs.cta_sales">Speak to our sales team</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function GovernmentPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Public Sector & Federal Healthcare</span>
                    <h2 class="subpage-title">Clinical Documentation for Government Healthcare Systems.</h2>
                    <p class="subpage-copy">ClinixSummary meets the rigorous documentation standards of government healthcare. From VA hospitals and military medicine to public health systems, we deliver compliant, efficient, and standardised clinical documentation at scale.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">account_balance</span>
                        <h3>Government Compliance Standards</h3>
                        <p>Federal healthcare systems have unique documentation requirements. ClinixSummary is designed to meet government-grade security, compliance, and accessibility mandates while reducing the administrative burden on public sector clinicians.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">verified_user</span> HIPAA, GDPR, and FedRAMP-aligned security</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">description</span> Standardised documentation across departments</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">fact_check</span> Audit-ready records for government oversight</li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">local_hospital</span>
                        <h3>Purpose-Built for Public Health</h3>
                        <p>Whether it's a VA hospital, a military medical facility, or a county public health system, ClinixSummary adapts to the workflows and reporting requirements unique to government-funded healthcare delivery.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">military_tech</span> VA hospitals and military medicine</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">public</span> Public health systems and community clinics</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">analytics</span> Population health reporting and analytics</li>
                        </ul>
                    </div>
                </div>

                <div class="grid-3">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">shield</div>
                        <h3>Enterprise Security</h3>
                        <p>Government-grade encryption, role-based access controls, and comprehensive audit trails designed for the most demanding security environments.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">groups</div>
                        <h3>Large-Scale Deployment</h3>
                        <p>Proven infrastructure for deploying across hundreds of clinicians simultaneously with centralised management and monitoring.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">support_agent</div>
                        <h3>Dedicated Success Manager</h3>
                        <p>A dedicated point of contact to ensure successful rollout, training, and ongoing optimisation within your public health system.</p>
                    </div>
                </div>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Ready to modernise government healthcare documentation?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#contact" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="showToast('Contacting government sales team.'); return false;">Request a Government Consultation</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function NonprofitPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">For Non-profit Organisations</span>
                    <h2 class="subpage-title">Empowering Non-profit Healthcare with AI Documentation.</h2>
                    <p class="subpage-copy">Non-profit healthcare organisations face the same documentation challenges as commercial providers \u2014 often with fewer resources. ClinixSummary offers special pricing and dedicated support for qualifying non-profit organisations, and free access through the Clinix Foundation for those serving underserved communities.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">volunteer_activism</span>
                        <h3>Special Pricing for Non-profits</h3>
                        <p>We believe every clinician deserves access to tools that reduce documentation burden, regardless of the organisation's funding model. Qualifying non-profit healthcare organisations receive discounted access to ClinixSummary's full suite of features.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">favorite</span>
                        <h3>Clinix Foundation</h3>
                        <p>Through the <a href="#clinix-foundation" style="color: var(--accent); text-decoration: underline;">Clinix Foundation</a>, we provide completely free access to ClinixSummary for clinics and practices operating in relief areas and underserved communities. Our goal is to ensure that documentation burden is never a barrier to delivering quality care.</p>
                    </div>
                </div>

                <div class="grid-3">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">diversity_3</div>
                        <h3>Community Health Centres</h3>
                        <p>Support your clinicians with AI documentation tools that free up time for the patients and communities that need it most.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">public</div>
                        <h3>NGO Medical Facilities</h3>
                        <p>NGO-operated clinics and hospitals in humanitarian settings can apply for free access through the Clinix Foundation programme.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">school</div>
                        <h3>Teaching & Training</h3>
                        <p>Non-profit teaching hospitals and training centres benefit from documentation tools that help trainees learn proper clinical documentation practices.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); color: var(--text-primary); text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Explore non-profit pricing or apply for Clinix Foundation access.</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#clinix-foundation" class="btn-primary" style="background: var(--text-primary); color: white;">Apply for Clinix Foundation</a>
                        <a href="#contact" class="btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);" onclick="showToast('Requesting non-profit pricing.'); return false;">Request Non-profit Pricing</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function IntegrationsPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Organisation Feature</span>
                    <h2 class="subpage-title">Seamless Integration into Your EHR & EMR Systems.</h2>
                    <p class="subpage-copy">ClinixSummary integrates directly into your organisation's web-based EHR and EMR systems. Tailored to your specific workflows, our integration layer ensures that AI-generated documentation flows seamlessly into your existing clinical infrastructure.</p>
                </div>

                <div style="margin-bottom: 40px; padding: 16px 24px; background: rgba(59, 197, 214, 0.1); border-radius: 8px; display: inline-block;">
                    <span style="font-size: 14px; font-weight: 600; color: var(--text-primary);">This feature is available for organisation and enterprise plans only.</span>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">integration_instructions</span>
                        <h3>Tailored to Your Systems</h3>
                        <p>Every organisation has unique EHR/EMR configurations. Our integration team works directly with your IT department to build custom connectors that match your existing workflows \u2014 no disruption, no rip-and-replace.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">api</span> RESTful API access for enterprise customers</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">data_object</span> FHIR-compatible data formats</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">cloud</span> Cloud, hybrid, and on-premise deployment options</li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">support_agent</span>
                        <h3>Custom Integration Support</h3>
                        <p>Our dedicated integration team handles the technical complexity so your clinicians don't have to. From initial scoping to production deployment, we provide end-to-end support for a smooth integration experience.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">engineering</span> Dedicated integration engineer assigned</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">bug_report</span> Comprehensive testing and validation</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">headset_mic</span> Ongoing support and maintenance</li>
                        </ul>
                    </div>
                </div>

                <div class="grid-3">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">sync</div>
                        <h3>Bi-directional Sync</h3>
                        <p>Pull patient context from your EHR and push completed documentation back \u2014 in real time or batch mode.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">security</div>
                        <h3>Secure Data Pipeline</h3>
                        <p>All integration traffic is encrypted end-to-end with TLS 1.2+ and follows HIPAA-compliant data handling protocols.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">dashboard_customize</div>
                        <h3>Flexible Deployment</h3>
                        <p>Choose the deployment model that fits your infrastructure: fully cloud-hosted, hybrid, or on-premise.</p>
                    </div>
                </div>

                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Ready to integrate ClinixSummary into your systems?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#contact" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="showToast('Contacting integration team.'); return false;">Talk to Our Integration Team</a>
                        <a href="#organizations" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Learn About Enterprise Plans</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}
