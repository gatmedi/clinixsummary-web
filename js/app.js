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

// --- Path helpers (GitHub Pages subpath awareness) ---
function stripBase(pathname) {
    const bp = window.BASEPATH || '';
    let raw = pathname || '/';
    if (bp && raw.startsWith(bp)) raw = raw.slice(bp.length) || '/';
    // Normalise trailing slash — prerendered pages are served as <slug>/index.html,
    // so /pricing/ must resolve to the same route as /pricing.
    if (raw.length > 1 && raw.endsWith('/')) raw = raw.slice(0, -1) || '/';
    return raw;
}

// --- Router Implementation ---

const routes = {
    // Home
    '/':                   HomePage,
    '/pricing':            PricingPage,
    '/whitepapers/arabic-medical-nlp': () => WhitepaperArticlePage('arabic-medical-nlp'),
    '/whitepapers/gdpr-clinical-documentation': () => WhitepaperArticlePage('gdpr-clinical-documentation'),
    '/whitepapers/ambient-audio-processing': () => WhitepaperArticlePage('ambient-audio-processing'),
    '/whitepapers/quality-management-system': () => WhitepaperArticlePage('quality-management-system'),
    '/whitepapers/security-compliance-specification': () => WhitepaperArticlePage('security-compliance-specification'),
    '/whitepapers/ehr-integration-framework': () => WhitepaperArticlePage('ehr-integration-framework'),
    '/whitepapers/clinical-model-training': () => WhitepaperArticlePage('clinical-model-training'),
    '/whitepapers/architecture-overview': () => WhitepaperArticlePage('architecture-overview'),
    '/contact':            ContactPage,

    // Meet ClinixSummary
    '/ai-clinical-notes':   MeticulousNotesPage,
    '/proprietary-models': ProprietaryModelsPage,
    '/kaizen':             KaizenPage,
    '/security':           SecurityPage,
    '/multilingual-ai-scribe':          LanguagesPage,
    '/ambient-ai-scribe':       AutoAmbientPage,
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
    '/ai-medical-scribe':        CapMedicalPage,
    '/dental-ai-scribe':         CapDentalPage,
    '/psychiatry-ai-scribe':     CapPsychiatryPage,
    '/psychology-ai-scribe':     CapPsychologyPage,
    '/allied-health-ai-scribe':  CapAlliedHealthPage,
    '/physiotherapy-ai-scribe': PhysioPage,
    '/occupational-therapy-ai-scribe': OTPage,
    '/speech-therapy-ai-scribe': SLTPage,
    '/nutrition-ai-scribe':    NutritionPage,
    '/midwifery-ai-scribe':      CapMidwiferyPage,
    '/veterinary-ai-scribe':            CapVetPage,
    '/operative-note-ai':      CapOperativePage,
    '/medical-billing-ai':     BillingAssistPage,
    '/patient-leaflet-generator': CapPatientLeafletPage,
    '/referral-letter-ai':          ReferralsPage,
    '/icd-coding':         ICDCodingPage,
    '/radiology-ai':   RadiologyAssistPage,
    '/dermatology-ai': DermatologyAssistPage,
    '/medical-triage-ai':      TriageAssistPage,

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

    // Help & Support
    '/status':             StatusPage,

    // Compare (EN-only)
    '/compare':                    ComparePage,
    '/clinixsummary-vs-heidi':     CompareHeidiPage,
    '/clinixsummary-vs-freed':     CompareFreedPage,
    '/clinixsummary-vs-nabla':     CompareNablaPage,
    '/clinixsummary-vs-suki':      CompareSukiPage,
    '/clinixsummary-vs-deepscribe': CompareDeepscribePage,
};

function router() {
    const path = stripBase(window.location.pathname);
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

        if (path === '/pricing') {
            initPricingCurrency();
        }
        if (path === '/roi-calculator') {
             setTimeout(() => {
                const sectionId = path.substring(1); // remove leading /
                const target = document.getElementById(sectionId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }

        if (path === '/' || path === '/roi-calculator') {
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
    const bp = window.BASEPATH || '';
    // Prerendered pages carry locale-prefixed hrefs (e.g. /fr/pricing/) which
    // already include the base path — don't prefix those twice.
    const target = (bp && (href === bp || href.startsWith(bp + '/'))) ? href : bp + href;
    if (stripBase(target) !== stripBase(location.pathname)) {
        history.pushState(null, '', target);
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
    // Signal (used by the SSG prerenderer and any diagnostics) that the app
    // has fully booted and rendered its first route.
    document.documentElement.setAttribute('data-app-ready', '1');
});
