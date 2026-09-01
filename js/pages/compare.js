/**
 * Comparison pages — ClinixSummary vs <competitor> (SEO PR5).
 *
 * English-only by design (comparison searches are overwhelmingly English, and
 * competitive claims stay in one reviewable language). Every competitor fact is
 * sourced from the competitor's own public materials and dated; see the
 * disclaimer rendered on each page. Non-disparaging, nominative use only.
 */

// SINGLE source for the verification date (plan 4.5): the display string,
// the in-data "as of" phrases (via AS_OF below) and the machine-readable
// dateModified in facts.json (comparisons.factsVerifiedISO - keep in sync
// when re-verifying) all derive from this pair.
const COMPARE_VERIFIED = 'August 2026';
const AS_OF = `as of ${COMPARE_VERIFIED}`;

const COMPARE_CS_FACTS = {
    verticals: '13 dedicated consoles, including veterinary, physiotherapy, occupational therapy, speech & language and nutrition',
    languages: 'Notes in 6 languages (English, Spanish, Portuguese, Italian, French, Arabic) + bilingual English–Arabic patient leaflets',
    pricing: 'Free plan plus transparent self-serve tiers',
    compliance: 'HIPAA & GDPR aligned · registered with the MHRA as a Class I medical device (UKCA marked)',
    platforms: 'Web console + iOS and Android apps',
};

const COMPARE_DIMENSIONS = [
    ['verticals', 'Beyond human medicine'],
    ['languages', 'Note languages'],
    ['pricing', 'Pricing model'],
    ['compliance', 'Regulatory & compliance'],
    ['platforms', 'Platforms'],
];

function comparisonTable(name, theirFacts) {
    const rows = COMPARE_DIMENSIONS.map(([key, label]) => `
                        <tr>
                            <td style="font-weight: 600;">${label}</td>
                            <td>${COMPARE_CS_FACTS[key]}</td>
                            <td>${theirFacts[key]}</td>
                        </tr>`).join('');
    return `
                <div style="overflow-x: auto; margin-bottom: 60px;">
                    <table class="subprocessor-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>ClinixSummary</th>
                                <th>${name}</th>
                            </tr>
                        </thead>
                        <tbody>${rows}
                        </tbody>
                    </table>
                </div>`;
}

function comparisonFaq(faqs) {
    const items = faqs.map(([q, a]) => `
                <div class="text-group" style="border-bottom: none;">
                    <h3 data-faq-q>${q}</h3>
                    <p class="section-copy" data-faq-a>${a}</p>
                </div>`).join('');
    return `
                <div style="margin-bottom: 40px;">
                    <h2 class="section-title">Common questions</h2>
                    <div class="grid-2">${items}
                    </div>
                </div>`;
}

function comparisonCta() {
    return `
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 40px; border-radius: 12px; margin-top: 20px;">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 20px;">See the difference on your own dictation.</h2>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary);" onclick="window.open('${typeof BASE_PATH !== 'undefined' ? BASE_PATH : ''}/console', '_blank')">Start Free</a>
                        <a href="/contact" class="btn-outline" style="border-color: rgba(255,255,255,0.4); color: #fff;">Talk to us</a>
                    </div>
                </div>`;
}

function comparisonDisclaimer(name) {
    return `
                <p class="section-copy" style="font-size: 13px; color: var(--text-secondary); margin-top: 32px;">
                    Competitor information compiled from ${name}'s public website and materials, last verified ${COMPARE_VERIFIED}; features and pricing may have changed — always confirm with the vendor.
                    ${name} is a trademark of its respective owner; its use here is for identification and comparison only. ${name} is not affiliated with and does not endorse ClinixSummary.
                </p>`;
}

function createComparisonPage(cfg) {
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Compare AI Medical Scribes</span>
                    <h1 class="subpage-title">ClinixSummary vs ${cfg.name}</h1>
                    <p class="subpage-copy">${cfg.intro}</p>
                </div>

                ${comparisonTable(cfg.name, cfg.facts)}

                <div style="margin-bottom: 60px;">
                    <h2 class="section-title">Why clinicians choose ClinixSummary</h2>
                    <div class="grid-3">${cfg.why.map(([t, d]) => `
                        <div class="text-group" style="border-bottom: none;">
                            <h3>${t}</h3>
                            <p class="section-copy">${d}</p>
                        </div>`).join('')}
                    </div>
                </div>

                ${comparisonFaq(cfg.faqs)}
                ${comparisonCta()}
                ${comparisonDisclaimer(cfg.name)}
            </div>
        </section>`;
}

function ComparePage() {
    const cards = COMPARE_PAGES.map(c => `
                    <a class="card" href="/clinixsummary-vs-${c.slug}/" style="text-decoration: none; color: inherit;">
                        <div class="card-icon material-symbols-rounded">compare_arrows</div>
                        <h3>ClinixSummary vs ${c.name}</h3>
                        <p>${c.cardLine}</p>
                    </a>`).join('');
    return `
        <section class="subpage-container">
            <div class="page-width">
                <div class="subpage-header">
                    <span class="kicker">Compare</span>
                    <h1 class="subpage-title">How ClinixSummary Compares.</h1>
                    <p class="subpage-copy">Choosing an AI medical scribe is a clinical decision. These side-by-side comparisons cover what usually decides it — specialty coverage beyond human medicine, note languages, pricing transparency, regulatory posture and platforms — with competitor details taken from their own public materials.</p>
                </div>
                <div class="grid-3" style="margin-bottom: 60px;">${cards}
                </div>
                ${comparisonFaq([
                    ['How were these comparisons compiled?', `From each vendor's own public website and materials, last verified ${COMPARE_VERIFIED}. Where something could not be verified, it is not stated. Vendors change features and pricing — always confirm current details with them.`],
                    ['What makes ClinixSummary different in one sentence?', 'Thirteen dedicated clinical consoles — including veterinary, physiotherapy, occupational therapy, speech & language and nutrition — producing structured notes in six languages, from a product registered with the MHRA as a Class I medical device (UKCA marked).'],
                    ['Is there a free plan?', 'Yes. ClinixSummary has a free plan and transparent self-serve pricing, so you can evaluate it on your own dictation before paying anything.'],
                    ['Can I switch from another scribe?', 'Yes. There is no lock-in: sign up, pick your console, and your first structured note is seconds away. Your notes remain yours to export.'],
                ])}
                ${comparisonCta()}
                <p class="section-copy" style="font-size: 13px; color: var(--text-secondary); margin-top: 32px;">
                    All third-party product names are trademarks of their respective owners, used for identification and comparison only; no affiliation or endorsement is implied. Competitor details compiled from each vendor's public materials, last verified ${COMPARE_VERIFIED}.
                </p>
            </div>
        </section>`;
}

const COMPARE_DATA = {
  "heidi": {
    "name": "Heidi Health",
    "slug": "heidi",
    "cardLine": "Freemium scribe with broad specialty coverage — compared on consoles, languages, pricing and regulation.",
    "intro": "Heidi Health is one of the most widely adopted AI scribes, with broad specialty coverage and a freemium model. Here is how ClinixSummary and Heidi compare on the dimensions that usually decide the choice — specialty depth, note languages, pricing, regulatory posture and platforms — with Heidi's details taken from its own public materials.",
    "facts": {
      "verticals": "Broad coverage including veterinary and allied health (occupational therapy, speech pathology, physiotherapy, dietitians)",
      "languages": "States 110+ languages for transcribing visits; its docs list note and document generation languages without a headline figure",
      "pricing": "Free plan + public tiers (US Clinician $150/mo, or $110/mo billed annually); Enterprise via sales",
      "compliance": "SOC 2 Type 2 and ISO 27001 certified; HIPAA and GDPR compliant",
      "platforms": "Web, iOS and Android"
    },
    "why": [
      [
        "Discipline-native note structures",
        "ClinixSummary consoles write the way each profession documents — ADIME for nutrition, SOAP with ROM/MMT for physiotherapy, species-aware records for veterinary."
      ],
      [
        "Native-language notes",
        "The full note and every module can be generated natively in six languages, including complete Arabic output and a bilingual English–Arabic patient leaflet."
      ],
      [
        "Registered as a medical device",
        "ClinixSummary is registered with the MHRA as a Class I medical device and carries UKCA marking — a registration Heidi's public compliance materials did not state " + AS_OF + "."
      ]
    ],
    "faqs": [
      [
        "Is ClinixSummary a Heidi alternative?",
        "Yes. Both serve clinicians beyond human medicine, including veterinary and allied health. The practical differences are in note-language output (ClinixSummary generates the full note natively in six languages, including Arabic), discipline-native note structures such as ADIME, and medical-device registration (MHRA Class I, UKCA marked)."
      ],
      [
        "Which is cheaper?",
        "Both publish pricing and offer a free plan. Heidi's US Clinician tier is listed at $150/month ($110/month billed annually) " + AS_OF + "; ClinixSummary publishes a free plan and its self-serve tiers on its pricing page. Always check both pricing pages for current figures."
      ],
      [
        "Do both cover veterinary and physiotherapy?",
        "Yes — both list veterinary and allied-health disciplines. ClinixSummary gives each discipline its own console with a purpose-built note structure and terminology, including dedicated occupational therapy, speech & language and nutrition consoles."
      ],
      [
        "Which languages can the note itself be written in?",
        "Heidi states 110+ languages for transcribing the visit, and its documentation lists note and document generation languages. ClinixSummary generates the complete note and all modules natively in English, Spanish, Portuguese, Italian, French and Arabic, plus a bilingual English–Arabic patient leaflet mode."
      ]
    ]
  },
  "freed": {
    "name": "Freed",
    "slug": "freed",
    "cardLine": "Popular US clinician scribe — compared on verticals, note languages, pricing and regulation.",
    "intro": "Freed is a popular AI scribe among US clinicians, known for simplicity and transparent pricing. Here is how ClinixSummary and Freed compare — with Freed's details taken from its own public materials.",
    "facts": {
      "verticals": "Lists human medical specialties; no veterinary or allied-health offering listed",
      "languages": "Captures visits in 90+ languages; the final note is generated in English",
      "pricing": "Public tiers $39/mo (40 notes/month), $79/mo unlimited, $104–$119/mo Premier; 7-day free trial; groups via sales",
      "compliance": "HIPAA and HITECH compliant; SOC 2 Type 2 certified",
      "platforms": "Web, iOS, Android and a Chrome extension"
    },
    "why": [
      [
        "Beyond human medicine",
        "Thirteen dedicated consoles include veterinary, physiotherapy, occupational therapy, speech & language and nutrition — disciplines with no listed offering at Freed."
      ],
      [
        "Notes in your language",
        "Freed generates the final note in English. ClinixSummary writes the entire note natively in six languages, including full Arabic and a bilingual English–Arabic patient leaflet."
      ],
      [
        "Registered as a medical device",
        "ClinixSummary is registered with the MHRA as a Class I medical device and carries UKCA marking — a registration Freed's public compliance materials did not state " + AS_OF + "."
      ]
    ],
    "faqs": [
      [
        "Is ClinixSummary a Freed alternative?",
        "Yes — particularly if you need coverage beyond human medicine (veterinary, physiotherapy, OT, speech & language, nutrition), notes written natively in a language other than English, or a scribe registered as a medical device."
      ],
      [
        "Does Freed support veterinary or physiotherapy?",
        "As of August 2026, Freed's site lists human medical specialties only, with no veterinary or allied-health offering. ClinixSummary has dedicated consoles for both."
      ],
      [
        "Can either write the note itself in Spanish or Arabic?",
        "Freed states visits can be spoken in 90+ languages with the final note generated in English. ClinixSummary generates the full note natively in Spanish, Portuguese, Italian, French and Arabic as well as English."
      ],
      [
        "How do prices compare?",
        "Both publish self-serve pricing with a free way to start: Freed lists $39–$119/month tiers with a 7-day trial; ClinixSummary offers a free plan plus published tiers. Check both pricing pages for current figures."
      ]
    ]
  },
  "nabla": {
    "name": "Nabla",
    "slug": "nabla",
    "cardLine": "Enterprise-grade multilingual scribe — compared on languages, pricing transparency and regulation.",
    "intro": "Nabla is a strong multilingual scribe with an enterprise-grade compliance stack and wide specialty coverage. Here is how ClinixSummary and Nabla compare — with Nabla's details taken from its own public materials.",
    "facts": {
      "verticals": "Lists ~57 supported specialties in its help center, including veterinary, physiotherapy and nutrition",
      "languages": "Supports 35+ languages, including four Arabic dialects",
      "pricing": "No public pricing page; free self-serve signup, paid pricing not published",
      "compliance": "SOC 2 Type II and ISO 27001 certified; HIPAA and GDPR compliant",
      "platforms": "Web, iOS, Android, Chrome extension; EHR-embedded deployments"
    },
    "why": [
      [
        "Transparent self-serve pricing",
        "ClinixSummary publishes its plans, including a free tier — no sales call needed to know what you will pay."
      ],
      [
        "Discipline-native note structures",
        "Each console writes the way its profession documents — ADIME for nutrition, ROM/MMT-structured physiotherapy notes, species-aware veterinary records."
      ],
      [
        "Registered as a medical device",
        "ClinixSummary is registered with the MHRA as a Class I medical device and carries UKCA marking — a registration Nabla's public compliance materials did not state " + AS_OF + "."
      ]
    ],
    "faqs": [
      [
        "Is ClinixSummary a Nabla alternative?",
        "Yes. Both are multilingual and cover disciplines beyond human medicine. The practical differences are pricing transparency (ClinixSummary publishes its tiers; Nabla publishes no pricing), discipline-native note structures, and medical-device registration (MHRA Class I, UKCA marked)."
      ],
      [
        "How do the language capabilities differ?",
        "Nabla supports 35+ languages including four Arabic dialects. ClinixSummary generates the complete note and all modules natively in six languages — including full Arabic output and a bilingual English–Arabic patient leaflet mode."
      ],
      [
        "Which has the stronger compliance certifications?",
        "Nabla states SOC 2 Type II and ISO 27001 certifications, plus HIPAA and GDPR compliance. ClinixSummary is HIPAA and GDPR aligned and is additionally registered with the MHRA as a Class I medical device (UKCA marked); Nabla's public compliance materials did not state a medical-device registration " + AS_OF + "."
      ],
      [
        "Can I just sign up and try both?",
        "Both offer a free way to start. ClinixSummary additionally publishes its full pricing, so you can evaluate total cost without a sales conversation."
      ]
    ]
  },
  "suki": {
    "name": "Suki",
    "slug": "suki",
    "cardLine": "Enterprise voice assistant with deep EHR ties — compared on pricing, verticals and regulation.",
    "intro": "Suki is an enterprise-oriented AI voice assistant known for deep EHR integrations. Here is how ClinixSummary and Suki compare — with Suki's details taken from its own public materials.",
    "facts": {
      "verticals": "Claims 100+ specialties for human medical clinicians; no physiotherapy or nutrition offering listed; veterinary referenced only via an SDK partner integration",
      "languages": "States support for 80 languages in conversation; the note is created in English",
      "pricing": "No public pricing; demo and sales-led",
      "compliance": "SOC 2 Type 2 certified; HIPAA compliant",
      "platforms": "Web/desktop, iOS and Android"
    },
    "why": [
      [
        "Self-serve from day one",
        "No demos or procurement cycles: a free plan and published tiers mean a clinician can try ClinixSummary on real dictation today."
      ],
      [
        "Beyond human medicine",
        "Dedicated consoles for veterinary, physiotherapy, occupational therapy, speech & language and nutrition — with no equivalent dedicated Suki offering listed."
      ],
      [
        "Notes in your language",
        "Suki creates the note in English. ClinixSummary writes the entire note natively in six languages, including full Arabic and a bilingual English–Arabic patient leaflet."
      ]
    ],
    "faqs": [
      [
        "Is ClinixSummary a Suki alternative?",
        "For individual clinicians and clinics, yes: self-serve signup, a free plan and published pricing versus a sales-led enterprise motion. For health systems standardising on deep in-EHR embedding, evaluate both against your integration needs."
      ],
      [
        "Does Suki cover physiotherapy, nutrition or veterinary?",
        "As of August 2026, Suki's site lists human medical specialties, with no physiotherapy or nutrition offering; veterinary appears only via an SDK partner integration. ClinixSummary has dedicated consoles for all three."
      ],
      [
        "Can either write the note in another language?",
        "Suki states conversations can happen in 80 languages with the note created in English. ClinixSummary generates the full note natively in six languages including Arabic."
      ],
      [
        "What about regulation?",
        "Suki states SOC 2 Type 2 certification and HIPAA compliance. ClinixSummary is HIPAA and GDPR aligned and registered with the MHRA as a Class I medical device (UKCA marked)."
      ]
    ]
  },
  "deepscribe": {
    "name": "DeepScribe",
    "slug": "deepscribe",
    "cardLine": "Specialty-care ambient scribe (oncology flagship) — compared on access, platforms and regulation.",
    "intro": "DeepScribe is an ambient AI scribe focused on specialty care, with oncology as its flagship. Here is how ClinixSummary and DeepScribe compare — with DeepScribe's details taken from its own public materials.",
    "facts": {
      "verticals": "Human medical, specialty-care focus (oncology flagship); no veterinary or allied-health offering listed",
      "languages": "States patient conversations in 110+ languages; note-output language not stated",
      "pricing": "No public pricing; demo and sales-only",
      "compliance": "States HIPAA adherence; SOC 2 referenced on its site",
      "platforms": "Web and iOS; no Android app listed"
    },
    "why": [
      [
        "Try it today, on any device",
        "Free plan, published pricing, and apps on web, iOS and Android — including Android, which DeepScribe does not list."
      ],
      [
        "Thirteen dedicated consoles",
        "From general medicine to veterinary, physiotherapy, OT, speech & language and nutrition — each with a purpose-built note structure."
      ],
      [
        "Notes in your language",
        "DeepScribe does not state which languages its notes are written in. ClinixSummary writes the entire note natively in six languages, including full Arabic and a bilingual English–Arabic patient leaflet."
      ]
    ],
    "faqs": [
      [
        "Is ClinixSummary a DeepScribe alternative?",
        "For clinicians outside enterprise specialty-care deployments, yes: self-serve signup, a free plan, published pricing, Android support and coverage beyond human medicine."
      ],
      [
        "Does DeepScribe work on Android?",
        "As of August 2026, DeepScribe lists a web app and an iOS app; no Android app is listed. ClinixSummary runs on web, iOS and Android."
      ],
      [
        "Which specialties do they focus on?",
        "DeepScribe focuses on specialty care with oncology as its flagship. ClinixSummary spans thirteen consoles from general medicine to veterinary, physiotherapy, OT, speech & language and nutrition."
      ],
      [
        "What about languages and regulation?",
        "DeepScribe states patient conversations in 110+ languages and HIPAA adherence, with SOC 2 referenced on its site. ClinixSummary writes notes natively in six languages and is registered with the MHRA as a Class I medical device (UKCA marked)."
      ]
    ]
  }
};

const COMPARE_PAGES = [COMPARE_DATA.heidi, COMPARE_DATA.freed, COMPARE_DATA.nabla, COMPARE_DATA.suki, COMPARE_DATA.deepscribe];

function CompareHeidiPage() { return createComparisonPage(COMPARE_DATA.heidi); }
function CompareFreedPage() { return createComparisonPage(COMPARE_DATA.freed); }
function CompareNablaPage() { return createComparisonPage(COMPARE_DATA.nabla); }
function CompareSukiPage() { return createComparisonPage(COMPARE_DATA.suki); }
function CompareDeepscribePage() { return createComparisonPage(COMPARE_DATA.deepscribe); }
