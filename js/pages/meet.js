// =============================================================================
// ClinixSummary — "Meet ClinixSummary" Subpages
// =============================================================================
// Eight page functions for the "Meet ClinixSummary" section.
// Each returns an HTML template string following the project's subpage
// conventions (.subpage-container, .page-width, .card, .text-group, etc.).
// =============================================================================


// ---------------------------------------------------------------------------
// 1. ProprietaryModelsPage
// ---------------------------------------------------------------------------
function ProprietaryModelsPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Header -->
                <div class="subpage-header">
                    <span class="kicker">Proprietary Clinical Models</span>
                    <h2 class="subpage-title">The most clinically fine-tuned AI models in healthcare documentation.</h2>
                    <p class="subpage-copy">ClinixSummary is powered by proprietary large language models built exclusively for clinical documentation. Trained on hundreds of thousands of hours of de-identified clinical audio spanning 40+ specialties and allied health, these models do not guess — they understand.</p>
                </div>

                <!-- Section 1 — Deep Clinical Fine-Tuning -->
                <div class="subpage-header" style="margin-top: 0;">
                    <span class="kicker" style="color: var(--text-secondary);">Section 1</span>
                    <h3 class="section-title">Deep Clinical Fine-Tuning</h3>
                    <p class="section-copy">Our models are not re-skinned general-purpose AI. They are purpose-built from the ground up on real clinical audio — hundreds of thousands of hours of de-identified recordings across every major medical, dental, behavioural health, veterinary, and allied health specialty.</p>
                </div>

                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">neurology</div>
                        <h3>40+ Specialties & Allied Health</h3>
                        <p>From cardiology and dermatology to physiotherapy, occupational therapy, and midwifery — each specialty has its own domain-tuned module. A cardiology encounter is processed differently from a dermatology consult or a physiotherapy assessment because the clinical language, documentation patterns, and coding requirements are fundamentally different.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">graphic_eq</div>
                        <h3>Trained on Real-World Audio</h3>
                        <p>Our training data includes clinicians with accents, background noise from busy clinics, interruptions, and the natural cadence of real patient encounters. We capture pauses, self-corrections, shorthand abbreviations, and multilingual code-switching — the way clinicians actually speak, not how textbooks say they should.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">hub</div>
                        <h3>Semantic Understanding, Not Keywords</h3>
                        <p>This is not keyword matching or simple transcription. Our models parse clinical semantics — understanding that "the patient's sugars have been running high" means uncontrolled hyperglycaemia, not a dietary preference. Every utterance is contextualised within the clinical encounter.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 28px 32px; border-radius: 12px; margin-bottom: 60px; border: 1px solid var(--border-subtle);">
                    <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.7; margin: 0;">
                        <span class="material-symbols-rounded" style="font-size: 20px; vertical-align: middle; margin-inline-end: 8px; color: var(--accent);">engineering</span>
                        <strong style="color: var(--text-primary);">The effort behind the models:</strong> Building and maintaining 40+ specialty-specific modules requires continuous clinical collaboration, rigorous QA, and weekly refinement cycles. Every module is validated by domain experts before deployment and continuously improved through our Kai-zen feedback loop.
                    </p>
                </div>

                <!-- Section 2 — Contextual Inference & Clinical Reasoning -->
                <div class="subpage-header">
                    <span class="kicker" style="color: var(--text-secondary);">Section 2</span>
                    <h3 class="section-title">Contextual Inference & Clinical Reasoning</h3>
                    <p class="section-copy">This is the key differentiator. Our models do not merely transcribe words — they infer clinical context from natural conversation and generate documentation that reflects clinical reasoning.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">psychology</span>
                        <h3>Implied Clinical Context</h3>
                        <p>When a clinician says "the rash spread to the trunk after starting the new medication," our model understands the implied drug reaction. It connects this observation to the medication history, flags a potential adverse drug event, and documents the temporal relationship — without the clinician having to spell it out.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">link</span> Automatically connects symptoms to medication history</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">diagnosis</span> Extends to differential diagnosis suggestions</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">receipt_long</span> Recommends ICD-10 codes based on clinical narrative</li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">verified</span>
                        <h3>Grounded in Captured Facts</h3>
                        <p>Our models never fabricate clinical information. Every inference is grounded in what was actually said during the encounter. If the clinician did not mention it, the model does not invent it. This is a non-negotiable design principle that separates ClinixSummary from general-purpose AI tools that may hallucinate clinical details.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">shield</span> Zero hallucination policy for clinical facts</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">fact_check</span> Every output traceable to source audio</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">gavel</span> Medico-legal defensibility by design</li>
                        </ul>
                    </div>
                </div>

                <!-- Section 3 — Why Proprietary Matters -->
                <div class="subpage-header">
                    <span class="kicker" style="color: var(--text-secondary);">Section 3</span>
                    <h3 class="section-title">Why Proprietary Matters</h3>
                    <p class="section-copy">Generic large language models were not built for medicine. They lack the domain depth, the privacy architecture, and the clinical rigour that healthcare documentation demands. Here is why proprietary models are essential.</p>
                </div>

                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">speed</div>
                        <h3>Sub-Second Processing</h3>
                        <p>Purpose-built inference pipelines deliver structured notes in under a second. No waiting, no lag — documentation keeps pace with the consultation.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">lock</div>
                        <h3>Privacy by Architecture</h3>
                        <p>Patient data never leaves our secure infrastructure. Unlike generic APIs, our models run on dedicated, HIPAA-compliant compute with zero data sharing.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">trending_up</div>
                        <h3>Continuously Learning</h3>
                        <p>Through our Kai-zen programme, models are updated weekly — incorporating clinician feedback, new terminology, and evolving clinical guidelines.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">deployed_code</div>
                        <h3>Multi-Specialty Depth</h3>
                        <p>40+ specialty modules including allied health. Each module understands the unique terminology, documentation patterns, and coding requirements of its domain.</p>
                    </div>
                </div>

                <!-- Section 4 — Allied Health Coverage -->
                <div class="subpage-header">
                    <span class="kicker" style="color: var(--text-secondary);">Section 4</span>
                    <h3 class="section-title">Allied Health Coverage</h3>
                    <p class="section-copy">Clinical AI should not be limited to physicians. Our models explicitly cover allied health disciplines — each with its own documentation patterns, terminology, and outcome measures that differ fundamentally from medical specialties.</p>
                </div>

                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">accessibility_new</div>
                        <h3>Physiotherapy</h3>
                        <p>ROM assessments, functional outcome measures, exercise prescription documentation, and treatment progression notes with standardised physiotherapy terminology.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">back_hand</div>
                        <h3>Occupational Therapy</h3>
                        <p>ADL assessments, cognitive-perceptual evaluations, home modification recommendations, and goal-oriented treatment plans using OT-specific frameworks.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">record_voice_over</div>
                        <h3>Speech & Language Therapy</h3>
                        <p>Articulation assessments, fluency disorder documentation, swallowing evaluations, and language development tracking with SLT-specific scoring systems.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">pregnant_woman</div>
                        <h3>Midwifery</h3>
                        <p>Antenatal visit documentation, birth plans, labour progress notes, and postnatal assessments following midwifery-specific documentation standards and continuity models.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">restaurant</div>
                        <h3>Nutritional Therapy</h3>
                        <p>Dietary assessments, nutritional risk screening, meal plan documentation, and micronutrient tracking with clinical nutrition terminology and evidence-based frameworks.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">add_circle</div>
                        <h3>And More</h3>
                        <p>Podiatry, audiology, optometry, clinical psychology, social work, and other allied health disciplines — each with domain-tuned modules reflecting their unique clinical language.</p>
                    </div>
                </div>

                <!-- CTA Banner -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 48px 40px; border-radius: 12px; margin-top: 20px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 16px;">Experience the difference proprietary models make.</h2>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; max-width: 560px; margin: 0 auto 28px;">See why health systems, solo practitioners, and allied health professionals trust ClinixSummary's purpose-built AI over generic alternatives.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary); font-weight: 600;" onclick="showToast('Opening console for a live demo...'); return false;">Try the Console Free</a>
                        <a href="#contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Request a Technical Briefing</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}


// ---------------------------------------------------------------------------
// 2. MeticulousNotesPage
// ---------------------------------------------------------------------------
function MeticulousNotesPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Header -->
                <div class="subpage-header">
                    <span class="kicker">Meticulous Notes</span>
                    <h2 class="subpage-title">Clinical documentation that meets the highest standard — every time.</h2>
                    <p class="subpage-copy">ClinixSummary does not produce drafts. Every note is clinically precise, perfectly structured, and audit-ready from the moment it is generated. Three pillars underpin every document we produce.</p>
                </div>

                <!-- Three Pillars -->
                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">verified</div>
                        <h3>Clinically Precise</h3>
                        <p>Every output is accurate to what was said and what was meant. Our models capture nuance, clinical reasoning, and the subtleties of the encounter — ensuring the documentation faithfully represents the clinician's assessment, not a watered-down approximation.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">description</div>
                        <h3>Perfectly Structured</h3>
                        <p>Gold-standard formatting for continuity of care. Notes are generated in the appropriate format for the specialty — SOAP, APSO, surgical operative, or custom templates — with clear section headers, logical flow, and consistent terminology that any receiving clinician can follow.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">gavel</div>
                        <h3>Audit & Billing Ready</h3>
                        <p>Accurate ICD-10 and CPT coding suggestions are embedded directly into the documentation. Notes are generated with medico-legal defensibility in mind — thorough enough to withstand chart reviews, payer audits, and regulatory scrutiny without additional editing.</p>
                    </div>
                </div>

                <!-- Detail Breakdown -->
                <div class="subpage-header">
                    <span class="kicker">The Standard</span>
                    <h3 class="section-title">What meticulous documentation looks like in practice.</h3>
                    <p class="section-copy">Every note generated by ClinixSummary is held to a rigorous internal quality benchmark before it reaches your screen.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">spellcheck</span>
                        <h3>Accuracy Layer</h3>
                        <p>Medical terminology is spelled correctly, abbreviations are expanded where appropriate, and medication dosages are cross-referenced against the spoken narrative. The model distinguishes between similar-sounding drugs and procedures to eliminate transcription-level errors.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">format_list_numbered</span>
                        <h3>Structure Layer</h3>
                        <p>Notes follow the appropriate specialty template with consistent section ordering. Problem lists are enumerated, assessment and plan items are linked, and referral letters include the necessary clinical context for the receiving provider to act immediately.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">medical_information</span>
                        <h3>Coding Layer</h3>
                        <p>ICD-10 diagnostic codes and CPT procedural codes are suggested based on the clinical narrative — not on keyword matching but on semantic understanding of the encounter. This reduces under-coding, supports cleaner claims, and maximises appropriate reimbursement.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">shield</span>
                        <h3>Compliance Layer</h3>
                        <p>Every note includes the clinical detail needed for medico-legal defensibility. Pertinent negatives are documented, patient-reported symptoms are attributed, and clinical decision-making is captured — creating a robust record that protects the clinician and the patient.</p>
                    </div>
                </div>

                <!-- CTA Banner -->
                <div style="background: var(--bg-subtle); color: var(--text-primary); text-align: center; padding: 48px 40px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 16px;">See meticulous notes in action.</h2>
                    <p style="color: var(--text-secondary); font-size: 16px; max-width: 520px; margin: 0 auto 28px;">Generate your first clinical note in under 60 seconds — no sign-up required.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Opening console to generate a sample note...'); return false;">Try a Sample Note</a>
                        <a href="#contact" class="btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);">Talk to Clinical Team</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}


// ---------------------------------------------------------------------------
// 3. KaizenPage
// ---------------------------------------------------------------------------
function KaizenPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Header -->
                <div class="subpage-header">
                    <span class="kicker">Kai-zen (&#25913;&#21892;)</span>
                    <h2 class="subpage-title">Continuous incremental improvement. Every single week.</h2>
                    <p class="subpage-copy">Kai-zen &#8212; the Japanese principle of "change for the better" &#8212; is not a marketing concept for us. It is our engineering methodology. ClinixSummary's models improve every week through a disciplined cycle of clinician feedback, quality review, and model refinement.</p>
                </div>

                <div style="background: var(--bg-subtle); padding: 28px 32px; border-radius: 12px; margin-bottom: 60px; border: 1px solid var(--border-subtle); text-align: center;">
                    <p style="font-family: var(--font-serif); font-size: 22px; color: var(--text-primary); margin: 0; font-weight: 400; font-style: italic;">"Good enough is never enough."</p>
                </div>

                <!-- Three Pillars -->
                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">update</div>
                        <h3>Weekly Model Updates</h3>
                        <p>We do not release quarterly. We do not batch improvements. Every single week, refined model weights are shipped to production — incorporating new terminology, updated clinical guidelines, expanded specialty coverage, and performance optimisations. The ClinixSummary you use this Friday is measurably better than the one you used last Friday.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">forum</div>
                        <h3>Clinician Feedback Loop</h3>
                        <p>Clinicians are not passive consumers of our product — they are active contributors to its improvement. When a clinician flags a documentation issue, that feedback is categorised, prioritised, and fed directly back into the training pipeline. Every correction makes the model smarter for every user across that specialty.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">policy</div>
                        <h3>Clinical QA Reviews</h3>
                        <p>Our dedicated Clinix Quality Management team conducts manual quality checks on model outputs every week. These are not automated metrics — they are human clinical reviews by qualified healthcare professionals who assess accuracy, completeness, and clinical appropriateness against gold-standard benchmarks.</p>
                    </div>
                </div>

                <!-- The Cycle -->
                <div class="subpage-header">
                    <span class="kicker">The Kai-zen Cycle</span>
                    <h3 class="section-title">How improvement compounds, week after week.</h3>
                    <p class="section-copy">Each cycle feeds the next. Clinician feedback informs QA priorities, QA findings shape training data selection, and updated models generate better outputs that attract more precise feedback.</p>
                </div>

                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">looks_one</span> Capture</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Clinician flags an issue or improvement opportunity directly within the workflow.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">looks_two</span> Review</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Clinix QM team validates the issue, assesses impact, and prioritises for the weekly training cycle.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">looks_3</span> Refine</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Model weights are updated with corrective training data and validated against regression tests.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">looks_4</span> Deploy</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Updated models are shipped to production. The cycle restarts immediately.</p>
                    </div>
                </div>

                <!-- CTA Banner -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 48px 40px; border-radius: 12px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 16px;">Join the Kai-zen cycle.</h2>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; max-width: 520px; margin: 0 auto 28px;">Your feedback directly shapes the models. Start using ClinixSummary and become part of the improvement loop that benefits every clinician on the platform.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary); font-weight: 600;" onclick="showToast('Starting your free trial...'); return false;">Start Free Trial</a>
                        <a href="#contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Learn More About QA</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}


// ---------------------------------------------------------------------------
// 4. LanguagesPage
// ---------------------------------------------------------------------------
function LanguagesPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Header -->
                <div class="subpage-header">
                    <span class="kicker">Languages</span>
                    <h2 class="subpage-title">Six languages. Full RTL support. Real multilingual consultations.</h2>
                    <p class="subpage-copy">ClinixSummary supports clinical documentation in six languages — including full right-to-left Arabic support. But language support is more than translation. Our models understand how clinicians actually speak: mixing languages, switching mid-sentence, and using terminology from multiple linguistic traditions in a single encounter.</p>
                </div>

                <!-- Language Grid -->
                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">translate</div>
                        <h3>English</h3>
                        <p>Full support across all varieties — American, British, Australian, South African, Indian, and Caribbean English. Medical terminology, colloquialisms, and regional abbreviations are all understood.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">translate</div>
                        <h3>Fran&ccedil;ais</h3>
                        <p>Metropolitan French, Canadian French, and West African French clinical terminology. Supports the unique medical vocabulary and documentation conventions used across Francophone healthcare systems.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">translate</div>
                        <h3>Espa&ntilde;ol</h3>
                        <p>Latin American and European Spanish with full medical terminology coverage. Handles regional variations in clinical language from Mexico City to Madrid to Buenos Aires.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">translate</div>
                        <h3>Portugu&ecirc;s</h3>
                        <p>Brazilian and European Portuguese with clinical terminology tuned for the distinct medical systems, documentation requirements, and pharmaceutical naming conventions in each region.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">translate</div>
                        <h3>Italiano</h3>
                        <p>Full Italian clinical vocabulary with support for the SSN (Servizio Sanitario Nazionale) documentation standards and Italian medical terminology conventions.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">translate</div>
                        <h3>&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577; (Arabic)</h3>
                        <p>Complete right-to-left support with full Arabic medical terminology. Handles Modern Standard Arabic and Gulf dialect clinical speech, including mixed Arabic-English medical terminology common in Gulf healthcare settings.</p>
                    </div>
                </div>

                <!-- Multilingual Consultation Capture -->
                <div class="subpage-header">
                    <span class="kicker">Multilingual Consultation Capture</span>
                    <h3 class="section-title">Real consultations are not monolingual.</h3>
                    <p class="section-copy">Clinicians around the world switch between languages during a single patient encounter. ClinixSummary handles this naturally — no mode switching, no language selection buttons, no interruptions to the clinical workflow.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">flight</span>
                        <h3>Dubai: English, Arabic & French in One Visit</h3>
                        <p>A physician in Dubai greets a patient in Arabic, discusses the clinical history in English, and switches to French when a family member joins the consultation. ClinixSummary captures the entire encounter seamlessly, producing a unified clinical note without language boundaries.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">location_city</span>
                        <h3>Montreal: English & French Mid-Sentence</h3>
                        <p>A GP in Montreal switches between English and French mid-sentence — a natural pattern in bilingual healthcare settings. Our models recognise the code-switch instantly, maintaining clinical accuracy across both languages without requiring the clinician to pause or select a language mode.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 28px 32px; border-radius: 12px; margin-bottom: 60px; border: 1px solid var(--border-subtle);">
                    <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.7; margin: 0;">
                        <span class="material-symbols-rounded" style="font-size: 20px; vertical-align: middle; margin-inline-end: 8px; color: var(--accent);">auto_awesome</span>
                        <strong style="color: var(--text-primary);">No mode switching needed.</strong> ClinixSummary automatically detects language changes within a single session. Speak naturally in any supported language — or mix them freely — and receive a coherent, clinically accurate note.
                    </p>
                </div>

                <!-- CTA Banner -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 48px 40px; border-radius: 12px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 16px;">Document in the language you practise in.</h2>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; max-width: 520px; margin: 0 auto 28px;">Try ClinixSummary in your language — or in all of them at once.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary); font-weight: 600;" onclick="showToast('Opening multilingual console demo...'); return false;">Try Multilingual Demo</a>
                        <a href="#contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Request a Language</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}


// ---------------------------------------------------------------------------
// 5. PortfolioBuilderPage
// ---------------------------------------------------------------------------
function PortfolioBuilderPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Header -->
                <div class="subpage-header">
                    <span class="kicker">Portfolio Builder</span>
                    <h2 class="subpage-title">Structured case logs for credentialing, registration, and revalidation.</h2>
                    <p class="subpage-copy">ClinixSummary's Portfolio Builder transforms your documented clinical encounters into structured case logs that meet the requirements of specialty training programmes, medical registration bodies, and revalidation frameworks. Documentation you are already generating becomes credentialing evidence — automatically.</p>
                </div>

                <!-- Features -->
                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">folder_open</div>
                        <h3>Structured Case Logs</h3>
                        <p>Every documented encounter is automatically categorised by specialty, procedure type, complexity level, and clinical domain. Case logs accumulate over time, providing a comprehensive record of your clinical experience that is always up to date and ready for submission.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">workspace_premium</div>
                        <h3>Credentialing-Ready Exports</h3>
                        <p>Export your portfolio in formats accepted by major registration bodies and credentialing organisations. Structured data fields, case counts by category, and procedure logs are formatted to meet the specific requirements of your regulatory body — saving hours of manual compilation.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">school</div>
                        <h3>Training & Specialty Portfolios</h3>
                        <p>Trainees and registrars can build their specialty portfolios as they work. Supervisors can review case mix, identify gaps in clinical exposure, and sign off on competencies — all within the same platform used for daily documentation.</p>
                    </div>
                </div>

                <!-- Detail Section -->
                <div class="subpage-header">
                    <span class="kicker">Built for Every Stage</span>
                    <h3 class="section-title">From training through revalidation.</h3>
                    <p class="section-copy">Whether you are a trainee building your first portfolio, a specialist preparing for revalidation, or a department head tracking team competencies — Portfolio Builder adapts to your needs.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">badge</span>
                        <h3>Registration & Licensing</h3>
                        <p>Compile the case evidence needed for initial registration, inter-jurisdictional transfers, and scope-of-practice applications. Portfolio Builder understands the documentation requirements of major medical boards and regulatory bodies.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">checklist</span> Automated case counting by category and complexity</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">download</span> One-click export in regulatory-compliant formats</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">history</span> Longitudinal tracking across your entire career</li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">autorenew</span>
                        <h3>Revalidation & Appraisal</h3>
                        <p>When revalidation comes around, your portfolio is already built. Clinical activity summaries, case diversity reports, and reflective practice logs are generated from the documentation you produce every day — no last-minute scramble to compile evidence.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">insights</span> Case mix analysis and diversity reports</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">edit_note</span> Integrated reflective practice templates</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">supervisor_account</span> Supervisor review and sign-off workflows</li>
                        </ul>
                    </div>
                </div>

                <!-- CTA Banner -->
                <div style="background: var(--bg-subtle); color: var(--text-primary); text-align: center; padding: 48px 40px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 16px;">Build your portfolio while you work.</h2>
                    <p style="color: var(--text-secondary); font-size: 16px; max-width: 520px; margin: 0 auto 28px;">Every consultation documented with ClinixSummary becomes a credentialing asset. Start building your portfolio today.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Setting up your Portfolio Builder...'); return false;">Start Building Your Portfolio</a>
                        <a href="#contact" class="btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);">Speak to a Specialist</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}


// ---------------------------------------------------------------------------
// 6. AutoAmbientPage
// ---------------------------------------------------------------------------
function AutoAmbientPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Header -->
                <div class="subpage-header">
                    <span class="kicker">Auto-Ambient Detection</span>
                    <h2 class="subpage-title">No buttons. No modes. Just speak naturally.</h2>
                    <p class="subpage-copy">ClinixSummary automatically detects the type of audio it is receiving and adapts its processing pipeline accordingly. Whether you are in a live patient conversation, dictating a post-visit summary, or narrating a surgical procedure — the system knows, and it responds correctly. No manual mode switching required.</p>
                </div>

                <!-- Three Modes -->
                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">mic</div>
                        <h3>Ambient Mode</h3>
                        <p>Live conversation capture during the patient encounter. The system detects multi-speaker dialogue, identifies clinician and patient voices, and generates a structured clinical note from the natural flow of conversation. Hands-free, eyes-free — the technology disappears into the background so the therapeutic relationship stays in the foreground.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">keyboard_voice</div>
                        <h3>Dictation Mode</h3>
                        <p>Post-visit single-speaker documentation. When the system detects a single clinician voice narrating clinical findings, it switches to dictation processing — optimised for the structured, information-dense speech patterns of post-encounter dictation. Assessment, plan, and coding are generated instantly.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">surgical</div>
                        <h3>Operative Mode</h3>
                        <p>Surgical and procedural narration capture. The system recognises the unique cadence and terminology of intraoperative narration — step-by-step procedural descriptions, instrument references, anatomical landmarks, and findings — and structures them into a formal operative report.</p>
                    </div>
                </div>

                <!-- How It Works -->
                <div class="subpage-header">
                    <span class="kicker">How It Works</span>
                    <h3 class="section-title">Intelligent audio classification in real time.</h3>
                    <p class="section-copy">Our audio classification layer analyses speaker count, speech cadence, vocabulary density, and contextual cues within the first seconds of audio to determine the appropriate processing pipeline — and continuously re-evaluates as the session progresses.</p>
                </div>

                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">hearing</span> Speaker Detection</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Identifies single vs. multi-speaker audio and assigns speaker roles automatically.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">speed</span> Cadence Analysis</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Differentiates conversational speech from structured dictation and procedural narration.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">swap_horiz</span> Seamless Switching</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Transitions between modes mid-session if the audio type changes — no restart required.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">tune</span> Zero Configuration</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Works out of the box. No settings to adjust, no modes to select, no learning curve.</p>
                    </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 28px 32px; border-radius: 12px; margin-bottom: 60px; border: 1px solid var(--border-subtle); text-align: center;">
                    <p style="font-family: var(--font-serif); font-size: 22px; color: var(--text-primary); margin: 0; font-weight: 400; font-style: italic;">"No buttons. No modes. Just speak naturally."</p>
                </div>

                <!-- CTA Banner -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 48px 40px; border-radius: 12px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 16px;">Experience auto-ambient detection.</h2>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; max-width: 520px; margin: 0 auto 28px;">Try all three modes in a single session. Speak naturally and let the system adapt to you.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary); font-weight: 600;" onclick="showToast('Launching auto-ambient demo...'); return false;">Try Auto-Ambient Free</a>
                        <a href="#contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Schedule a Demo</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}


// ---------------------------------------------------------------------------
// 7. CMEVaultPage
// ---------------------------------------------------------------------------
function CMEVaultPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Header -->
                <div class="subpage-header">
                    <span class="kicker">CME Vault</span>
                    <h2 class="subpage-title">Continuing medical education, integrated into your documentation workflow.</h2>
                    <p class="subpage-copy">CME Vault turns your daily clinical documentation into a continuous learning engine. Review cases you have documented, access curated educational content, stay current with clinical guidelines, and track your learning hours — all without leaving the platform you already use every day.</p>
                </div>

                <!-- Three Pillars -->
                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">library_books</div>
                        <h3>Case Overviews</h3>
                        <p>Learn from your own documented cases. CME Vault analyses your clinical encounters and surfaces relevant learning points — highlighting differential diagnoses you considered, evidence-based alternatives, and guideline-concordant management options. Your own practice becomes your most powerful educational resource.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">school</div>
                        <h3>Certification Content</h3>
                        <p>Access curated learning modules aligned with major medical education accreditation frameworks. Modules are mapped to specialty competencies and can be completed at your own pace — during downtime between patients, on your commute, or during dedicated study sessions.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">newspaper</div>
                        <h3>Clinical Updates</h3>
                        <p>Stay current with the latest clinical guidelines, pharmacological updates, and evidence-based practice changes. CME Vault aggregates and curates updates relevant to your specialty, so you receive the information that matters to your practice — not a firehose of irrelevant publications.</p>
                    </div>
                </div>

                <!-- Learning Tracking -->
                <div class="subpage-header">
                    <span class="kicker">Track & Earn</span>
                    <h3 class="section-title">Learning hours and credits, automatically tracked.</h3>
                    <p class="section-copy">CME Vault tracks every learning interaction — case reviews, module completions, and guideline reviews — and logs them against your CPD requirements. When renewal time comes, your learning record is already compiled.</p>
                </div>

                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">timer</span>
                        <h3>Learning Hour Tracking</h3>
                        <p>Every minute spent engaging with educational content is automatically logged. Case review sessions, module completions, and guideline readings are tracked and categorised by specialty domain, competency area, and accreditation body requirements.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">schedule</span> Automatic time tracking — no manual entry</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">category</span> Categorised by specialty and competency domain</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">download</span> Export learning records for accreditation submission</li>
                        </ul>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">workspace_premium</span>
                        <h3>Credit Accumulation</h3>
                        <p>Earn CME/CPD credits as you learn. Completed modules and verified learning activities contribute to your credit balance, mapped to the requirements of your licensing jurisdiction and specialty board.</p>
                        <ul style="margin-top: 15px; font-size: 14px;">
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">verified</span> Credits aligned with major accreditation bodies</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">trending_up</span> Progress dashboard with renewal deadline tracking</li>
                            <li style="color: var(--text-primary); margin-bottom: 8px;"><span class="material-symbols-rounded" style="font-size: 16px; margin-inline-end: 8px; color: var(--accent);">notifications</span> Reminders when you are approaching credit deadlines</li>
                        </ul>
                    </div>
                </div>

                <!-- CTA Banner -->
                <div style="background: var(--bg-subtle); color: var(--text-primary); text-align: center; padding: 48px 40px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                    <h2 style="font-family: var(--font-serif); font-size: 32px; margin-bottom: 16px;">Turn your documentation into learning.</h2>
                    <p style="color: var(--text-secondary); font-size: 16px; max-width: 520px; margin: 0 auto 28px;">CME Vault is included with every ClinixSummary plan. Start earning credits from the cases you are already documenting.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--text-primary); color: white;" onclick="showToast('Activating CME Vault on your account...'); return false;">Activate CME Vault</a>
                        <a href="#contact" class="btn-outline" style="border-color: var(--text-primary); color: var(--text-primary);">Learn More</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}


// ---------------------------------------------------------------------------
// 8. ClinixFoundationPage
// ---------------------------------------------------------------------------
function ClinixFoundationPage() {
    return `
        <section class="subpage-container">
            <div class="page-width">

                <!-- Header -->
                <div class="subpage-header">
                    <span class="kicker">Clinix Foundation</span>
                    <h2 class="subpage-title">Free clinical documentation for those who need it most.</h2>
                    <p class="subpage-copy">The Clinix Foundation is ClinixSummary's initiative to provide free access to our full clinical documentation platform for clinics operating in relief areas, underserved communities, and resource-limited settings. Because documentation burden should never be a barrier to delivering care where it is needed most.</p>
                </div>

                <!-- Mission -->
                <div class="grid-2" style="margin-bottom: 60px;">
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">volunteer_activism</span>
                        <h3>Our Goal</h3>
                        <p>To aid medical care delivery and improve patient outcomes in settings where administrative burden diverts scarce clinical resources away from patients. In humanitarian relief zones, rural health centres, and NGO-operated facilities, every minute a clinician spends on paperwork is a minute taken away from care. The Clinix Foundation exists to eliminate that trade-off.</p>
                        <p style="margin-top: 12px;">We believe that world-class clinical documentation tools should not be a privilege reserved for well-funded health systems. Access to technology that reduces burnout, improves documentation quality, and supports continuity of care is a matter of healthcare equity.</p>
                    </div>
                    <div class="text-group" style="border-bottom: none;">
                        <span class="material-symbols-rounded list-item-icon">public</span>
                        <h3>Healthcare Equity, Not Charity</h3>
                        <p>The Clinix Foundation is not a stripped-down version of our product. Eligible organisations receive full access to ClinixSummary's clinical documentation platform — the same proprietary models, the same specialty coverage, the same meticulous notes, and the same multilingual support used by private practices and health systems worldwide.</p>
                        <p style="margin-top: 12px;">This is part of ClinixSummary's core commitment to healthcare equity. We believe that the tools available to a specialist in London should also be available to a physician staffing a relief clinic in a conflict zone.</p>
                    </div>
                </div>

                <!-- Eligibility -->
                <div class="subpage-header">
                    <span class="kicker">Eligibility</span>
                    <h3 class="section-title">Who qualifies for Clinix Foundation access.</h3>
                    <p class="section-copy">The Clinix Foundation is available to organisations operating in settings where commercial licensing is not feasible and where clinical documentation tools can have the greatest impact on care delivery.</p>
                </div>

                <div class="grid-3" style="margin-bottom: 60px;">
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">emergency</div>
                        <h3>Humanitarian Relief Clinics</h3>
                        <p>Medical facilities operating in active conflict zones, disaster response areas, and refugee settlement health services. Includes temporary field hospitals, mobile clinics, and transitional care centres established by humanitarian organisations.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">cottage</div>
                        <h3>Rural Health Centres</h3>
                        <p>Primary care and community health facilities in rural and remote areas with limited infrastructure and connectivity. Includes village health posts, district hospitals, and community health worker programmes serving populations with limited access to healthcare.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon material-symbols-rounded">diversity_3</div>
                        <h3>NGO-Operated Medical Facilities</h3>
                        <p>Healthcare delivery programmes run by registered non-governmental organisations, faith-based health networks, and international medical aid agencies. Includes organisations such as MSF partner clinics, Red Cross/Red Crescent health programmes, and similar entities.</p>
                    </div>
                </div>

                <!-- What's Included -->
                <div class="subpage-header">
                    <span class="kicker">What Is Included</span>
                    <h3 class="section-title">Full platform access. No compromises.</h3>
                </div>

                <div class="grid-4" style="margin-bottom: 60px;">
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">neurology</span> Proprietary Models</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Full access to all 40+ specialty-tuned clinical AI models.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">translate</span> All Languages</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Six languages with full multilingual code-switching support.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">description</span> Meticulous Notes</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Clinically precise, structured, audit-ready documentation.</p>
                    </div>
                    <div class="text-group" style="border: none;">
                        <h4 style="font-weight: 600; font-size: 16px;"><span class="material-symbols-rounded list-item-icon" style="font-size: 20px;">support</span> Dedicated Support</h4>
                        <p style="font-size: 13px; color: var(--text-secondary);">Priority onboarding and ongoing technical assistance.</p>
                    </div>
                </div>

                <!-- CTA Banner -->
                <div style="background: var(--text-primary); color: #fff; text-align: center; padding: 48px 40px; border-radius: 12px;">
                    <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 16px;">Apply for Clinix Foundation access.</h2>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; max-width: 560px; margin: 0 auto 28px;">If your organisation serves communities in need and documentation burden is limiting your care delivery, we want to hear from you. Applications are reviewed on a rolling basis.</p>
                    <div class="nav-actions" style="justify-content: center;">
                        <a href="#" class="btn-primary" style="background: var(--accent); color: var(--text-primary); font-weight: 600;" onclick="showToast('Opening Clinix Foundation application form...'); return false;">Apply Now</a>
                        <a href="#contact" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #fff;">Contact the Foundation Team</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}
