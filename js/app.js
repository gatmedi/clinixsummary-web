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
        const intlLoc = loc === 'ar' ? 'ar-u-nu-arab' : loc;
        if (slider.id === 'annual-salary') {
            displayElement.textContent = new Intl.NumberFormat(intlLoc, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        } else if (slider.id === 'work-days') {
            const nf = new Intl.NumberFormat(intlLoc);
            displayElement.textContent = `${nf.format(value)} ${t('calculator.days_unit', 'Days')}`;
        } else if (slider.id === 'num-clinicians') {
            const nf = new Intl.NumberFormat(intlLoc);
            const label = value > 1 ? t('calculator.clinician_plural', 'Clinicians') : t('calculator.clinician_singular', 'Clinician');
            displayElement.textContent = `${nf.format(value)} ${label}`;
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
    const intlLoc = loc === 'ar' ? 'ar-u-nu-arab' : loc;
    const nf = new Intl.NumberFormat(intlLoc);
    const formattedHours = nf.format(Math.round(totalAnnualHoursSaved));
    const formattedMonetarySavings = new Intl.NumberFormat(intlLoc, {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(totalAnnualMonetarySavings);

    annualHoursElement.textContent = `${formattedHours} ${t('calculator.hours_unit', 'hrs')}`;
    monetarySavingsElement.textContent = formattedMonetarySavings;

    const hoursSubtext = annualHoursElement.nextElementSibling;
    if (hoursSubtext) {
         const subtextTemplate = t('calculator.workdays_subtext', 'Equivalent to {0} extra workdays regained across the team.');
         hoursSubtext.textContent = subtextTemplate.replace('{0}', nf.format(totalWorkDaysRegained));
    }

    updateDisplay(salaryInput);
    updateDisplay(workDaysInput);
    updateDisplay(numCliniciansInput);
}

// --- Router Implementation ---

const routes = {
    // Home
    '/':                   HomePage,
    '/pricing':            HomePage,
    '/contact':            ContactPage,

    // Meet ClinixSummary
    '/meticulous-notes':   MeticulousNotesPage,
    '/proprietary-models': ProprietaryModelsPage,
    '/kaizen':             KaizenPage,
    '/security':           SecurityPage,
    '/languages':          LanguagesPage,
    '/auto-ambient':       AutoAmbientPage,
    '/cme-vault':          CMEVaultPage,
    '/clinix-foundation':  ClinixFoundationPage,

    // Solutions
    '/clinicians':         CliniciansPage,
    '/organizations':      OrganizationsPage,
    '/insurers':           InsurersPage,
    '/government':         GovernmentPage,
    '/nonprofit':          NonprofitPage,
    '/integrations':       IntegrationsPage,

    // Capabilities
    '/cap-medical':        CapMedicalPage,
    '/cap-dental':         CapDentalPage,
    '/cap-psychiatry':     CapPsychiatryPage,
    '/cap-psychology':     CapPsychologyPage,
    '/cap-allied-health':  CapAlliedHealthPage,
    '/cap-midwifery':      CapMidwiferyPage,
    '/cap-vet':            CapVetPage,
    '/cap-operative':      CapOperativePage,
    '/billing-assist':     BillingAssistPage,
    '/cap-patient-leaflet': CapPatientLeafletPage,
    '/referrals':          ReferralsPage,
    '/icd-coding':         ICDCodingPage,
    '/radiology-assist':   RadiologyAssistPage,
    '/dermatology-assist': DermatologyAssistPage,
    '/triage-assist':      TriageAssistPage,

    // Learn
    '/publications':       PublicationsPage,
    '/whitepapers':        WhitepapersPage,
    '/case-studies':       CaseStudiesPage,
    '/news':               NewsPage,

    // Other
    '/careers':            CareersPage,
    '/story':              StoryPage,
    '/privacy-policy':     PrivacyPolicyPage,
    '/privacy-choices':    PrivacyChoicesPage,
    '/terms-enterprise':   TermsEnterprisePage,
    '/usage-policy':       UsagePolicyPage,
    '/baa':                BAAPage,
    '/dpa':                DPAPage,
    '/terms':              TermsPage,
    '/leaflet':            LeafletPage,
    '/roi-calculator':     HomePage,
};

function router() {
    const path = window.location.pathname || '/';
    const pageFn = routes[path];

    if (pageFn) {
        // Page transition: re-trigger fadeIn animation
        APP_CONTENT.style.animation = 'none';
        APP_CONTENT.offsetHeight; // force reflow
        APP_CONTENT.style.animation = '';

        APP_CONTENT.innerHTML = pageFn();

        // Apply i18n translations to the newly rendered content
        if (typeof I18n !== 'undefined' && I18n.ready) {
            I18n.translatePage();
            I18n.handleNonTranslatedRoute(path);
        }

        // Update document title, meta tags, canonical URL and social cards
        if (typeof SEO !== 'undefined') SEO.updatePageMeta(path);

        window.scrollTo(0, 0);

        // Focus management: move focus to main content heading after route change
        requestAnimationFrame(() => {
            const heading = APP_CONTENT.querySelector('h1, h2, .subpage-title');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                heading.focus({ preventScroll: true });
            }
        });

        if (path === '/pricing' || path === '/roi-calculator') {
             setTimeout(() => {
                const sectionId = path.substring(1); // remove leading /
                const target = document.getElementById(sectionId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }

        if (path === '/' || path === '/pricing' || path === '/roi-calculator') {
            setTimeout(calculateSavings, 10);
        }

    } else {
        APP_CONTENT.innerHTML = '<h2>404 Page Not Found</h2>';
    }

    document.querySelectorAll('.nav-menu a.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
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
                if (dropLink.getAttribute('href') === path) {
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
const navRightGroup = document.querySelector('.nav-right-group');
const navbarContent = document.querySelector('.navbar-content');

function closeMobileMenu() {
    navRightGroup.classList.remove('mobile-open');
    mobileToggle.textContent = 'menu';
    mobileToggle.setAttribute('aria-expanded', 'false');
}

function toggleMobileMenu() {
    const isOpen = navRightGroup.classList.toggle('mobile-open');
    mobileToggle.textContent = isOpen ? 'close' : 'menu';
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
}

mobileToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu on navigation
window.addEventListener('popstate', closeMobileMenu);

// Close mobile menu when clicking outside navbar
document.addEventListener('click', (e) => {
    if (navRightGroup.classList.contains('mobile-open') &&
        !navbarContent.contains(e.target)) {
        closeMobileMenu();
    }
});

// Mobile dropdown accordion — toggle child dropdown on tap
document.querySelectorAll('.nav-item > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;
        const navItem = link.closest('.nav-item');
        const dropdown = navItem.querySelector('.dropdown');
        if (!dropdown) return;
        e.preventDefault();
        e.stopPropagation();
        // Close other open dropdowns
        document.querySelectorAll('.nav-item.mobile-dropdown-open').forEach(item => {
            if (item !== navItem) item.classList.remove('mobile-dropdown-open');
        });
        navItem.classList.toggle('mobile-dropdown-open');
        link.setAttribute('aria-expanded', String(navItem.classList.contains('mobile-dropdown-open')));
    });
});

// Close mobile menu when a dropdown link is clicked
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', closeMobileMenu);
});

// --- Global Click Interceptor for Internal Links ---
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    // Only intercept internal links (starting with /)
    if (!href || !href.startsWith('/') || a.target === '_blank') return;
    // Don't intercept if modifier keys are pressed
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (href !== location.pathname) {
        history.pushState(null, '', href);
        router();
    }
    closeMobileMenu();
});

// --- Initialize ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await I18n.init();
    } catch (err) {
        console.error('i18n initialisation failed:', err);
        // Fallback: render English content without translations
    }
    router();
    window.addEventListener('popstate', router);
});
