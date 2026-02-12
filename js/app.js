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
        const loc = (typeof I18n !== 'undefined' && I18n.locale) || 'en';
        if (slider.id === 'annual-salary') {
            displayElement.textContent = new Intl.NumberFormat(loc, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        } else if (slider.id === 'work-days') {
            displayElement.textContent = `${value} ${t('calculator.days_unit', 'Days')}`;
        } else if (slider.id === 'num-clinicians') {
            const label = value > 1 ? t('calculator.clinician_plural', 'Clinicians') : t('calculator.clinician_singular', 'Clinician');
            displayElement.textContent = `${value} ${label}`;
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

    const loc = (typeof I18n !== 'undefined' && I18n.locale) || 'en';
    const formattedHours = totalAnnualHoursSaved.toFixed(0);
    const formattedMonetarySavings = new Intl.NumberFormat(loc, {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(totalAnnualMonetarySavings);

    annualHoursElement.textContent = `${formattedHours} ${t('calculator.hours_unit', 'hrs')}`;
    monetarySavingsElement.textContent = formattedMonetarySavings;

    const hoursSubtext = annualHoursElement.nextElementSibling;
    if (hoursSubtext) {
         const subtextTemplate = t('calculator.workdays_subtext', 'Equivalent to {0} extra workdays regained across the team.');
         hoursSubtext.textContent = subtextTemplate.replace('{0}', totalWorkDaysRegained);
    }

    updateDisplay(salaryInput);
    updateDisplay(workDaysInput);
    updateDisplay(numCliniciansInput);
}

// --- Router Implementation ---

const routes = {
    // Home
    '#home':               HomePage,
    '#pricing':            HomePage,
    '#contact':            HomePage,
    '':                    HomePage,

    // Meet ClinixSummary
    '#meticulous-notes':   MeticulousNotesPage,
    '#proprietary-models': ProprietaryModelsPage,
    '#kaizen':             KaizenPage,
    '#security':           SecurityPage,
    '#languages':          LanguagesPage,
    '#portfolio-builder':  PortfolioBuilderPage,
    '#auto-ambient':       AutoAmbientPage,
    '#cme-vault':          CMEVaultPage,
    '#clinix-foundation':  ClinixFoundationPage,

    // Solutions
    '#clinicians':         CliniciansPage,
    '#organizations':      OrganizationsPage,
    '#insurers':           InsurersPage,
    '#government':         GovernmentPage,
    '#nonprofit':          NonprofitPage,
    '#integrations':       IntegrationsPage,

    // Capabilities
    '#cap-medical':        CapMedicalPage,
    '#cap-dental':         CapDentalPage,
    '#cap-psychiatry':     CapPsychiatryPage,
    '#cap-psychology':     CapPsychologyPage,
    '#cap-allied-health':  CapAlliedHealthPage,
    '#cap-midwifery':      CapMidwiferyPage,
    '#cap-vet':            CapVetPage,
    '#cap-operative':      CapOperativePage,
    '#billing-assist':     BillingAssistPage,
    '#cap-patient-leaflet': CapPatientLeafletPage,
    '#referrals':          ReferralsPage,
    '#icd-coding':         ICDCodingPage,

    // Learn
    '#publications':       PublicationsPage,
    '#whitepapers':        WhitepapersPage,
    '#case-studies':       CaseStudiesPage,
    '#news':               NewsPage,
    '#blog':               PodcastsPage,

    // Other
    '#careers':            CareersPage,
    '#story':              StoryPage,
    '#privacy-policy':     PrivacyPolicyPage,
    '#privacy-choices':    PrivacyChoicesPage,
    '#terms-enterprise':   TermsEnterprisePage,
    '#usage-policy':       UsagePolicyPage,
    '#roi-calculator':     HomePage,
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

// --- Initialize ---
document.addEventListener('DOMContentLoaded', async () => {
    await I18n.init();
    router();
    window.addEventListener('hashchange', router);
});
