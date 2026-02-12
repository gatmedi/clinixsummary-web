// --- Home Page Sections ---

const HeroSection = `
    <section class="hero">
        <div class="page-width">
            <div class="hero-layout">
                <div class="hero-content">
                    <span class="kicker" style="color: #4b88d3;" data-i18n="hero.kicker">AI medical scribe for modern clinicians</span>
                    <h1 data-i18n="hero.title">Voice in. Meticulous notes out.</h1>
                    <p class="hero-subtitle" data-i18n="hero.description">ClinixSummary turns every consultation into structured, billing\u2011ready documentation \u2013 in seconds \u2013 so you can reclaim your time for patients, not paperwork.</p>

                    <div style="margin-top: 32px; max-width: 400px; background: #fff; padding: 32px; border-radius: 16px; border: 1px solid var(--border-subtle); box-shadow: 0 8px 24px rgba(0,0,0,0.06);">
                        <h3 style="font-family: var(--font-serif); font-size: 20px; margin-bottom: 12px;" data-i18n="hero.try_title">Try it now</h3>
                        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.5;" data-i18n="hero.try_desc">No sign-up required. Open the console and experience ClinixSummary with a free trial \u2013 start documenting in seconds.</p>
                        <button class="btn-primary" style="width: 100%; justify-content: center; border-radius: 8px; font-weight: 600; padding: 12px;" onclick="showToast('Opening console...'); return false;" data-i18n="hero.try_cta">Go to Console</button>
                    </div>

                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-value" data-i18n="hero.stat_time">2+ hrs</span>
                            <span class="stat-label" data-i18n="hero.stat_time_label">Saved daily</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" data-i18n="hero.stat_burnout">74%</span>
                            <span class="stat-label" data-i18n="hero.stat_burnout_label">Less burnout</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" data-i18n="hero.stat_hipaa">HIPAA</span>
                            <span class="stat-label" data-i18n="hero.stat_hipaa_label">Compliant</span>
                        </div>
                    </div>
                </div>

                <div class="hero-image-container">
                     <div class="hero-image-wrapper">
                        <img
                            src="images/hero-clinician.jpg"
                            alt="Clinician using tablet for documentation"
                            class="hero-photo"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const CoreArchitectureSection = `
    <section>
        <div class="page-width">
            <div class="section-header">
                <span class="kicker" data-i18n="core.kicker">The Core AI Architecture</span>
                <h2 class="section-title" data-i18n="core.title">Built on Kaizen & Contextual Reasoning.</h2>
                <p class="section-copy" data-i18n="core.description">Inspired by Kaizen (\u201cchange for the better\u201d), ClinixSummary is continuously refined through careful clinical review and quality assurance. During each session, our modules uses contextual reasoning to generate structured notes that fit the specialty and the encounter.</p>
            </div>

            <div class="grid-3">
                <div class="card">
                    <div class="card-icon material-symbols-rounded">neurology</div>
                    <h3 data-i18n="core.llm_title">Clinical LLMs (The Core)</h3>
                    <p data-i18n="core.llm_desc">Fine-tuned on vast amounts of de-identified clinical data to ensure surgical precision and terminology accuracy across all medical specialties and complex clinical narratives.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">trending_up</div>
                    <h3 data-i18n="core.efficiency_title">Built-in Efficiency</h3>
                    <p data-i18n="core.efficiency_desc">Our lean, high-performance architecture eliminates the need for expensive human scribe teams, delivering industry-leading accuracy at a fraction of the traditional operational cost.</p>
                </div>
            </div>
        </div>
    </section>
`;

const CapabilitiesSection = `
    <section style="background: var(--bg-subtle);">
        <div class="page-width">
            <div class="section-header">
                <span class="kicker" data-i18n="capabilities.kicker">Capabilities</span>
                <h2 class="section-title" data-i18n="capabilities.title">The gold standard for clinical documentation.</h2>
                <p class="section-copy" data-i18n="capabilities.description">ClinixSummary sets the gold standard for clinical documentation. From primary care to orthopaedics, dermatology, paediatrics and beyond \u2013 we capture the nuance of real\u2011world medicine while standardising the structure for continuity of care, coding, and billing.</p>
            </div>

            <div class="grid-3">
                <div class="card">
                    <div class="card-icon material-symbols-rounded">mic</div>
                    <h3 data-i18n="capabilities.transcription_title">Clinical\u2011grade transcription</h3>
                    <p data-i18n="capabilities.transcription_desc">High\u2011accuracy recognition of medical terminology, acronyms and abbreviations \u2013 even with accents and real\u2011world background noise.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">description</div>
                    <h3 data-i18n="capabilities.notes_title">Structured notes & letters</h3>
                    <p data-i18n="capabilities.notes_desc">Outputs ready\u2011to\u2011paste or push: notes, referral letters and patient instructions in seconds.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">medical_information</div>
                    <h3 data-i18n="capabilities.coding_title">ICD\u201110 & CPT coding</h3>
                    <p data-i18n="capabilities.coding_desc">Generate codes that support cleaner claims, fewer queries and better analytics.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">headphones</div>
                    <h3 data-i18n="capabilities.ambient_title">Ambient & post\u2011visit capture</h3>
                    <p data-i18n="capabilities.ambient_desc">Record consultations ambiently or via quick dictation \u2013 whichever suits your consultation best.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">neurology</div>
                    <h3 data-i18n="capabilities.reasoning_title">Contextual Reasoning Engine</h3>
                    <p data-i18n="capabilities.reasoning_desc">Our advanced modules infers context and ensures clinically useful, billable documentation at the point of care including differential diagnosis.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">gavel</div>
                    <h3 data-i18n="capabilities.legal_title">Medical legal & reimbursement ready</h3>
                    <p data-i18n="capabilities.legal_desc">Accurate & meticulous documentation reduces malpractice risk and improves reimbursement accuracy.</p>
                </div>
            </div>
        </div>
    </section>
`;

const OutcomesSection = `
    <section>
        <div class="page-width">
            <div class="section-header">
                <span class="kicker" data-i18n="outcomes.kicker">Outcomes & benefits</span>
                <h2 class="section-title" data-i18n="outcomes.title">Instant quantifiable impact</h2>
                <p class="section-copy" data-i18n="outcomes.description">ClinixSummary delivers gold-standard documentation that improves the patient encounter, slashes documentation time and boosts reimbursement accuracy.</p>
            </div>

            <div class="grid-3">
                <div class="card">
                    <div class="card-icon material-symbols-rounded">sentiment_satisfied</div>
                    <h3 data-i18n="outcomes.satisfaction_title">Higher patient satisfaction</h3>
                    <p data-i18n="outcomes.satisfaction_desc">In one large study, 47% of patients said their doctor spent less time looking at the computer, and 39% said their doctor spent more time speaking directly to them. Clinicians reported an 84% positive effect on patient interactions.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">timer</div>
                    <h3 data-i18n="outcomes.cognitive_title">Reduce cognitive overload</h3>
                    <p data-i18n="outcomes.cognitive_desc">ClinixSummary reduce note taking time by up to 2 hours per day and lowers the odds of clinician burnout by 74%. With technology fading into the background, care comes to the foreground.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">payments</div>
                    <h3 data-i18n="outcomes.revenue_title">Cleaner claims & revenue</h3>
                    <p data-i18n="outcomes.revenue_desc">Accurate notes mean fewer coding errors, fewer denials, faster submission, and stronger reimbursement.</p>
                </div>
            </div>
        </div>
    </section>
`;

const CalculatorSection = `
    <section id="roi-calculator" style="padding-top: 48px; padding-bottom: 48px;">
        <div class="page-width">
            <div class="section-header" style="text-align: center; margin-left: auto; margin-right: auto; margin-bottom: 40px;">
                <span class="kicker" data-i18n="calculator.kicker">Value Projection</span>
                <h2 class="section-title" data-i18n="calculator.title">Calculate your annual ROI.</h2>
                <p class="section-copy" style="margin-left: auto; margin-right: auto;" data-i18n="calculator.description">See exactly how much time and money ClinixSummary saves you based on your practice\u2019s metrics.</p>
            </div>

            <div class="calculator-container">
                <div>
                    <div class="calculator-input-group">
                        <label for="annual-salary" data-i18n="calculator.salary_label">Median Annual Salary per Clinician (USD)</label>
                        <span id="annual-salary-display" class="slider-display">$250,000</span>
                        <input type="range" id="annual-salary" value="250000" min="50000" max="500000" step="10000" oninput="updateDisplay(this); calculateSavings();">
                    </div>

                    <div class="calculator-input-group">
                        <label for="num-clinicians" data-i18n="calculator.clinicians_label">Number of Clinicians</label>
                        <span id="num-clinicians-display" class="slider-display">1 Clinician</span>
                        <input type="range" id="num-clinicians" value="1" min="1" max="50" step="1" oninput="updateDisplay(this); calculateSavings();">
                    </div>

                    <div class="calculator-input-group">
                        <label for="work-days" data-i18n="calculator.workdays_label">Median Work Days per Year (per clinician)</label>
                        <span id="work-days-display" class="slider-display">250 Days</span>
                        <input type="range" id="work-days" value="250" min="150" max="300" step="5" oninput="updateDisplay(this); calculateSavings();">
                    </div>

                    <div class="calculator-input-group">
                        <label for="daily-minutes-saved" data-i18n="calculator.minutes_label">Minutes Saved per Day (ClinixSummary Impact)</label>
                        <div class="fixed-value" data-i18n="calculator.minutes_value">120 Minutes (2 Hours - Industry Estimate)</div>
                        <input type="hidden" id="daily-minutes-saved" value="120">
                    </div>

                    <p class="result-subtext" style="color: var(--text-primary); font-weight: 500;" data-i18n="calculator.workday_note">
                        *Calculations assume an 8-hour workday.
                    </p>
                </div>

                <div class="calculator-results">
                    <div class="calculator-result-item">
                        <span class="material-symbols-rounded result-icon">beach_access</span>
                        <div class="result-label" data-i18n="calculator.time_saved_label">Total Annual Time Saved</div>
                        <div id="annual-hours-saved" class="result-value">500 hrs</div>
                        <div class="result-subtext" data-i18n="calculator.time_saved_desc">Equivalent to 62 extra workdays regained across the team.</div>
                    </div>

                    <div class="calculator-result-item">
                        <span class="material-symbols-rounded result-icon">currency_exchange</span>
                        <div class="result-label" data-i18n="calculator.money_saved_label">Total Annual Monetary Savings</div>
                        <div id="monetary-savings" class="result-value">$31,250</div>
                        <div class="result-subtext" data-i18n="calculator.money_saved_desc">Reclaim this value by focusing on revenue-generating tasks.</div>
                    </div>

                    <div class="calculator-result-item">
                        <span class="material-symbols-rounded result-icon">handshake</span>
                        <div class="result-label" data-i18n="calculator.patient_focus_label">Patient-Centric Focus</div>
                        <div id="patient-centric-value" class="result-value" data-i18n="calculator.patient_focus_value">90% More Patient-Centric</div>
                        <div class="result-subtext" data-i18n="calculator.patient_focus_desc">Clinicians report significantly higher patient engagement scores and satisfaction.</div>
                    </div>

                    <div class="calculator-result-item" style="border-bottom: none;">
                        <div class="result-label" data-i18n="calculator.burnout_label">Burnout & Cognitive Load</div>
                        <span class="material-symbols-rounded result-icon" style="font-size: 36px !important; color: white !important;">sentiment_satisfied</span>
                        <div id="cognitive-load-value" class="result-value" style="color: white; font-family: var(--font-sans); font-size: 24px;" data-i18n="calculator.burnout_value">78% Less Cognitive Load</div>
                        <div class="result-subtext" data-i18n="calculator.burnout_desc">This frees up mental energy, contributing to documented improvement in professional fulfillment.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const PricingSection = `
    <section class="pricing-section" id="pricing" style="padding-top: 96px;">
        <div class="page-width">
            <div class="section-header" style="text-align: center; margin-left: auto; margin-right: auto;">
                <span class="kicker" data-i18n="pricing.kicker">Pricing</span>
                <h2 class="section-title" data-i18n="pricing.title">Transparent plans for every practice.</h2>
                <p class="section-copy" style="margin-left: auto; margin-right: auto;" data-i18n="pricing.description">Choose a plan aligned with your encounters and documentation volume. All plans include access to the same core AI engine \u2013 you only pay for usage.</p>
                <div style="margin-top: 20px; padding: 12px 24px; background: rgba(59, 197, 214, 0.1); border-radius: 8px; display: inline-block;">
                    <span style="font-size: 15px; font-weight: 600; color: var(--text-primary);" data-i18n="pricing.credit_explainer">1 credit = 10 minutes of audio documentation</span>
                </div>
            </div>

            <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">

                <div class="pricing-card">
                    <div class="plan-name">Forever Free</div>
                    <div class="plan-price">$0 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.free_credits">50 credits / month</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.free_f1">Full access to the console</li>
                        <li data-i18n="pricing.free_f3">No credit card required</li>
                        <li style="color: var(--text-secondary); opacity: 0.7;" data-i18n="pricing.free_f4">Limited specialty access</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Get started with Free plan!'); return false;" data-i18n="pricing.free_cta">Get Started</button>
                </div>

                <div class="pricing-card">
                    <div class="plan-name">Pilot 900</div>
                    <div class="plan-price">$9.99 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.pilot_credits">75 credits / month</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.cancel_anytime">Cancel anytime</li>
                        <li data-i18n="pricing.pilot_f4">Standard specialty access</li>
                        <li data-i18n="pricing.pilot_f5">Community support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Subscribing to Pilot 900.'); return false;" data-i18n="pricing.pilot_cta">Subscribe</button>
                </div>

                <div class="pricing-card">
                    <div class="plan-name">Pioneer 1800</div>
                    <div class="plan-price">$18.99 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.pioneer_credits">150 credits / month</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.cancel_anytime">Cancel anytime</li>
                        <li data-i18n="pricing.pioneer_f4">All specialty access</li>
                        <li data-i18n="pricing.pioneer_f5">Email support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Subscribing to Pioneer 1800.'); return false;" data-i18n="pricing.pioneer_cta">Subscribe</button>
                </div>

                <div class="pricing-card featured" style="border-color: #4b88d3;">
                    <div style="margin-bottom: 8px;"><span class="beta-tag" style="background: #E8F5FF; color: #4b88d3; font-weight: 700;" data-i18n="pricing.most_popular">Most Popular</span></div>
                    <div class="plan-name">Productive 3000</div>
                    <div class="plan-price">$29.99 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.productive_credits">250 credits / month</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.cancel_anytime">Cancel anytime</li>
                        <li data-i18n="pricing.productive_f4">All specialty access</li>
                        <li data-i18n="pricing.productive_f5">Priority email support</li>
                    </ul>
                    <button class="btn-primary" style="width: 100%;" onclick="showToast('Subscribing to Productive 3000.'); return false;" data-i18n="pricing.productive_cta">Subscribe</button>
                </div>

                <div class="pricing-card">
                    <div class="plan-name">Prolific 6000</div>
                    <div class="plan-price">$49.99 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.prolific_credits">500 credits / month</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.cancel_anytime">Cancel anytime</li>
                        <li data-i18n="pricing.prolific_f4">All specialty access</li>
                        <li data-i18n="pricing.prolific_f3">Dedicated API access</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Subscribing to Prolific 6000.'); return false;" data-i18n="pricing.prolific_cta">Subscribe</button>
                </div>

                <div class="pricing-card">
                    <div class="plan-name">Plan Enterprise</div>
                    <div class="plan-price">Custom</div>
                    <p class="plan-period" data-i18n="pricing.enterprise_credits">Custom credits</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.enterprise_f4">Custom integrations and rollout support</li>
                        <li data-i18n="pricing.enterprise_f5">Dedicated success manager</li>
                        <li data-i18n="pricing.enterprise_f2">Ambient mode & team workflows</li>
                    </ul>
                    <a href="#contact" class="btn-primary" style="width: 100%; text-align: center; background-color: var(--accent); color: var(--text-primary);" onclick="setTimeout(function(){ var sel = document.getElementById('contact-topic'); if(sel) sel.value='Enterprise Licensing'; }, 200);" data-i18n="pricing.enterprise_cta">Contact sales</a>
                </div>
            </div>

            <div style="text-align: center; margin-top: 40px; font-size: 14px; color: var(--text-secondary);" data-i18n="pricing.enterprise_question">
                Looking for Enterprise or Organizational licensing?
            </div>
        </div>
    </section>
`;

function HomePage() {
    return HeroSection + CoreArchitectureSection + CalculatorSection + CapabilitiesSection + OutcomesSection + PricingSection;
}
