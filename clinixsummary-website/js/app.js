// --- Pricing Toggle Logic ---
function toggleMorePlans() {
    const hiddenPlans = document.querySelectorAll('.hidden-plan');
    const button = document.getElementById('toggle-plans-btn');
    const isHidden = hiddenPlans.length > 0 && hiddenPlans[0].style.display === 'none';

    hiddenPlans.forEach(plan => {
        plan.style.display = isHidden ? 'flex' : 'none';
    });

    button.textContent = isHidden ? 'Hide Additional Plans' : 'See 3 More Plans';
}

document.addEventListener('DOMContentLoaded', () => {
    // Setup router on page load
    router();
    // Listen for hash changes to navigate without reloading
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

    const dailyMinutesSaved = 120; // Fixed at 120 minutes (2 hours)
    
    if (!salaryInput || !workDaysInput || !numCliniciansInput) return; // Guard for initial render

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

    // Calculations based on *one* clinician
    const dailyHoursSaved = dailyMinutesSaved / 60;
    const individualAnnualHoursSaved = dailyHoursSaved * workDays;
    const totalAnnualWorkHours = workDays * 8; 
    const hourlyRate = annualSalaryPerClinician / totalAnnualWorkHours;
    const individualAnnualMonetarySavings = hourlyRate * individualAnnualHoursSaved;

    // Aggregate savings
    const totalAnnualHoursSaved = individualAnnualHoursSaved * numClinicians;
    const totalAnnualMonetarySavings = individualAnnualMonetarySavings * numClinicians;
    
    // Calculate equivalent workdays saved (assuming 8hr workday)
    const totalWorkDaysRegained = Math.round(totalAnnualHoursSaved / 8);
    
    // Format hours result
    const formattedHours = totalAnnualHoursSaved.toFixed(0);
    
    // Format monetary results
    const formattedMonetarySavings = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(totalAnnualMonetarySavings);

    // Update DOM
    annualHoursElement.textContent = `${formattedHours} hrs`;
    monetarySavingsElement.textContent = formattedMonetarySavings;
    
    // Update subtext dynamically
    const hoursSubtext = annualHoursElement.nextElementSibling;
    if (hoursSubtext) {
         hoursSubtext.textContent = `Equivalent to ${totalWorkDaysRegained} extra workdays regained across the team.`;
    }

    // Ensure the display fields are updated when calculateSavings is called initially or on input
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
                    <span class="kicker" style="color: #4b88d3;">AI medical scribe for modern clinicians</span>
                    <h1>Voice in. Meticulous notes out.</h1>
                    <p class="hero-subtitle">ClinixSummary turns every consultation into structured, billing‑ready documentation – in seconds – so you can reclaim your time for patients, not paperwork.</p>
                    
                    <!-- UPDATED: Login Form Mimicking Image -->
                    <div style="margin-top: 32px; max-width: 400px; background: #fff; padding: 32px; border-radius: 16px; border: 1px solid var(--border-subtle); box-shadow: 0 8px 24px rgba(0,0,0,0.06);">
                        
                        <!-- Removed "Get started" heading -->

                        <!-- Social Login Buttons Container -->
                        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                            <!-- Google Button -->
                            <button style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #dadce0; border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.2s;" onclick="showToast('Google Sign-In simulated');" title="Continue with Google">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style="width: 20px; height: 20px;">
                            </button>

                            <!-- Microsoft Button -->
                            <button style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #dadce0; border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.2s;" onclick="showToast('Microsoft Sign-In simulated');" title="Continue with Microsoft">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" style="width: 20px; height: 20px;">
                            </button>

                            <!-- Apple Button -->
                            <button style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #dadce0; border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.2s;" onclick="showToast('Apple Sign-In simulated');" title="Continue with Apple">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style="width: 20px; height: 20px;">
                            </button>
                        </div>

                        <!-- Divider -->
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                            <div style="flex: 1; height: 1px; background: #e0e0e0;"></div>
                            <span style="font-size: 12px; color: #757575;">or</span>
                            <div style="flex: 1; height: 1px; background: #e0e0e0;"></div>
                        </div>

                        <!-- Email Input -->
                        <div style="margin-bottom: 16px;">
                            <input type="email" placeholder="Enter your email address" style="width: 100%; padding: 12px 16px; border: 1px solid #dadce0; border-radius: 8px; font-size: 14px; outline: none; transition: border 0.2s;">
                        </div>

                        <!-- Continue Button -->
                        <button class="btn-primary" style="width: 100%; justify-content: center; border-radius: 8px; font-weight: 600; padding: 12px;" onclick="showToast('Email flow simulated'); return false;">Continue</button>
                        
                        <div style="text-align: center; margin-top: 16px; font-size: 12px; color: var(--text-secondary);">
                            By continuing, you acknowledge clinixSummary <a href="#" style="color: var(--accent); font-weight: 500;">Privacy Policy</a>.
                        </div>
                    </div>
                    <!-- End Login Form -->

                    <div class="hero-stats">
                        <div class="stat-item">
                            <!-- UPDATED TEXT -->
                            <span class="stat-value">2+ hrs</span> 
                            <span class="stat-label">Saved daily</span>
                        </div>
                        <div class="stat-item">
                            <!-- UPDATED TEXT -->
                            <span class="stat-value">74%</span>
                            <span class="stat-label">Less burnout</span>
                        </div>
                        <div class="stat-item">
                            <!-- UPDATED TEXT -->
                            <span class="stat-value">HIPAA</span>
                            <span class="stat-label">Compliant</span>
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
                    <!-- Removed "Recording Active" overlay element -->
                </div>
            </div>
        </div>
    </section>
`;

const CoreArchitectureSection = `
    <section>
        <div class="page-width">
            <div class="section-header">
                <span class="kicker">The Core AI Architecture</span>
                <h2 class="section-title">Built on Kaizen & Contextual Reasoning.</h2>
                <p class="section-copy">Inspired by Kaizen (“change for the better”), ClinixSummary is continuously refined through careful clinical review and quality assurance. During each session, our modules uses contextual reasoning to generate structured notes that fit the specialty and the encounter.</p>
            </div>
            
            <div class="grid-3">
                <div class="card">
                    <div class="card-icon material-symbols-rounded">neurology</div>
                    <h3>Clinical LLMs (The Core)</h3>
                    <!-- UPDATED TEXT: Removed specific number -->
                    <p>Fine-tuned on vast amounts of de-identified clinical data to ensure surgical precision and terminology accuracy across all medical specialties and complex clinical narratives.</p>
                </div>
                <!-- Removed Adaptive Personalization Card -->
                <div class="card">
                    <div class="card-icon material-symbols-rounded">trending_up</div>
                    <h3>Built-in Efficiency</h3>
                    <!-- UPDATED TEXT: Removed specific percentage -->
                    <p>Our lean, high-performance architecture eliminates the need for expensive human scribe teams, delivering industry-leading accuracy at a fraction of the traditional operational cost.</p>
                </div>
            </div>
        </div>
    </section>
`;

const CapabilitiesSection = `
    <section style="background: var(--bg-subtle);">
        <div class="page-width">
            <div class="section-header">
                <span class="kicker">Capabilities</span>
                <h2 class="section-title">Specialist-grade documentation.</h2>
                <p class="section-copy">From primary care to orthopaedics, dermatology, paediatrics and beyond – ClinixSummary captures the nuance of real‑world medicine while standardising the structure for downstream workflows.</p>
            </div>
            
            <div class="grid-3">
                <div class="card">
                    <div class="card-icon material-symbols-rounded">mic</div>
                    <h3>Clinical‑grade transcription</h3>
                    <p>High‑accuracy recognition of medical terminology, acronyms and abbreviations – even with accents and real‑world background noise.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">description</div>
                    <h3>Structured notes &amp; letters</h3>
                    <p>Outputs ready‑to‑paste or push: notes, referral letters and patient instructions in seconds.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">medical_information</div>
                    <h3>ICD‑10 &amp; CPT coding</h3>
                    <p>Generate codes that support cleaner claims, fewer queries and better analytics.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">headphones</div>
                    <h3>Ambient &amp; post‑visit capture</h3>
                    <p>Record consultations ambiently or via quick dictation – whichever suits your consultation best.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">neurology</div>
                    <h3>Contextual Reasoning Engine</h3>
                    <p>Our advanced modules infers context and ensures clinically useful, billable documentation at the point of care including differential diagnosis.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">gavel</div>
                    <h3>Medical legal &amp; reimbursement ready</h3>
                    <p>Accurate & meticulous documentation reduces malpractice risk and improves reimbursement accuracy.</p>
                </div>
            </div>
        </div>
    </section>
`;

const OutcomesSection = `
    <section>
        <div class="page-width">
            <div class="section-header">
                <span class="kicker">Outcomes &amp; benefits</span>
                <h2 class="section-title">Instant quantifiable impact</h2>
                <p class="section-copy">ClinixSummary has been designed as a benchmark that improves the patient encounter, slashes documentation time and boosts reimbursement accuracy.</p>
            </div>
            
            <div class="grid-3">
                <div class="card">
                    <div class="card-icon material-symbols-rounded">sentiment_satisfied</div>
                    <h3>Higher patient satisfaction</h3>
                    <!-- UPDATED TEXT: Generalized claim -->
                    <p>In one large study, 47% of patients said their doctor spent less time looking at the computer, and 39% said their doctor spent more time speaking directly to them. Clinicians reported an 84% positive effect on patient interactions.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">timer</div>
                    <h3>Reduce cognitive overload</h3>
                    <!-- UPDATED TEXT: Generalized time savings claim -->
                    <p>ClinixSummary reduce note taking time by up to 2 hours per day and lowers the odds of clinician burnout by 74%. With technology fading into the background, care comes to the foreground.</p>
                </div>
                <div class="card">
                    <div class="card-icon material-symbols-rounded">payments</div>
                    <h3>Cleaner claims &amp; revenue</h3>
                    <p>Accurate notes mean fewer coding errors, fewer denials, faster submission, and stronger reimbursement.</p>
                </div>
            </div>
        </div>
    </section>
`;

const CalculatorSection = `
    <section id="roi-calculator" style="padding-top: 48px; padding-bottom: 48px;">
        <div class="page-width">
            <div class="section-header" style="text-align: center; margin-left: auto; margin-right: auto; margin-bottom: 40px;">
                <span class="kicker">Value Projection</span>
                <h2 class="section-title">Calculate your annual ROI.</h2>
                <p class="section-copy" style="margin-left: auto; margin-right: auto;">See exactly how much time and money ClinixSummary saves you based on your practice's metrics.</p>
            </div>

            <div class="calculator-container">
                <!-- Calculator Inputs -->
                <div>
                    <div class="calculator-input-group">
                        <label for="annual-salary">Median Annual Salary per Clinician (USD)</label>
                        <span id="annual-salary-display" class="slider-display">$250,000</span>
                        <input type="range" id="annual-salary" value="250000" min="50000" max="500000" step="10000" oninput="updateDisplay(this); calculateSavings();">
                    </div>
                    
                    <!-- NEW INPUT: Number of Clinicians -->
                    <div class="calculator-input-group">
                        <label for="num-clinicians">Number of Clinicians</label>
                        <span id="num-clinicians-display" class="slider-display">1 Clinician</span>
                        <input type="range" id="num-clinicians" value="1" min="1" max="50" step="1" oninput="updateDisplay(this); calculateSavings();">
                    </div>

                    <div class="calculator-input-group">
                        <label for="work-days">Median Work Days per Year (per clinician)</label>
                        <span id="work-days-display" class="slider-display">250 Days</span>
                        <input type="range" id="work-days" value="250" min="150" max="300" step="5" oninput="updateDisplay(this); calculateSavings();">
                    </div>

                    <div class="calculator-input-group">
                        <label for="daily-minutes-saved">Minutes Saved per Day (ClinixSummary Impact)</label>
                        <!-- UPDATED TEXT: Added "Industry Estimate" -->
                        <div class="fixed-value">120 Minutes (2 Hours - Industry Estimate)</div>
                        <input type="hidden" id="daily-minutes-saved" value="120">
                    </div>
                    
                    <p class="result-subtext" style="color: var(--text-primary); font-weight: 500;">
                        *Calculations assume an 8-hour workday.
                    </p>
                </div>

                <!-- Calculator Results (UPDATED) -->
                <div class="calculator-results">
                    <div class="calculator-result-item">
                        <span class="material-symbols-rounded result-icon">beach_access</span>
                        <div class="result-label">Total Annual Time Saved</div>
                        <div id="annual-hours-saved" class="result-value">500 hrs</div>
                        <div class="result-subtext">Equivalent to 62 extra workdays regained across the team.</div>
                    </div>

                    <div class="calculator-result-item">
                        <span class="material-symbols-rounded result-icon">currency_exchange</span>
                        <div class="result-label">Total Annual Monetary Savings</div>
                        <div id="monetary-savings" class="result-value">$31,250</div>
                        <div class="result-subtext">Reclaim this value by focusing on revenue-generating tasks.</div>
                    </div>

                    <!-- NEW ITEM: Patient Centric -->
                    <div class="calculator-result-item">
                        <span class="material-symbols-rounded result-icon">handshake</span>
                        <div class="result-label">Patient-Centric Focus</div>
                        <div id="patient-centric-value" class="result-value">90% More Patient-Centric</div>
                        <div class="result-subtext">Clinicians report significantly higher patient engagement scores and satisfaction.</div>
                    </div>

                    <!-- UPDATED LAST ITEM: Cognitive Load -->
                    <div class="calculator-result-item" style="border-bottom: none;">
                        <div class="result-label">Burnout & Cognitive Load</div>
                        <span class="material-symbols-rounded result-icon" style="font-size: 36px !important; color: white !important;">sentiment_satisfied</span>
                        <div id="cognitive-load-value" class="result-value" style="color: white; font-family: var(--font-sans); font-size: 24px;">78% Less Cognitive Load</div>
                        <div class="result-subtext">This frees up mental energy, contributing to documented improvement in professional fulfillment.</div>
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
                <span class="kicker">Pricing</span>
                <h2 class="section-title">Transparent plans for every practice.</h2>
                <p class="section-copy" style="margin-left: auto; margin-right: auto;">Choose a plan aligned with your average daily post‑visit dictations. All plans include access to the same core AI engine – you only pay for usage.</p>
                <p class="section-copy" style="font-size: 14px; margin-top: 10px; color: var(--text-secondary);">Billing in USD. Flexible annual contracts available for clinics, groups and hospitals.</p>
            </div>

            <!-- Displaying only the 3 requested plans initially -->
            <div class="grid-4" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                
                <!-- 1. Forever Free (VISIBLE) -->
                <div class="pricing-card">
                    <div class="plan-name">Forever Free</div>
                    <div class="plan-price">$0 <span>/mo</span></div>
                    <p class="plan-period">Explore the workflow.</p>
                    <ul class="plan-features">
                        <li>Full access to the console</li>
                        <li>50 scripts / month</li>
                        <li>No credit card required</li>
                        <li style="color: var(--text-secondary); opacity: 0.7;">Limited specialty access</li>
                        <li style="color: var(--text-secondary); opacity: 0.7;">Basic support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Get started with Free plan!'); return false;">Get Started</button>
                </div>

                <!-- 2. Pilot 900 (VISIBLE) -->
                <div class="pricing-card">
                    <div class="plan-name">Pilot 900</div>
                    <div class="plan-price">$9.99 <span>/mo</span></div>
                    <p class="plan-period">For light users.</p>
                    <ul class="plan-features">
                        <li>75 scripts / month (900 / year)</li>
                        <li>6‑month rollover</li>
                        <li>Pause or cancel anytime</li>
                        <li>Standard specialty access</li>
                        <li>Community support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Starting Pilot 900 trial.'); return false;">Start Trial</button>
                </div>

                <!-- 4. Productive 3000 (FEATURED) (VISIBLE) -->
                <div class="pricing-card featured" style="border-color: #4b88d3;">
                    <div style="margin-bottom: 8px;"><span class="beta-tag" style="background: #E8F5FF; color: #4b88d3; font-weight: 700;">Most Popular</span></div>
                    <div class="plan-name">Productive 3000</div>
                    <div class="plan-price">$29.99 <span>/mo</span></div>
                    <p class="plan-period">The clinician favorite.</p>
                    <ul class="plan-features">
                        <li>250 scripts / month (3,000 / year)</li>
                        <li>12‑month rollover</li>
                        <li>Priority product feedback loop</li>
                        <li>All specialty access</li>
                        <li>Priority email support</li>
                    </ul>
                    <button class="btn-primary" style="width: 100%;" onclick="showToast('Subscribing to Productive 3000.'); return false;">Subscribe</button>
                </div>
                
                <!-- 3. Pioneer 1800 (HIDDEN) -->
                <div class="pricing-card hidden-plan" id="pioneer-plan" style="display: none;">
                    <div class="plan-name">Pioneer 1800</div>
                    <div class="plan-price">$18.99 <span>/mo</span></div>
                    <p class="plan-period">For private practitioners.</p>
                    <ul class="plan-features">
                        <li>150 scripts / month (1,800 / year)</li>
                        <li>6‑month rollover</li>
                        <li>Pause or cancel anytime</li>
                        <li>All specialty access</li>
                        <li>Email support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Starting Pioneer 1800 trial.'); return false;">Start Trial</button>
                </div>

                <!-- 5. Prolific 6000 (HIDDEN) -->
                <div class="pricing-card hidden-plan" id="prolific-plan" style="display: none;">
                    <div class="plan-name">Prolific 6000</div>
                    <div class="plan-price">$49.99 <span>/mo</span></div>
                    <p class="plan-period">For high-volume groups.</p>
                    <ul class="plan-features">
                        <li>500 scripts / month (6,000 / year)</li>
                        <li>12‑month rollover</li>
                        <li>Dedicated API access</li>
                        <li>All specialty access</li>
                        <li>Phone & email support</li>
                    </ul>
                    <button class="btn-outline" style="width: 100%;" onclick="showToast('Subscribing to Prolific 6000.'); return false;">Subscribe</button>
                </div>
                
                <!-- 6. Plan Enterprise (HIDDEN) -->
                <div class="pricing-card hidden-plan" id="enterprise-plan" style="display: none;">
                    <div class="plan-name">Plan Enterprise</div>
                    <div class="plan-price">Custom</div>
                    <p class="plan-period">volume‑based</p>
                    <ul class="plan-features">
                        <li>Unlimited scripts & users</li>
                        <li>Ambient mode & team workflows</li>
                        <li>Multi‑language at scale</li>
                        <li>1‑click EMR / EHR transfer</li>
                        <li>Dedicated success manager</li>
                    </ul>
                    <a href="#contact" class="btn-primary" style="width: 100%; text-align: center; background-color: var(--accent); color: var(--text-primary);" onclick="showToast('Contacting Sales for Enterprise.');">Contact sales</a>
                </div>
            </div>
            
            <!-- Toggle Button -->
            <div style="text-align: center; margin-top: 30px;">
                <button id="toggle-plans-btn" class="btn-outline" onclick="toggleMorePlans()" style="color: var(--text-primary); border-color: var(--border-subtle);">See 3 More Plans</button>
            </div>

            <div style="text-align: center; margin-top: 40px; font-size: 14px; color: var(--text-secondary);">
                Looking for <a href="#organizations" style="text-decoration: underline; color: var(--text-primary);">Enterprise</a> or <a href="#organizations" style="text-decoration: underline; color: var(--text-primary);">Organizational</a> licensing?
            </div>
        </div>
    </section>
`;

function HomePage() {
    // Updated order: ROI Calculator moved after Core Architecture, Comparison section removed
    return HeroSection + CoreArchitectureSection + CalculatorSection + CapabilitiesSection + OutcomesSection + PricingSection;
}

// --- PAGE: For Clinicians ---
function CliniciansPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">For Private & Solo Practice</span>
                    <h2 class="subpage-title">Reclaim Your Practice: Focused Care, Zero Paperwork.</h2>
                    <p class="subpage-copy">ClinixSummary is your dedicated partner against administrative fatigue. Designed for the clinician who values patient time above all else, our AI scribe allows you to focus 100% on the consultation while ensuring your documentation, coding, and billing are immaculate.</p>
                </div>
                
                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">sentiment_satisfied</span>
                        <h3>Patient Relationship Restoration</h3>
                        <p>Stop the documentation drain and restore true eye contact and engagement with your patients. With ambient AI, the computer fades into the background, and the therapeutic relationship comes to the foreground.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">visibility</span> Zero screen time during the encounter.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">schedule</span> Reclaim 2+ hours per day for yourself or for clinical work.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">family_restroom</span> Reduce risk of burnout and enhance work-life balance.</li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">payments</span>
                        <h3>Revenue Cycle Perfection</h3>
                        <p>For solo practice, every dollar counts. Our AI is tuned to automatically suggest the most accurate and highest-fidelity ICD-10 and CPT codes based on the clinical narrative, reducing under-coding and claim denials.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">attach_money</span> Maximize reimbursement accuracy.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">description</span> Instant, error-free claims submissions.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">shield</span> Audit-proof notes ready for any review.</li>
                        </ul>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker">Personalized Efficiency</span>
                    <h3 class="section-title">One-touch integration with your EHR and style.</h3>
                    <p class="section-copy">ClinixSummary adapts to you—not the other way around. Our Clinix Memory™ ensures that your unique abbreviations, preferences, and note structure are learned and applied consistently across every single document.</p>
                </div>

                <div class="grid-4">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">tune</span> Adaptive Formatting</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Learns and applies your preferred SOAP, narrative, or specialized template.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">lock_person</span> HIPAA & GDPR Safe</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Secure, compliant, and ready to meet all global privacy standards.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">integration_instructions</span> Easy EHR Paste</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Direct copy/paste integration into all major (and custom) EHR systems.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">support_agent</span> Dedicated Support</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Quick support via email and chat for rapid resolution.</p>
                    </div>
                </div>
                
                <div style="background: var(--bg-subtle); color: var(--text-primary); text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Start Saving Time and Reclaiming Your Clinical Focus Today.</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Starting free trial for clinicians.'); return false;">Start My Free Trial</a>
                        <a href="#roi-calculator" class="btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);">Calculate My ROI</a>
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
                    <span class="kicker">For Insurance & Payer Organizations</span>
                    <h2 class="subpage-title">Drive Utilization Efficiency and Reduce Claims Complexity.</h2>
                    <p class="subpage-copy">ClinixSummary offers a powerful partnership to major payers. By ensuring provider documentation is standardized, verifiable, and precise at the source, we reduce manual review, minimize disputes, and accelerate the transition to value-based care models.</p>
                </div>
                
                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">auto_fix_high</span>
                        <h3>Meticulous Documentation for Audit Readiness</h3>
                        <p>Our AI platform guarantees every record adheres to the highest level of clinical and regulatory rigor (ICD-10/CPT guidelines, medical necessity). This meticulousness directly translates into reduced ambiguity during claims processing.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">fact_check</span> 99% reduction in manual data entry errors.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">gavel</span> Built-in compliance engine for regulatory adherence.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">lock_reset</span> Enhanced audit trails for payor integrity programs.</li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">trending_up</span>
                        <h3>Utilization Management & Cost Reduction</h3>
                        <p>We streamline the information flow needed for Utilization Review and claims adjudication. Clear, structured SOAP notes allow for automated checks against medical policy criteria, cutting turnaround times and reducing administrative overhead.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">payments</span> 15% faster claims processing.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">analytics</span> Better insights into provider practice patterns.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">handshake</span> Improved provider network satisfaction due to fewer queries.</li>
                        </ul>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker">Strategic Partnership</span>
                    <h3 class="section-title">Co-development of clinical guidelines and quality metrics.</h3>
                    <p class="section-copy">Partner with ClinixSummary to co-develop custom AI modules that align directly with your internal medical policies, quality assurance protocols, and emerging value-based care initiatives.</p>
                </div>

                <div class="grid-4">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">model_training</span> Template Co-creation</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Tailored documentation templates enforced by AI standards.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">shield_with_house</span> Data Security & BAAs</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">HIPAA-compliant infrastructure and Business Associate Agreements.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">network_check</span> EHR Interoperability</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Seamless data exchange with your existing payer systems.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">supervisor_account</span> Pilot Program Support</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Dedicated deployment and support for initial regional rollouts.</p>
                    </div>
                </div>
                
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 20px;">Ready to Transform Your Claims Processing?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#contact" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="showToast('Contacting sales for Insurer Partnership.'); return false;">Request a Strategic Consultation</a>
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
                    <p class="subpage-copy">Safeguarding patient data is non‑negotiable. ClinixSummary employs industry‑standard encryption, strict access controls and short retention policies to give you confidence that your practice and your patients are protected.</p>
                </div>

                <div class="grid-2">
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">lock</span>
                        <h3>End‑to‑end encryption</h3>
                        <p>All data is encrypted in transit using TLS 1.2+ and encrypted at rest with AES‑256. These bank‑grade standards ensure that voice recordings, transcripts and metadata remain confidential at all times.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">cleaning_services</span>
                        <h3>Ephemeral audio & data control</h3>
                        <p>We never store audio recordings long‑term. Once your note is generated, recordings are deleted automatically and you remain in control of your transcripts, which you can remove at any time.</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">gavel</span>
                        <h3>Certified compliance</h3>
                        <p>ClinixSummary meets the requirements of HIPAA, GDPR, PIPEDA/PHIPA, CCPA and other global privacy regulations. We sign Business Associate Agreements (BAAs).</p>
                    </div>
                    <div class="text-group">
                        <span class="material-symbols-rounded list-item-icon">auto_fix</span>
                        <h3>Fine‑tuned, privacy‑safe AI</h3>
                        <p>Our models are fine‑tuned on anonymised, non‑PHI data and run inference on secure infrastructure. We never use your transcripts to train customer‑facing models.</p>
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
                            <p>Short retention / user‑controlled</p>
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
                        <a href="#" class="btn-primary" style="background: #fff; color: var(--text-primary);" onclick="showToast('Trial started!'); return false;">Start free trial</a>
                        <a href="#contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Contact our team</a>
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
                    <span class="kicker">For Organisations</span>
                    <h2 class="subpage-title">Unlock productivity & satisfaction across your practice.</h2>
                    <p class="subpage-copy">ClinixSummary delivers measurable outcomes for clinics, groups and health systems. Our fine‑tuned AI saves hours per clinician, boosts patient satisfaction and reduces denied claims – all while integrating seamlessly into your existing workflows.</p>
                </div>
                
                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">model_training</span>
                        <h3>Technology: Ambient, dictation & inference in one platform</h3>
                        <p>ClinixSummary combines ambient capture, quick dictation and advanced inference to fit every workflow. Whether you need to document visits in real time or summarise notes afterwards, our AI adapts to you.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">mic</span> **Ambient capture:** Hands‑free documentation without interrupting the patient encounter.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">keyboard_voice</span> **Rapid dictation:** Narrate your assessment and plan; our models will structure and code it.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">emoji_objects</span> **Inference engine:** Models infer context, fill in missing details, and continuously improve via feedback.</li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">trending_up</span>
                        <h3>Proven results: Quantified impact at scale</h3>
                        <p>Research and real-world deployments show that ambient AI scribes dramatically improve operations for healthcare organisations.</p>
                        <ul style="margin-top: 15px; font-size: 14px; color: var(--text-secondary);">
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">schedule</span> **2+ hours saved** per clinician.</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">sentiment_satisfied</span> **Higher satisfaction scores** (Positive effect on patient interactions).</li>
                            <li style="color: var(--text-primary);"><span class="material-symbols-rounded" style="font-size: 16px; margin-right: 8px; color: var(--accent);">payments</span> **Reduced denials** & faster reimbursement.</li>
                        </ul>
                    </div>
                </div>

                <div class="subpage-header">
                    <span class="kicker">Why Choose Us</span>
                    <h3 class="section-title">Built for enterprise healthcare.</h3>
                    <p class="section-copy">ClinixSummary isn’t just a transcription tool – it’s an enterprise platform built to meet the needs of multi‑site clinics, hospital networks and payer organisations.</p>
                </div>

                <div class="grid-4">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">lock_open</span> SSO & RBAC</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Seamless sign‑in & fine‑grained permissions.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">fact_check</span> Audit trails</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Full activity logs for governance.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">deployed_code</span> Multi‑disciplinary</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Supports medical, dental, allied & veterinary teams.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">globe</span> Global availability</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Works in multiple languages & jurisdictions.</p>
                    </div>
                </div>
                
                <div style="background: var(--bg-subtle); color: var(--text-primary); text-align: center; padding: 40px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">Ready to pilot ClinixSummary in your organisation?</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Sign in to enterprise portal.'); return false;">Sign in to enterprise portal</a>
                        <a href="#contact" class="btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);">Speak to our sales team</a>
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
                    <h2 class="subpage-title">Peer‑reviewed research on ambient AI scribes.</h2>
                    <p class="subpage-copy">ClinixSummary’s design is grounded in evidence. Explore independent studies demonstrating how ambient AI scribes improve patient interactions, reduce burnout and enhance revenue cycle integrity.</p>
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
                        <p>Accurate AI‑generated notes leads to fewer coding errors, smoother payer compliance and higher reimbursement. Faster submission reduces administrative overhead and improves cash flow.</p>
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
                        <p style="color: var(--text-secondary); margin-bottom: 20px;">We’re happy to share full papers, aggregate metrics and connect you with researchers studying ambient AI scribes.</p>
                    <div class="nav-actions" style="justify-content: flex-start; margin-left: 0;">
                        <a href="#" class="btn-primary" onclick="showToast('Publications requested.'); return false;">Request publications</a>
                        <a href="#contact" class="btn-outline">Contact us</a>
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
                    <span class="kicker">Announcements</span>
                    <h2 class="subpage-title">Latest news & product updates.</h2>
                    <p class="subpage-copy">Follow our journey as we expand into new specialties, roll out advanced modules and share major company milestones.</p>
                </div>
                
                <div style="max-width: 800px;">
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Oct 2025</span>
                        <h3>ClinixSummary launches Radiology Assist</h3>
                        <p>Our new Radiology Assist module harnesses specialised AI to generate structured radiology summaries with diagnostic impressions and follow‑up recommendations. Built in partnership with board‑certified radiologists, it streamlines workflow while preserving interpretive nuance.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Sep 2025</span>
                        <h3>Dermatology Assist now available</h3>
                        <p>The Dermatology Assist module leverages fine‑tuned models trained on dermatologic terminology to create concise notes and patient instructions. Clinicians can dictate skin findings in natural language and receive structured assessments and plans in seconds.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Aug 2025</span>
                        <h3>ClinixSummary wins innovation award</h3>
                        <p>We’re honoured to have been recognised at the Healthcare AI Innovator Awards for our contributions to ambient documentation and clinician wellbeing. The judges highlighted our evidence‑driven approach and commitment to privacy‑first design.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">Jun 2025</span>
                        <h3>Strategic partnership with GlobalHealth Systems</h3>
                        <p>ClinixSummary has partnered with GlobalHealth Systems to deploy our AI scribe across their network of 200 hospitals. Together we’re transforming documentation workflows and elevating patient experience worldwide.</p>
                    </div>
                    <div class="text-group">
                        <span class="kicker" style="color: var(--text-secondary); font-size: 11px;">May 2025</span>
                        <h3>Series A funding to accelerate R&D</h3>
                        <p>We’re excited to announce a successful Series A financing round led by leading healthcare investors. The capital will fuel expansion into new specialties, bolster our compliance framework and scale our customer success team.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;">Want to share your story?</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">If you’ve used ClinixSummary to transform your practice, we’d love to highlight your success. Get in touch with our marketing team to be featured.</p>
                    <div class="nav-actions" style="justify-content: flex-start; margin-left: 0;">
                        <a href="#" class="btn-primary" onclick="showToast('Story submission form activated.'); return false;">Submit a story</a>
                        <a href="#contact" class="btn-outline">Contact us</a>
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
                        <p>From cost and scalability to accuracy and clinician experience, we compare AI‑powered scribes with traditional human scribes.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">checklist</div>
                        <h3>5 criteria for choosing an ambient scribe</h3>
                        <p>Accuracy, security, specialty coverage, workflow fit and cost structure – the key factors to evaluate when selecting an AI scribe solution.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">auto_awesome</div>
                        <h3>The future of ambient documentation: 2025 and beyond</h3>
                        <p>A look ahead at emerging capabilities such as predictive note suggestions, real‑time quality feedback and deeper EHR integration.</p>
                    </p>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">medical_mask</div>
                        <h3>Clinician wellbeing in the era of AI</h3>
                        <p>How ambient scribes can reduce burnout by offloading cognitive burden, and why human‑centric design remains essential.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">admin_panel_settings</div>
                        <h3>Ensuring patient privacy with AI</h3>
                        <p>We outline best practices for keeping patient data safe when implementing AI tools – from encryption to consent management.</p>
                    </a>
                    <a href="#" class="card" onclick="showToast('Reading blog post...'); return false;">
                        <div class="card-icon material-symbols-rounded">currency_exchange</div>
                        <h3>Coding essentials for clinicians</h3>
                        <p>Understanding ICD‑10 and CPT coding isn’t just for billers. We share tips on leveraging AI‑generated codes to improve claim accuracy.</p>
                    </a>
                </div>
                
                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 60px; border: 1px solid var(--border-subtle);">
                    <h4 style="font-weight: 700; font-size: 18px; margin-bottom: 15px;">Join the conversation</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">We welcome guest posts from clinicians, administrators and technologists. Share your insights and help shape the future of documentation.</p>
                    <div class="nav-actions" style="justify-content: flex-start; margin-left: 0;">
                        <a href="#" class="btn-primary" onclick="showToast('Pitching post ideas.'); return false;">Pitch a post</a>
                        <a href="#contact" class="btn-outline">Contact us</a>
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
                    <span class="kicker">Our Mission</span>
                    <h2 class="subpage-title">Putting clinicians & patients first.</h2>
                    <p class="subpage-copy">ClinixSummary exists to let healthcare professionals devote their full attention to those who matter most – their patients. We believe that documentation should empower care, not hinder it.</p>
                </div>
                
                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">diversity_2</span>
                        <h3>Our Journey: From a single idea to a platform for all</h3>
                        <p>ClinixSummary started as a project by practicing physicians frustrated with the time they spent typing instead of talking. Working nights and weekends, we built an AI scribe that could reliably capture the nuance of clinical conversations. When colleagues in dentistry, psychology and veterinary medicine asked if they could use it, we realised the need extended far beyond doctors.</p>
                        <p style="margin-top: 15px;">Today, our team spans clinicians, engineers and designers. We serve practices across medicine, dentistry, behavioural health, allied health and veterinary care. Our journey is defined by one constant: Kaizen – the Japanese principle of continuous improvement. We listen to feedback, ship updates weekly and never stop striving to make documentation invisible.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">change_circle</span>
                        <h3>What Makes Us Different: Clinician‑led, technology‑driven</h3>
                        <p>Unlike generic dictation software, ClinixSummary is built by clinicians for clinicians. Every decision we make is anchored in the realities of practice – from the need to code‑switch between languages, to the pressures of reimbursement, to the importance of seeing your patient, not your screen.</p>
                        <ul style="list-style: none; margin-top: 15px;">
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-right: 8px; color: var(--accent);">diversity_2</span> **All clinicians welcome:** Doctors, dentists, therapists, midwives, vets – our models are tuned for your specialty.</li>
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-right: 8px; color: var(--accent);">change_circle</span> **Kaizen mindset:** We ship improvements continuously, guided by your feedback. Good enough is never enough.</li>
                            <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span class="material-symbols-rounded" style="font-size: 18px; margin-right: 8px; color: var(--accent);">public</span> **Global by design:** Our platform supports multiple languages, jurisdictional privacy laws and healthcare systems.</li>
                        </ul>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 30px; border-radius: 12px; margin-top: 20px; border: 1px solid var(--border-subtle); text-align: center;">
                    <h4 style="font-weight: 700; font-size: 24px; margin-bottom: 15px;">Join us on the journey</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">Whether you're a clinician, a clinic manager or a healthcare innovator, we invite you to be part of our mission to simplify documentation for all.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Trial started!'); return false;">Start free trial</a>
                        <a href="#contact" class="btn-outline">Contact us</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// --- Router Implementation ---

const routes = {
    '#home': HomePage,
    '#pricing': HomePage, // Anchor jump to section
    '#clinicians': CliniciansPage, // NEW ROUTE
    '#insurers': InsurersPage, // NEW ROUTE
    '#security': SecurityPage,
    '#organizations': OrganizationsPage,
    '#publications': PublicationsPage,
    '#news': NewsPage,
    '#blog': BlogPage,
    '#story': StoryPage,
    '#contact': HomePage, // Anchor jump to footer
    '': HomePage,
};

function router() {
    const hash = window.location.hash || '#home';
    const pageFn = routes[hash];
    
    if (pageFn) {
        APP_CONTENT.innerHTML = pageFn();
        window.scrollTo(0, 0); // Scroll to top on page change
        
        // Special handling for anchors within the same page (Home)
        if (hash === '#pricing' || hash === '#contact' || hash === '#roi-calculator') {
             setTimeout(() => {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
        
        // Re-initialize calculator functions if needed
        if (hash === '#home' || hash === '#pricing' || hash === '#roi-calculator') {
            // Timeout ensures DOM is fully painted before running calculations
            setTimeout(calculateSavings, 10); 
        }
    } else {
        APP_CONTENT.innerHTML = '<h2>404 Page Not Found</h2>';
    }
    
    // Highlight active link
    document.querySelectorAll('.nav-menu a.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
    // Handle active state for top-level dropdown triggers which might not have a direct hash link
     document.querySelectorAll('.nav-item').forEach(item => {
        const navLink = item.querySelector('.nav-link');
        const isDropdownTrigger = navLink && !navLink.getAttribute('href');
        
        if (isDropdownTrigger) {
            const dropdownItems = item.querySelectorAll('.dropdown-item');
            let isActive = false;
            dropdownItems.forEach(dropLink => {
                // Check if any dropdown item link matches the current hash
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
    // Check if the menu is currently visible (based on inline style set by this function)
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
        // Reset styles to hide it
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

// Hide menu on resize if it's too big (basic responsive hack)
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        // If larger than mobile breakpoint, ensure default desktop display is restored
        navMenu.style.display = 'flex'; // Explicitly set to desktop default
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
        // If switching back to mobile view, ensure it respects the JS toggle state (usually hidden)
        // This line prevents the menu from popping open after resizing from desktop down to mobile
        if (navMenu.style.position !== 'absolute') {
            navMenu.style.display = 'none';
        }
    }
});
