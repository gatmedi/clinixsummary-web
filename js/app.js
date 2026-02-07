// --- Pricing Toggle Logic ---
function toggleMorePlans() {
    const hiddenPlans = document.querySelectorAll('.hidden-plan');
    const button = document.getElementById('toggle-plans-btn');
    const isHidden = hiddenPlans.length > 0 && hiddenPlans[0].style.display === 'none';

    hiddenPlans.forEach(plan => {
        plan.style.display = isHidden ? 'flex' : 'none';
    });

    button.textContent = isHidden ? t('pricing.hide_plans', 'Hide Additional Plans') : t('pricing.see_more', 'See 3 More Plans');
}

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize i18n first, then start router
    await I18n.init();
    router();
    window.addEventListener('hashchange', router);
});

// --- Global Utilities ---
const APP_CONTENT = document.getElementById('app-content');

function showToast(message) {
    const toastEl = document.getElementById('toast');
    toastEl.textContent = message;
    toastEl.classList.add('show');
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3500);
}

// --- Calculator Logic ---
function updateDisplay(slider) {
    const displayId = slider.id + '-display';
    const displayElement = document.getElementById(displayId);

    if (displayElement) {
        let value = parseInt(slider.value);
        if (slider.id === 'annual-salary') {
            displayElement.textContent = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        } else if (slider.id === 'work-days') {
            displayElement.textContent = `${value} Days`;
        } else if (slider.id === 'num-clinicians') {
            displayElement.textContent = `${value} Clinician${value > 1 ? 's' : ''}`;
        }
    }
}

function calculateSavings() {
    const salaryInput = document.getElementById('annual-salary');
    const workDaysInput = document.getElementById('work-days');
    const numCliniciansInput = document.getElementById('num-clinicians');

    const dailyMinutesSaved = 120;

    if (!salaryInput || !workDaysInput || !numCliniciansInput) return;

    const annualHoursElement = document.getElementById('annual-hours-saved');
    const monetarySavingsElement = document.getElementById('monetary-savings');

    const annualSalaryPerClinician = parseFloat(salaryInput.value) || 0;
    const workDays = parseFloat(workDaysInput.value) || 250;
    const numClinicians = parseFloat(numCliniciansInput.value) || 1;

    if (annualSalaryPerClinician <= 0 || workDays <= 0) {
        annualHoursElement.textContent = 'N/A';
        monetarySavingsElement.textContent = '$0';
        return;
    }

    const dailyHoursSaved = dailyMinutesSaved / 60;
    const individualAnnualHoursSaved = dailyHoursSaved * workDays;
    const totalAnnualWorkHours = workDays * 8;
    const hourlyRate = annualSalaryPerClinician / totalAnnualWorkHours;
    const individualAnnualMonetarySavings = hourlyRate * individualAnnualHoursSaved;

    const totalAnnualHoursSaved = individualAnnualHoursSaved * numClinicians;
    const totalAnnualMonetarySavings = individualAnnualMonetarySavings * numClinicians;
    const totalWorkDaysRegained = Math.round(totalAnnualHoursSaved / 8);

    const formattedHours = totalAnnualHoursSaved.toFixed(0);
    const formattedMonetarySavings = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(totalAnnualMonetarySavings);

    annualHoursElement.textContent = `${formattedHours} hrs`;
    monetarySavingsElement.textContent = formattedMonetarySavings;

    const hoursSubtext = annualHoursElement.nextElementSibling;
    if (hoursSubtext) {
         hoursSubtext.textContent = `Equivalent to ${totalWorkDaysRegained} extra workdays regained across the team.`;
    }

    updateDisplay(salaryInput);
    updateDisplay(workDaysInput);
    updateDisplay(numCliniciansInput);
}

// --- Page Content Definitions (Rendering Functions) ---

const HeroSection = `
    <section class="hero">
        <div class="page-width">
            <div class="hero-layout">
                <div class="hero-content">
                    <span class="kicker" style="color: #4b88d3;" data-i18n="hero.kicker">AI medical scribe for modern clinicians</span>
                    <h1 data-i18n="hero.title">Voice in. Meticulous notes out.</h1>
                    <p class="hero-subtitle" data-i18n="hero.description">ClinixSummary turns every consultation into structured, billing\u2011ready documentation \u2013 in seconds \u2013 so you can reclaim your time for patients, not paperwork.</p>

                    <div style="margin-top: 32px; max-width: 400px; background: #fff; padding: 32px; border-radius: 16px; border: 1px solid var(--border-subtle); box-shadow: 0 8px 24px rgba(0,0,0,0.06);">
                        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                            <button style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #dadce0; border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.2s;" onclick="showToast('Google Sign-In simulated');" title="Continue with Google">
                                <img src="images/google-logo.svg" alt="Google" style="width: 20px; height: 20px;">
                            </button>
                            <button style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #dadce0; border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.2s;" onclick="showToast('Microsoft Sign-In simulated');" title="Continue with Microsoft">
                                <img src="images/microsoft-logo.svg" alt="Microsoft" style="width: 20px; height: 20px;">
                            </button>
                            <button style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #dadce0; border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.2s;" onclick="showToast('Apple Sign-In simulated');" title="Continue with Apple">
                                <img src="images/apple-logo.svg" alt="Apple" style="width: 20px; height: 20px;">
                            </button>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                            <div style="flex: 1; height: 1px; background: #e0e0e0;"></div>
                            <span style="font-size: 12px; color: #757575;" data-i18n="hero.or">or</span>
                            <div style="flex: 1; height: 1px; background: #e0e0e0;"></div>
                        </div>
                        <div style="margin-bottom: 16px;">
                            <input type="email" placeholder="Enter your email address" data-i18n-placeholder="hero.email_placeholder" style="width: 100%; padding: 12px 16px; border: 1px solid #dadce0; border-radius: 8px; font-size: 14px; outline: none; transition: border 0.2s;">
                        </div>
                        <button class="btn-primary" style="width: 100%; justify-content: center; border-radius: 8px; font-weight: 600; padding: 12px;" onclick="showToast('Email flow simulated'); return false;" data-i18n="hero.continue">Continue</button>
                        <div style="text-align: center; margin-top: 16px; font-size: 12px; color: var(--text-secondary);">
                            <span data-i18n="hero.privacy">By continuing, you acknowledge clinixSummary</span> <a href="#" style="color: var(--accent); font-weight: 500;" data-i18n="hero.privacy_link">Privacy Policy</a>.
                        </div>
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
                <h2 class="section-title" data-i18n="capabilities.title">Specialist-grade documentation.</h2>
                <p class="section-copy" data-i18n="capabilities.description">From primary care to orthopaedics, dermatology, paediatrics and beyond \u2013 ClinixSummary captures the nuance of real\u2011world medicine while standardising the structure for downstream workflows.</p>
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
                <p class="section-copy" data-i18n="outcomes.description">ClinixSummary has been designed as a benchmark that improves the patient encounter, slashes documentation time and boosts reimbursement accuracy.</p>
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
                <p class="section-copy" style="margin-left: auto; margin-right: auto;" data-i18n="pricing.description">Choose a plan aligned with your average daily post\u2011visit dictations. All plans include access to the same core AI engine \u2013 you only pay for usage.</p>
                <p class="section-copy" style="font-size: 14px; margin-top: 10px; color: var(--text-secondary);" data-i18n="pricing.billing_note">Billing in USD. Flexible annual contracts available for clinics, groups and hospitals.</p>
            </div>

            <div class="grid-4" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">

                <div class="pricing-card">
                    <div class="plan-name">Forever Free</div>
                    <div class="plan-price">$0 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.free_desc">Explore the workflow.</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.free_f1">Full access to the console</li>
                        <li data-i18n="pricing.free_f2">50 scripts / month</li>
                        <li data-i18n="pricing.free_f3">No credit card required</li>
                        <li style="color: var(--text-secondary); opacity: 0.7;" data-i18n="pricing.free_f4">Limited specialty access</li>
                        <li style="color: var(--text-secondary); opacity: 0.7;" data-i18n="pricing.free_f5">Basic support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Get started with Free plan!'); return false;" data-i18n="pricing.free_cta">Get Started</button>
                </div>

                <div class="pricing-card">
                    <div class="plan-name">Pilot 900</div>
                    <div class="plan-price">$9.99 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.pilot_desc">For light users.</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.pilot_f1">75 scripts / month (900 / year)</li>
                        <li data-i18n="pricing.pilot_f2">6\u2011month rollover</li>
                        <li data-i18n="pricing.pilot_f3">Pause or cancel anytime</li>
                        <li data-i18n="pricing.pilot_f4">Standard specialty access</li>
                        <li data-i18n="pricing.pilot_f5">Community support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Starting Pilot 900 trial.'); return false;" data-i18n="pricing.pilot_cta">Start Trial</button>
                </div>

                <div class="pricing-card featured" style="border-color: #4b88d3;">
                    <div style="margin-bottom: 8px;"><span class="beta-tag" style="background: #E8F5FF; color: #4b88d3; font-weight: 700;" data-i18n="pricing.most_popular">Most Popular</span></div>
                    <div class="plan-name">Productive 3000</div>
                    <div class="plan-price">$29.99 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.productive_desc">The clinician favorite.</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.productive_f1">250 scripts / month (3,000 / year)</li>
                        <li data-i18n="pricing.productive_f2">12\u2011month rollover</li>
                        <li data-i18n="pricing.productive_f3">Priority product feedback loop</li>
                        <li data-i18n="pricing.productive_f4">All specialty access</li>
                        <li data-i18n="pricing.productive_f5">Priority email support</li>
                    </ul>
                    <button class="btn-primary" style="width: 100%;" onclick="showToast('Subscribing to Productive 3000.'); return false;" data-i18n="pricing.productive_cta">Subscribe</button>
                </div>

                <div class="pricing-card hidden-plan" id="pioneer-plan" style="display: none;">
                    <div class="plan-name">Pioneer 1800</div>
                    <div class="plan-price">$18.99 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.pioneer_desc">For private practitioners.</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.pioneer_f1">150 scripts / month (1,800 / year)</li>
                        <li data-i18n="pricing.pioneer_f2">6\u2011month rollover</li>
                        <li data-i18n="pricing.pioneer_f3">Pause or cancel anytime</li>
                        <li data-i18n="pricing.pioneer_f4">All specialty access</li>
                        <li data-i18n="pricing.pioneer_f5">Email support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Starting Pioneer 1800 trial.'); return false;" data-i18n="pricing.pioneer_cta">Start Trial</button>
                </div>

                <div class="pricing-card hidden-plan" id="prolific-plan" style="display: none;">
                    <div class="plan-name">Prolific 6000</div>
                    <div class="plan-price">$49.99 <span>/mo</span></div>
                    <p class="plan-period" data-i18n="pricing.prolific_desc">For high-volume groups.</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.prolific_f1">500 scripts / month (6,000 / year)</li>
                        <li data-i18n="pricing.prolific_f2">12\u2011month rollover</li>
                        <li data-i18n="pricing.prolific_f3">Dedicated API access</li>
                        <li data-i18n="pricing.prolific_f4">All specialty access</li>
                        <li data-i18n="pricing.prolific_f5">Phone & email support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Subscribing to Prolific 6000.'); return false;" data-i18n="pricing.prolific_cta">Subscribe</button>
                </div>

                <div class="pricing-card hidden-plan" id="enterprise-plan" style="display: none;">
                    <div class="plan-name">Plan Enterprise</div>
                    <div class="plan-price">Custom</div>
                    <p class="plan-period" data-i18n="pricing.enterprise_desc">volume\u2011based</p>
                    <ul class="plan-features">
                        <li data-i18n="pricing.enterprise_f1">Unlimited scripts & users</li>
                        <li data-i18n="pricing.enterprise_f2">Ambient mode & team workflows</li>
                        <li data-i18n="pricing.enterprise_f3">Multi\u2011language at scale</li>
                        <li data-i18n="pricing.enterprise_f4">1\u2011click EMR / EHR transfer</li>
                        <li data-i18n="pricing.enterprise_f5">Dedicated success manager</li>
                    </ul>
                    <a href="#contact" class="btn-primary" style="width: 100%; text-align: center; background-color: var(--accent); color: var(--text-primary);" onclick="showToast('Contacting Sales for Enterprise.');" data-i18n="pricing.enterprise_cta">Contact sales</a>
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button id="toggle-plans-btn" class="btn-outline" onclick="toggleMorePlans()" style="color: var(--text-primary); border-color: var(--border-subtle);" data-i18n="pricing.see_more">See 3 More Plans</button>
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

// --- PAGE: For Clinicians ---
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
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">visibility</span> <span data-i18n="clinicians.relationship_b1">Zero screen time during the encounter.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">schedule</span> <span data-i18n="clinicians.relationship_b2">Reclaim 2+ hours per day for yourself or for clinical work.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">family_restroom</span> <span data-i18n="clinicians.relationship_b3">Reduce risk of burnout and enhance work-life balance.</span></li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">payments</span>
                        <h3 data-i18n="clinicians.revenue_title">Revenue Cycle Perfection</h3>
                        <p data-i18n="clinicians.revenue_desc">For solo practice, every dollar counts. Our AI is tuned to automatically suggest the most accurate and highest-fidelity ICD-10 and CPT codes based on the clinical narrative, reducing under-coding and claim denials.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">attach_money</span> <span data-i18n="clinicians.revenue_b1">Maximize reimbursement accuracy.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">description</span> <span data-i18n="clinicians.revenue_b2">Instant, error-free claims submissions.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">shield</span> <span data-i18n="clinicians.revenue_b3">Audit-proof notes ready for any review.</span></li>
                        </ul>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker" data-i18n="clinicians.efficiency_kicker">Personalized Efficiency</span>
                    <h3 class="section-title" data-i18n="clinicians.efficiency_title">One-touch integration with your EHR and style.</h3>
                    <p class="section-copy" data-i18n="clinicians.efficiency_desc">ClinixSummary adapts to you\u2014not the other way around. Our Clinix Memory\u2122 ensures that your unique abbreviations, preferences, and note structure are learned and applied consistently across every single document.</p>
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

// --- PAGE: For Insurers ---
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
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">fact_check</span> <span data-i18n="insurers.doc_b1">99% reduction in manual data entry errors.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">gavel</span> <span data-i18n="insurers.doc_b2">Built-in compliance engine for regulatory adherence.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">lock_reset</span> <span data-i18n="insurers.doc_b3">Enhanced audit trails for payor integrity programs.</span></li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">trending_up</span>
                        <h3 data-i18n="insurers.util_title">Utilization Management & Cost Reduction</h3>
                        <p data-i18n="insurers.util_desc">We streamline the information flow needed for Utilization Review and claims adjudication. Clear, structured SOAP notes allow for automated checks against medical policy criteria, cutting turnaround times and reducing administrative overhead.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">payments</span> <span data-i18n="insurers.util_b1">15% faster claims processing.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">analytics</span> <span data-i18n="insurers.util_b2">Better insights into provider practice patterns.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">handshake</span> <span data-i18n="insurers.util_b3">Improved provider network satisfaction due to fewer queries.</span></li>
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

function SecurityPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Security & Compliance</span>
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
                        <h3>Certified compliance</h3>
                        <p>ClinixSummary meets the requirements of HIPAA, GDPR, PIPEDA/PHIPA, CCPA and other global privacy regulations. We sign Business Associate Agreements (BAAs).</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">auto_fix</span>
                        <h3>Fine\u2011tuned, privacy\u2011safe AI</h3>
                        <p>Our models are fine\u2011tuned on anonymised, non\u2011PHI data and run inference on secure infrastructure. We never use your transcripts to train customer\u2011facing models.</p>
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
                            <h4 style="font-weight: 600; font-size: 16px;">Regulatory confidence</h4>
                            <p>Aligned with global healthcare standards</p>
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
                        <p data-i18n="orgs.tech_desc">ClinixSummary combines ambient capture, quick dictation and advanced inference to fit every workflow. Whether you need to document visits in real time or summarise notes afterwards, our AI adapts to you.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">mic</span> <span data-i18n="orgs.ambient_b">**Ambient capture:** Hands\u2011free documentation without interrupting the patient encounter.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">keyboard_voice</span> <span data-i18n="orgs.dictation_b">**Rapid dictation:** Narrate your assessment and plan; our models will structure and code it.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">emoji_objects</span> <span data-i18n="orgs.inference_b">**Inference engine:** Models infer context, fill in missing details, and continuously improve via feedback.</span></li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">trending_up</span>
                        <h3 data-i18n="orgs.results_title">Proven results: Quantified impact at scale</h3>
                        <p data-i18n="orgs.results_desc">Research and real-world deployments show that ambient AI scribes dramatically improve operations for healthcare organisations.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">schedule</span> <span data-i18n="orgs.time_b">**2+ hours saved** per clinician.</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">sentiment_satisfied</span> <span data-i18n="orgs.satisfaction_b">**Higher satisfaction scores** (Positive effect on patient interactions).</span></li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">payments</span> <span data-i18n="orgs.reimbursement_b">**Reduced denials** & faster reimbursement.</span></li>
                        </ul>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker" data-i18n="orgs.why_kicker">Why Choose Us</span>
                    <h3 class="section-title" data-i18n="orgs.why_title">Built for enterprise healthcare.</h3>
                    <p class="section-copy" data-i18n="orgs.why_desc">ClinixSummary isn\u2019t just a transcription tool \u2013 it\u2019s an enterprise platform built to meet the needs of multi\u2011site clinics, hospital networks and payer organisations.</p>
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

function PublicationsPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Evidence</span>
                    <h2 class="subpage-title">Peer\u2011reviewed research on ambient AI scribes.</h2>
                    <p class="subpage-copy">ClinixSummary\u2019s design is grounded in evidence. Explore independent studies demonstrating how ambient AI scribes improve patient interactions, reduce burnout and enhance revenue cycle integrity.</p>
                </div>

                <div class="grid-2">
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">sentiment_satisfied</span>
                        <h3>Improved patient interactions</h3>
                        <p>Large studies found that patients reported their doctor spent less time looking at the computer, and said doctors spent more time speaking directly to them. Physicians themselves reported a significantly positive effect on patient interactions.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">stethoscope</span>
                        <h3>Reduced clinician burnout</h3>
                        <p>Ambient AI scribes can reduce documentation time by more than two hours per day and lower the odds of clinician burnout significantly. With the technology working in the background, care comes to the foreground.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">computer</span>
                        <h3>Cleaner claims & coding</h3>
                        <p>Accurate AI\u2011generated notes leads to fewer coding errors, smoother payer compliance and higher reimbursement. Faster submission reduces administrative overhead and improves cash flow.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">rule</span>
                        <h3>Practical guidance: Compliance essentials</h3>
                        <p>AI scribes are permitted when used with patient consent and appropriate safeguards. We provide guidance on informed consent, scope of practice verification, and maintaining audit trails.</p>
                    </div>
                </div>

                <div class="subpage-header" style="margin-top: 60px; border-top: 1px solid var(--border-subtle);">
                    <span class="kicker">Kaizen in Action</span>
                    <h3 class="section-title">Driven by feedback & ongoing research.</h3>
                    <p class="section-copy">Inspired by the Japanese principle of Kaizen (change for the better), ClinixSummary improves continually. We collaborate with clinicians and researchers to refine our models, expand into new languages and specialties, and validate outcomes through ongoing studies.</p>

                    <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 30px;">
                        <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;">Want to dig deeper into the research?</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 20px;">We\u2019re happy to share full papers, aggregate metrics and connect you with researchers studying ambient AI scribes.</p>
                    <div class="nav-actions" style="justify-content: flex-start; margin-left: 0;">
                        <a href="#" class="btn-primary" onclick="showToast('Publications requested.'); return false;">Request publications</a>
                        <a href="#contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
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
                    <span class="kicker" data-i18n="news.kicker">Announcements</span>
                    <h2 class="subpage-title" data-i18n="news.title">Latest news & product updates.</h2>
                    <p class="subpage-copy" data-i18n="news.description">Follow our journey as we expand into new specialties, roll out advanced modules and share major company milestones.</p>
                </div>

                <div style="max-width: 800px;">
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Oct 2025</span>
                        <h3 data-i18n="news.oct_title">ClinixSummary launches Radiology Assist</h3>
                        <p data-i18n="news.oct_desc">Our new Radiology Assist module harnesses specialised AI to generate structured radiology summaries with diagnostic impressions and follow\u2011up recommendations. Built in partnership with board\u2011certified radiologists, it streamlines workflow while preserving interpretive nuance.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Sep 2025</span>
                        <h3 data-i18n="news.sep_title">Dermatology Assist now available</h3>
                        <p data-i18n="news.sep_desc">The Dermatology Assist module leverages fine\u2011tuned models trained on dermatologic terminology to create concise notes and patient instructions. Clinicians can dictate skin findings in natural language and receive structured assessments and plans in seconds.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Aug 2025</span>
                        <h3 data-i18n="news.aug_title">ClinixSummary wins innovation award</h3>
                        <p data-i18n="news.aug_desc">We\u2019re honoured to have been recognised at the Healthcare AI Innovator Awards for our contributions to ambient documentation and clinician wellbeing. The judges highlighted our evidence\u2011driven approach and commitment to privacy\u2011first design.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Jun 2025</span>
                        <h3 data-i18n="news.jun_title">Strategic partnership with GlobalHealth Systems</h3>
                        <p data-i18n="news.jun_desc">ClinixSummary has partnered with GlobalHealth Systems to deploy our AI scribe across their network of 200 hospitals. Together we\u2019re transforming documentation workflows and elevating patient experience worldwide.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">May 2025</span>
                        <h3 data-i18n="news.may_title">Series A funding to accelerate R&D</h3>
                        <p data-i18n="news.may_desc">We\u2019re excited to announce a successful Series A financing round led by leading healthcare investors. The capital will fuel expansion into new specialties, bolster our compliance framework and scale our customer success team.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;" data-i18n="news.story_title">Want to share your story?</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="news.story_desc">If you\u2019ve used ClinixSummary to transform your practice, we\u2019d love to highlight your success. Get in touch with our marketing team to be featured.</p>
                    <div class="nav-actions" style="justify-content: flex-start; margin-left: 0;">
                        <a href="#" class="btn-primary" onclick="showToast('Story submission form activated.'); return false;" data-i18n="news.story_submit">Submit a story</a>
                        <a href="#contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function BlogPage() {
     return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Thought Leadership</span>
                    <h2 class="subpage-title">Insights from the future of medical documentation.</h2>
                    <p class="subpage-copy">Our blog shares practical tips, industry analysis and reflections from our clinical team on how ambient AI scribes are transforming healthcare.</p>
                </div>

                <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">balance</div>
                        <h3>AI scribes vs. human scribes: which is right for your clinic?</h3>
                        <p>From cost and scalability to accuracy and clinician experience, we compare AI\u2011powered scribes with traditional human scribes.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">checklist</div>
                        <h3>5 criteria for choosing an ambient scribe</h3>
                        <p>Accuracy, security, specialty coverage, workflow fit and cost structure \u2013 the key factors to evaluate when selecting an AI scribe solution.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">auto_awesome</div>
                        <h3>The future of ambient documentation: 2025 and beyond</h3>
                        <p>A look ahead at emerging capabilities such as predictive note suggestions, real\u2011time quality feedback and deeper EHR integration.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">medical_mask</div>
                        <h3>Clinician wellbeing in the era of AI</h3>
                        <p>How ambient scribes can reduce burnout by offloading cognitive burden, and why human\u2011centric design remains essential.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">admin_panel_settings</div>
                        <h3>Ensuring patient privacy with AI</h3>
                        <p>We outline best practices for keeping patient data safe when implementing AI tools \u2013 from encryption to consent management.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">currency_exchange</div>
                        <h3>Coding essentials for clinicians</h3>
                        <p>Understanding ICD\u201110 and CPT coding isn\u2019t just for billers. We share tips on leveraging AI\u2011generated codes to improve claim accuracy.</p>
                    </a>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;">Join the conversation</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">We welcome guest posts from clinicians, administrators and technologists. Share your insights and help shape the future of documentation.</p>
                    <div class="nav-actions" style="justify-content: flex-start; margin-left: 0;">
                        <a href="#" class="btn-primary" onclick="showToast('Pitching post ideas.'); return false;">Pitch a post</a>
                        <a href="#contact" class="btn-outline" data-i18n="common.contact_us">Contact us</a>
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
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-right: 8px; color: var(--accent);">diversity_2</span> <span data-i18n="story.bullet1">**All clinicians welcome:** Doctors, dentists, therapists, midwives, vets \u2013 our models are tuned for your specialty.</span></li>
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-right: 8px; color: var(--accent);">change_circle</span> <span data-i18n="story.bullet2">**Kaizen mindset:** We ship improvements continuously, guided by your feedback. Good enough is never enough.</span></li>
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-right: 8px; color: var(--accent);">public</span> <span data-i18n="story.bullet3">**Global by design:** Our platform supports multiple languages, jurisdictional privacy laws and healthcare systems.</span></li>
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

// --- Router Implementation ---

const routes = {
    '#home': HomePage,
    '#pricing': HomePage,
    '#clinicians': CliniciansPage,
    '#insurers': InsurersPage,
    '#security': SecurityPage,
    '#organizations': OrganizationsPage,
    '#publications': PublicationsPage,
    '#news': NewsPage,
    '#blog': BlogPage,
    '#story': StoryPage,
    '#contact': HomePage,
    '': HomePage,
};

function router() {
    const hash = window.location.hash || '#home';
    const pageFn = routes[hash];

    if (pageFn) {
        APP_CONTENT.innerHTML = pageFn();

        // Apply i18n translations to the newly rendered content
        if (typeof I18n !== 'undefined' && I18n.ready) {
            I18n.translatePage();
            I18n.handleNonTranslatedRoute(hash);
        }

        window.scrollTo(0, 0);

        if (hash === '#pricing' || hash === '#contact' || hash === '#roi-calculator') {
             setTimeout(() => {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }

        if (hash === '#home' || hash === '#pricing' || hash === '#roi-calculator') {
            setTimeout(calculateSavings, 10);
        }
    } else {
        APP_CONTENT.innerHTML = '<h2>404 Page Not Found</h2>';
    }

    document.querySelectorAll('.nav-menu a.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
     document.querySelectorAll('.nav-item').forEach(item => {
        const navLink = item.querySelector('.nav-link');
        const isDropdownTrigger = navLink && !navLink.getAttribute('href');

        if (isDropdownTrigger) {
            const dropdownItems = item.querySelectorAll('.dropdown-item');
            let isActive = false;
            dropdownItems.forEach(dropLink => {
                if (dropLink.getAttribute('href') === hash) {
                    isActive = true;
                }
            });
            if (isActive) {
                 navLink.classList.add('active');
            } else {
                 navLink.classList.remove('active');
            }
        }
    });
}

// --- Mobile Menu Toggle ---
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-right-group');

function toggleMobileMenu() {
    const isMenuVisible = navMenu.style.display === 'flex' && window.innerWidth <= 900;

    if (!isMenuVisible) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '72px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-paper)';
        navMenu.style.borderTop = '1px solid var(--border-subtle)';
        navMenu.style.padding = '16px';
        navMenu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
    } else {
        navMenu.style.display = 'none';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.background = '';
        navMenu.style.borderTop = '';
        navMenu.style.padding = '';
        navMenu.style.boxShadow = '';
    }
}

mobileToggle.addEventListener('click', toggleMobileMenu);

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.background = '';
        navMenu.style.borderTop = '';
        navMenu.style.padding = '';
        navMenu.style.boxShadow = '';
    } else {
        if (navMenu.style.position !== 'absolute') {
            navMenu.style.display = 'none';
        }
    }
});
