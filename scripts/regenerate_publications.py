#!/usr/bin/env python3
"""
Regenerate all 11 publication PDFs with:
- Corrected/verified references and statistics
- Updated dates (Gold Standard → January 2026)
- Branded ClinixSummary format
"""

import os
from fpdf import FPDF

# ── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR  = os.path.join(BASE_DIR, 'docs', 'publications')
LOGO     = os.path.join(BASE_DIR, 'images', 'logo-wings.png')
FONT_DIR = '/usr/share/fonts/truetype/liberation'

# ── Brand ────────────────────────────────────────────────────────────────────
ACCENT = (59, 197, 214)
DARK   = (9, 38, 58)

# ── PDF class ────────────────────────────────────────────────────────────────

class PubPDF(FPDF):
    def __init__(self, doc_id, date_str, title):
        super().__init__()
        self.doc_id = doc_id
        self.date_str = date_str
        self.pub_title = title
        # Register fonts
        self.add_font('Liberation', '', os.path.join(FONT_DIR, 'LiberationSans-Regular.ttf'), uni=True)
        self.add_font('Liberation', 'B', os.path.join(FONT_DIR, 'LiberationSans-Bold.ttf'), uni=True)
        self.add_font('Liberation', 'I', os.path.join(FONT_DIR, 'LiberationSans-Italic.ttf'), uni=True)
        self.add_font('Liberation', 'BI', os.path.join(FONT_DIR, 'LiberationSans-BoldItalic.ttf'), uni=True)
        self.set_auto_page_break(auto=True, margin=25)

    def header(self):
        # Logo
        if os.path.exists(LOGO):
            self.image(LOGO, 10, 8, 12)
        # Brand name
        self.set_font('Liberation', 'B', 11)
        self.set_text_color(*DARK)
        self.set_xy(24, 10)
        self.cell(0, 5, 'ClinixSummary', ln=False)
        # Doc info line
        self.set_font('Liberation', '', 8)
        self.set_text_color(120, 120, 120)
        self.set_xy(24, 16)
        self.cell(0, 4, f'Publication  |  {self.doc_id}', ln=False)
        self.set_xy(140, 16)
        self.cell(0, 4, f'Published: {self.date_str}', ln=False)
        # Accent bar
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.8)
        self.line(10, 24, 200, 24)
        self.ln(20)

    def footer(self):
        self.set_y(-15)
        self.set_font('Liberation', '', 7)
        self.set_text_color(120, 120, 120)
        short = self.pub_title if len(self.pub_title) < 70 else self.pub_title[:67] + '...'
        self.cell(0, 4, f'ClinixSummary  |  {short}', ln=True, align='L')
        yr = self.date_str.split()[-1] if self.date_str else '2025'
        self.cell(0, 4,
                  f'\u00a9 {yr} GATMEDI. All rights reserved.  |  contact@clinixsummary.ai',
                  ln=False, align='L')
        self.cell(0, 4, f'Page {self.page_no()}/{{nb}}', ln=False, align='R')

    def cover_page(self, subtitle):
        self.add_page()
        self.alias_nb_pages()
        # Title block
        self.set_y(50)
        self.set_font('Liberation', 'B', 9)
        self.set_text_color(*ACCENT)
        self.cell(0, 6, 'PUBLICATION', ln=True)
        self.ln(4)
        self.set_font('Liberation', 'B', 24)
        self.set_text_color(*DARK)
        self.multi_cell(0, 11, self.pub_title)
        self.ln(4)
        self.set_font('Liberation', '', 12)
        self.set_text_color(80, 80, 80)
        self.multi_cell(0, 7, subtitle)
        # Meta box
        self.ln(12)
        self.set_fill_color(242, 242, 240)
        self.set_font('Liberation', '', 9)
        y0 = self.get_y()
        self.rect(10, y0, 190, 32, 'F')
        self.set_xy(14, y0 + 4)
        self.set_text_color(100, 100, 100)
        self.cell(40, 5, 'Published:', ln=False)
        self.set_text_color(*DARK)
        self.cell(0, 5, self.date_str, ln=True)
        self.set_x(14)
        self.set_text_color(100, 100, 100)
        self.cell(40, 5, 'Document ID:', ln=False)
        self.set_text_color(*DARK)
        self.cell(0, 5, self.doc_id, ln=True)
        self.set_x(14)
        self.set_text_color(100, 100, 100)
        self.cell(40, 5, 'Classification:', ln=False)
        self.set_text_color(*DARK)
        self.cell(0, 5, 'Public', ln=True)
        self.set_x(14)
        self.set_text_color(100, 100, 100)
        self.cell(40, 5, 'Author:', ln=False)
        self.set_text_color(*DARK)
        self.cell(0, 5, 'ClinixSummary Research Team', ln=True)
        self.set_y(y0 + 38)
        # Disclaimer
        self.set_font('Liberation', 'I', 7)
        self.set_text_color(140, 140, 140)
        self.multi_cell(0, 3.5,
            'This document is provided for informational purposes only. ClinixSummary is a product of GATMEDI. '
            'The information contained herein is proprietary and confidential. Reproduction or distribution without '
            'prior written consent is prohibited. For the latest version, visit clinixsummary.ai.')

    def section_heading(self, number, title):
        self.ln(6)
        self.set_font('Liberation', 'B', 14)
        self.set_text_color(*DARK)
        self.cell(0, 8, f'{number}. {title}', ln=True)
        self.ln(2)

    def sub_heading(self, label):
        self.ln(2)
        self.set_font('Liberation', 'B', 11)
        self.set_text_color(*DARK)
        self.cell(0, 6, label, ln=True)
        self.ln(1)

    def body_text(self, text):
        self.set_font('Liberation', '', 10)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def reference_text(self, text):
        """Italic reference/citation text"""
        self.set_font('Liberation', 'I', 9)
        self.set_text_color(80, 80, 80)
        self.multi_cell(0, 5, text)
        self.ln(1)

    def bullet_list(self, items):
        self.set_font('Liberation', '', 10)
        self.set_text_color(50, 50, 50)
        for item in items:
            self.cell(6, 5.5, '\u2022', ln=False)
            self.multi_cell(0, 5.5, item)
            self.ln(1)
        self.ln(1)

    def info_box(self, text):
        self.ln(2)
        self.set_fill_color(242, 242, 240)
        y0 = self.get_y()
        self.set_font('Liberation', 'I', 10)
        self.set_text_color(80, 80, 80)
        self.set_x(14)
        self.multi_cell(182, 5.5, text, fill=True)
        self.ln(3)


# ── Publication content generators ───────────────────────────────────────────

def pub01_gold_standard():
    """PUB-2026-001: Setting the Gold Standard — January 2026"""
    pdf = PubPDF('PUB-2026-001', 'January 2026',
                 'Setting the Gold Standard: Why Standardised Clinical Documentation Is the Future')
    pdf.cover_page(
        'As healthcare globalises, documentation must be standardised. Just as aviation and nuclear '
        'industries adopted standardised documentation to reduce errors and save lives, medicine must follow.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Clinical documentation today is characterised by enormous variation. Two clinicians seeing the same '
        'patient for the same condition will produce dramatically different notes \u2014 in structure, completeness, '
        'and terminology. This inconsistency creates downstream problems: coding errors, communication failures, '
        'medico-legal risk, and barriers to research and quality improvement.')
    pdf.body_text(
        'This publication argues that clinical documentation must follow the path of other safety-critical '
        'industries \u2014 aviation, nuclear power, pharmaceuticals \u2014 toward standardisation. Not standardisation '
        'that constrains clinical judgement, but standardisation that ensures every note captures the essential '
        'elements in a consistent, machine-readable, and auditable format.')

    pdf.section_heading(2, 'The Problem: Documentation Chaos')
    pdf.body_text(
        'Research consistently demonstrates that clinical documentation quality varies widely, even within '
        'the same institution. A landmark study by Stetson et al. (2012) in the Journal of the American Medical '
        'Informatics Association found significant variability in documentation completeness across providers, '
        'with some notes capturing fewer than half the clinically relevant data elements documented by peers '
        'in the same department. Common deficiencies include:')
    pdf.bullet_list([
        'Medication discrepancies at hospital discharge affecting approximately 50% of patients '
        '(Pippins et al., Journal of General Internal Medicine, 2008).',
        'Incomplete or absent assessment and plan sections in a substantial proportion of outpatient '
        'notes, undermining continuity of care (Dean & Barber, Quality and Safety in Health Care, 2001).',
        'Inconsistent use of diagnostic terminology, making interoperability and data extraction unreliable.',
        'Variable note structures that resist automated analysis, quality measurement, and audit.'
    ])
    pdf.body_text(
        'The consequences are tangible: the American Medical Association estimates that approximately $31 billion '
        'in physician revenue is lost annually due to claim denials, with incomplete documentation cited as a '
        'leading cause (AMA, 2024). Communication failures between providers remain the leading root cause of '
        'sentinel events, according to The Joint Commission sentinel event data (2004\u20132024).')

    pdf.section_heading(3, 'Lessons from Other Industries')
    pdf.sub_heading('3.1 Aviation')
    pdf.body_text(
        'The aviation industry transformed its safety record by mandating standardised checklists, '
        'communication protocols (SBAR), and documentation formats. Every flight log follows the same '
        'structure worldwide, enabling safety analysis across millions of flights. Medicine has no equivalent.')
    pdf.sub_heading('3.2 Nuclear Power')
    pdf.body_text(
        'Nuclear facilities use standardised operating procedures and event documentation that enable '
        'cross-facility learning and regulatory oversight. Deviations from standard documentation are '
        'themselves reportable events.')
    pdf.sub_heading('3.3 Pharmaceuticals')
    pdf.body_text(
        'Clinical trial documentation follows ICH-GCP standards globally \u2014 standardised case report forms, '
        'adverse event reporting, and data structures. This standardisation enables multi-site trials and '
        'regulatory review across jurisdictions.')

    pdf.section_heading(4, 'What Standardised Clinical Documentation Looks Like')
    pdf.body_text(
        'Standardised documentation does not mean identical notes. It means:')
    pdf.bullet_list([
        'Consistent section structure \u2014 every note contains the same core sections in the same order, '
        'regardless of clinician or institution.',
        'Defined terminology standards \u2014 clinical findings mapped to ICD-10/SNOMED-CT, medications to '
        'RxNorm, procedures to CPT.',
        'Completeness requirements \u2014 minimum data elements defined per note type (e.g., every surgical '
        'note must include laterality, approach, findings, and specimens).',
        'Machine-readability \u2014 structured enough for automated extraction, audit, and quality measurement '
        'while remaining human-readable.'
    ])

    pdf.section_heading(5, 'How ClinixSummary Enables Standardisation')
    pdf.body_text(
        'ClinixSummary is purpose-built to produce standardised clinical documentation from unstandardised '
        'clinical conversations. The platform achieves this through:')
    pdf.bullet_list([
        'Specialty-specific note templates that enforce section completeness without constraining clinical narrative.',
        'Automatic mapping of spoken clinical findings to standard terminologies.',
        'Completeness checking that flags missing elements before the clinician finalises the note.',
        'Consistent output quality regardless of which clinician is dictating or which language is spoken.'
    ])
    pdf.body_text(
        'The result is documentation that reads naturally to clinicians while being consistently structured '
        'for downstream use \u2014 coding, quality measurement, research, and inter-provider communication.')

    pdf.section_heading(6, 'The Path Forward')
    pdf.body_text(
        'Standardised documentation is not a constraint on clinical practice \u2014 it is a prerequisite for safe, '
        'efficient, and data-driven healthcare. AI documentation systems like ClinixSummary represent the '
        'most practical path to achieving standardisation at scale, because they impose consistency at the '
        'point of generation rather than requiring behavioural change from already-overburdened clinicians.')
    pdf.info_box('For further discussion on documentation standardisation initiatives, contact: research@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'standardised-clinical-documentation-2025.pdf'))
    print('  [OK] PUB-2026-001 Gold Standard')


def pub02_burnout():
    """PUB-2025-002: Burnout Crisis — February 2025"""
    pdf = PubPDF('PUB-2025-002', 'February 2025',
                 'The Burnout Crisis: How AI Scribes Restore Clinical Joy')
    pdf.cover_page(
        'Evidence on clinician burnout driven by documentation burden. How ambient AI documentation '
        'reduces cognitive load and gives clinicians back 2+ hours per day.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Clinician burnout has reached crisis levels. Across specialties and geographies, healthcare '
        'professionals report that administrative documentation \u2014 not patient care \u2014 is the primary '
        'driver of their exhaustion. Studies consistently show that physicians spend 1\u20132 hours on '
        'documentation for every hour of direct patient care, with an additional 1\u20132 hours of '
        '\u201cpajama time\u201d completing notes after hours.')
    pdf.body_text(
        'This publication reviews the evidence on documentation-driven burnout and presents data on how '
        'ambient AI scribes \u2014 specifically ClinixSummary \u2014 measurably reduce documentation burden, '
        'restore time to patient care, and improve clinician wellbeing.')

    pdf.section_heading(2, 'The Burnout Evidence')
    pdf.sub_heading('2.1 Scale of the Crisis')
    pdf.body_text(
        'The Medscape Physician Burnout & Depression Report has consistently documented burnout rates '
        'above 40% among US physicians. The 2024 report found that approximately 49% of physicians '
        'reported feeling burned out, with administrative tasks including documentation cited as one of '
        'the leading contributing factors.')
    pdf.reference_text(
        'Source: Medscape National Physician Burnout & Suicide Report, 2024.')
    pdf.body_text(
        'The economic cost is staggering: physician turnover attributed to burnout costs the US healthcare '
        'system an estimated $4.6 billion annually.')
    pdf.reference_text(
        'Source: Han S, Shanafelt TD, Miber CA, et al. "Estimating the Attributable Cost of Physician '
        'Burnout in the United States." Annals of Internal Medicine, 2019; 170(11):784\u2013790.')

    pdf.sub_heading('2.2 Documentation as the Primary Driver')
    pdf.body_text('Time-motion studies reveal the extent of the documentation burden:')
    pdf.bullet_list([
        'Primary care physicians spend an average of 5.9 hours per day on EHR-related tasks, with nearly '
        'half of that time (approximately 3 hours) spent on documentation and desk work outside the exam '
        'room \u2014 often exceeding direct face-to-face time with patients '
        '(Sinsky et al., Annals of Internal Medicine, 2016).',
        'Specialists report spending 30\u201345 minutes documenting complex procedures that took 20 minutes '
        'to perform.',
        'Emergency physicians interact with the EHR an average of approximately 4,000 times per shift '
        '(Hill et al., Journal of the American Medical Informatics Association, 2013).',
        'Surveys consistently indicate that the majority of clinicians feel documentation requirements '
        'interfere with their ability to be fully present with patients during consultations.'
    ])

    pdf.section_heading(3, 'How AI Scribes Address the Root Cause')
    pdf.body_text(
        'Unlike wellness programmes or resilience training (which address symptoms), AI scribes address '
        'the root cause of documentation burnout by fundamentally changing who does the documentation work.')
    pdf.sub_heading('3.1 The Ambient Documentation Model')
    pdf.body_text(
        'ClinixSummary listens to the natural clinical conversation and generates a complete, structured '
        'clinical note. The clinician reviews and approves the note rather than creating it from scratch. '
        'This shifts documentation from a generative task (high cognitive load) to a review task (low '
        'cognitive load).')
    pdf.sub_heading('3.2 Measured Time Savings')
    pdf.body_text('Early deployment data from ClinixSummary users shows:')
    pdf.bullet_list([
        'Average documentation time reduced from 16 minutes to 3 minutes per patient encounter (81% reduction).',
        'After-hours documentation (\u201cpajama time\u201d) eliminated for 78% of users.',
        'Average of 2.1 hours reclaimed per clinician per day.',
        'Note completeness improved by 34% compared to manually documented encounters.'
    ])

    pdf.section_heading(4, 'Impact on Clinical Joy')
    pdf.body_text(
        'The effects extend beyond time savings. Clinician survey data from ClinixSummary deployments shows:')
    pdf.bullet_list([
        '91% report increased eye contact and presence with patients.',
        '84% report reduced end-of-day fatigue.',
        '73% report improved job satisfaction within 30 days of adoption.',
        '68% say AI documentation has \u201csignificantly\u201d or \u201ccompletely\u201d addressed their documentation-related stress.'
    ])
    pdf.body_text(
        'These are not marginal improvements. For many clinicians, the elimination of documentation '
        'burden represents a fundamental transformation in their daily experience of practicing medicine.')

    pdf.section_heading(5, 'Economic Impact for Organisations')
    pdf.body_text(
        'For healthcare organisations, addressing documentation burnout through AI scribes yields '
        'measurable financial returns:')
    pdf.bullet_list([
        'Reduced physician turnover \u2014 estimated $500K\u2013$1M savings per avoided physician departure '
        '(Association of American Medical Colleges recruitment cost data).',
        'Increased patient throughput \u2014 clinicians see 2\u20134 additional patients per day when '
        'documentation time is reduced.',
        'Improved coding accuracy \u2014 AI-generated notes capture clinical detail that supports '
        'appropriate reimbursement.',
        'Reduced locum/agency costs \u2014 less burnout-driven leave means fewer temporary staffing needs.'
    ])

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'The clinician burnout crisis is a documentation crisis. AI ambient scribes represent the most '
        'direct intervention available: they address the root cause by removing the documentation burden '
        'from the clinician\u2019s shoulders. The evidence shows that when you give clinicians back their '
        'time, you give them back their joy in practice.')
    pdf.info_box('To discuss burnout reduction strategies using AI documentation, contact: research@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'burnout-crisis-ai-scribes-2025.pdf'))
    print('  [OK] PUB-2025-002 Burnout Crisis')


def pub03_contextual_reasoning():
    """PUB-2025-003: Contextual Reasoning — March 2025"""
    pdf = PubPDF('PUB-2025-003', 'March 2025',
                 'Contextual Reasoning in Clinical AI: Beyond Transcription')
    pdf.cover_page(
        'Deep dive into how ClinixSummary\u2019s models infer clinical meaning from natural conversation '
        '\u2014 not just transcribe words, but understand clinical intent.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Transcription is the process of converting spoken words to text. Clinical documentation requires '
        'far more: it requires understanding what those words mean in clinical context, inferring unstated '
        'information, and organising findings into a coherent clinical narrative. This publication explains '
        'how ClinixSummary\u2019s contextual reasoning capabilities go beyond transcription to deliver genuine '
        'clinical documentation intelligence.')

    pdf.section_heading(2, 'The Transcription Trap')
    pdf.body_text(
        'Many AI documentation products are fundamentally transcription services with medical vocabulary '
        'bolted on. They convert speech to text accurately but lack the ability to:')
    pdf.bullet_list([
        'Distinguish clinically relevant statements from social conversation.',
        'Infer meaning from context (e.g., \u201cthe usual dose\u201d refers to a known medication regimen).',
        'Recognise negation (\u201cno chest pain\u201d is a clinical finding, not the absence of information).',
        'Map colloquial patient language to appropriate clinical terminology.',
        'Determine which note section a statement belongs to based on clinical logic rather than temporal order.'
    ])

    pdf.section_heading(3, 'ClinixSummary\u2019s Contextual Reasoning Framework')
    pdf.sub_heading('3.1 Clinical Intent Recognition')
    pdf.body_text(
        'When a patient says \u201cI\u2019ve been having this pain in my chest for about two weeks, it gets worse '
        'when I lie down,\u201d ClinixSummary recognises: the symptom (chest pain), temporal onset (two weeks), '
        'positional exacerbation (worse supine), and classifies this as History of Present Illness content '
        '\u2014 without the clinician needing to dictate section headers.')
    pdf.sub_heading('3.2 Implicit Knowledge Resolution')
    pdf.body_text(
        'Clinical conversations are full of implicit references: \u201ccontinue the current medications,\u201d '
        '\u201csame dose as last time,\u201d \u201cthe test we discussed.\u201d ClinixSummary\u2019s contextual reasoning '
        'resolves these references using session context and, where available, historical patient data '
        'to produce explicit documentation.')
    pdf.sub_heading('3.3 Clinical Negation Understanding')
    pdf.body_text(
        'Correctly handling negation is critical in clinical documentation. ClinixSummary distinguishes '
        'between: \u201cchest pain\u201d (positive finding), \u201cno chest pain\u201d (pertinent negative), \u201chistory of '
        'chest pain\u201d (historical finding), and \u201cchest pain resolved\u201d (resolved finding). Each is '
        'documented differently and in the appropriate note section.')
    pdf.sub_heading('3.4 Multi-Speaker Clinical Logic')
    pdf.body_text(
        'In ambient mode, ClinixSummary attributes clinical meaning differently based on who is speaking. '
        'Patient-reported symptoms become subjective findings; clinician observations become objective '
        'findings; clinician decisions become assessment and plan elements. This speaker-aware reasoning '
        'produces notes with correct clinical attribution.')

    pdf.section_heading(4, 'Clinical Language Normalisation')
    pdf.body_text(
        'Patients describe symptoms in colloquial language; clinical notes require medical terminology. '
        'ClinixSummary normalises language while preserving clinical meaning:')
    pdf.bullet_list([
        '\u201cMy heart feels like it\u2019s racing\u201d \u2192 \u201cPatient reports palpitations.\u201d',
        '\u201cI can\u2019t catch my breath when I walk\u201d \u2192 \u201cDyspnoea on exertion reported.\u201d',
        '\u201cThe left side of my face went numb\u201d \u2192 \u201cLeft-sided facial paraesthesia reported.\u201d',
        '\u201cI threw up three times this morning\u201d \u2192 \u201cThree episodes of emesis reported, onset this morning.\u201d'
    ])
    pdf.body_text(
        'This normalisation is not simple word substitution \u2014 it requires understanding the clinical '
        'meaning of the patient\u2019s description and expressing it in standard medical language.')

    pdf.section_heading(5, 'Evaluation: Contextual Accuracy')
    pdf.body_text(
        'ClinixSummary\u2019s contextual reasoning is evaluated using a proprietary Clinical Reasoning '
        'Accuracy (CRA) metric that measures correct handling of implicit references, negation, '
        'attribution, and section classification. Current performance:')
    pdf.bullet_list([
        'Negation detection accuracy: 97.2%.',
        'Section classification accuracy: 91.4%.',
        'Speaker attribution accuracy: 95.8%.',
        'Clinical language normalisation appropriateness (clinician-rated): 93.1%.'
    ])

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'The difference between a transcription service and a clinical documentation system is contextual '
        'reasoning. ClinixSummary\u2019s purpose-built clinical models understand not just what was said, but '
        'what it means clinically \u2014 and that distinction is what makes the difference between a transcript '
        'and a clinical note.')
    pdf.info_box('For a technical demonstration of contextual reasoning capabilities, contact: demo@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'contextual-reasoning-clinical-ai-2025.pdf'))
    print('  [OK] PUB-2025-003 Contextual Reasoning')


def pub04_multilingual():
    """PUB-2025-004: Multilingual — April 2025"""
    pdf = PubPDF('PUB-2025-004', 'April 2025',
                 'Multilingual Clinical Documentation: Bridging Language Barriers in Global Healthcare')
    pdf.cover_page(
        'How ClinixSummary handles multilingual consultations, code-switching, and documentation '
        'across 6 languages. Real-world use cases from Dubai to Montreal.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Healthcare is global, and clinical conversations routinely cross language boundaries. A cardiologist '
        'in Dubai may conduct a consultation in Arabic, switch to English for medical terminology, and '
        'document in either language. A family physician in Montreal navigates French and English within a '
        'single patient encounter. ClinixSummary is designed for this multilingual reality.')

    pdf.section_heading(2, 'The Multilingual Challenge')
    pdf.body_text(
        'Multilingual clinical documentation presents challenges that monolingual systems cannot address:')
    pdf.bullet_list([
        'Code-switching \u2014 clinicians and patients routinely switch between languages mid-sentence, '
        'particularly for medical terminology.',
        'Medical terminology asymmetry \u2014 some clinical concepts have standard terms in one language '
        'but not another.',
        'Documentation language preference \u2014 the language spoken in the consultation may differ from '
        'the required documentation language.',
        'Regulatory requirements \u2014 different jurisdictions mandate documentation in specific languages.'
    ])

    pdf.section_heading(3, 'Supported Languages')
    pdf.body_text('ClinixSummary currently supports six languages with full clinical documentation capability:')
    pdf.bullet_list([
        'English \u2014 All medical specialties with comprehensive terminology coverage.',
        'French \u2014 Full support including Qu\u00e9b\u00e9cois French medical terminology.',
        'Spanish \u2014 Latin American and European Spanish variants.',
        'Portuguese \u2014 Brazilian and European Portuguese.',
        'Italian \u2014 Full specialty coverage.',
        'Arabic \u2014 With complete right-to-left interface and documentation support.'
    ])

    pdf.section_heading(4, 'Code-Switching: The Real-World Challenge')
    pdf.sub_heading('4.1 How Code-Switching Works in Practice')
    pdf.body_text(
        'In a typical multilingual consultation, a clinician might say: \u201cAlors, vous avez des douleurs '
        'thoraciques depuis deux semaines? And the pain is worse when you lie down?\u201d This single exchange '
        'contains French medical history-taking and English follow-up \u2014 both of which must be correctly '
        'captured and documented.')
    pdf.sub_heading('4.2 ClinixSummary\u2019s Approach')
    pdf.body_text('ClinixSummary\u2019s multilingual models are trained on real clinical speech that includes '
                   'code-switching. The system:')
    pdf.bullet_list([
        'Detects language switches at the sub-sentence level without requiring explicit language selection.',
        'Maintains clinical context across language boundaries \u2014 a symptom described in Arabic is '
        'correctly linked to an assessment stated in English.',
        'Generates the final note in the clinician\u2019s preferred documentation language, regardless of '
        'which languages were spoken.',
        'Preserves patient-reported quotes in their original language when clinically relevant.'
    ])

    pdf.section_heading(5, 'Real-World Deployment Cases')
    pdf.sub_heading('5.1 Dubai \u2014 Arabic/English')
    pdf.body_text(
        'A multi-specialty clinic in Dubai uses ClinixSummary for consultations conducted primarily in '
        'Arabic with English medical terminology. Notes are generated in English for insurance compatibility, '
        'with Arabic summaries for patient records. The code-switching model handles the frequent '
        'Arabic-English transitions without requiring clinician intervention.')
    pdf.sub_heading('5.2 Montreal \u2014 French/English')
    pdf.body_text(
        'A family practice in Montreal serves a bilingual patient population. Consultations may be '
        'conducted entirely in French, entirely in English, or in a mix. ClinixSummary generates notes '
        'in the clinician\u2019s preferred language while correctly processing input in either language.')

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'Multilingual clinical documentation is not a niche requirement \u2014 it is the reality of modern '
        'healthcare. ClinixSummary\u2019s native multilingual capability, including real-time code-switching, '
        'enables clinicians worldwide to document naturally in the languages they and their patients '
        'actually speak.')
    pdf.info_box('For multilingual capability demonstrations, contact: demo@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'multilingual-clinical-documentation-2025.pdf'))
    print('  [OK] PUB-2025-004 Multilingual')


def pub05_privacy():
    """PUB-2025-005: Privacy by Design — May 2025"""
    pdf = PubPDF('PUB-2025-005', 'May 2025',
                 'Privacy by Design: Building Clinical AI Without Compromising Patient Data')
    pdf.cover_page(
        'Our approach to training on de-identified data, HIPAA/GDPR compliance, and why proprietary '
        'models are inherently more secure than generic LLM wrappers.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'The rise of generative AI in healthcare has created a tension: the most capable models require '
        'vast training data, yet clinical data is among the most sensitive information in existence. Many '
        'AI documentation products address this tension poorly \u2014 by sending patient data to third-party '
        'large language models with unclear data handling practices. ClinixSummary takes a fundamentally '
        'different approach: privacy by design.')

    pdf.section_heading(2, 'The Problem with Generic LLM Wrappers')
    pdf.body_text(
        'A significant number of AI clinical documentation products are architecturally simple: they '
        'transcribe clinical audio, send the transcript to a third-party LLM via API, and return the '
        'formatted response. This approach has serious privacy implications:')
    pdf.bullet_list([
        'Patient data leaves the healthcare organisation\u2019s control and enters third-party infrastructure.',
        'Data retention policies are determined by the LLM provider, not the healthcare organisation.',
        'Training data contamination \u2014 some providers may use API inputs for model improvement unless '
        'explicitly opted out.',
        'Regulatory grey areas \u2014 BAA coverage for third-party LLM APIs varies and may not cover all '
        'data processing activities.',
        'No specialty-specific optimisation \u2014 general-purpose models lack clinical domain depth.'
    ])

    pdf.section_heading(3, 'ClinixSummary\u2019s Privacy Architecture')
    pdf.sub_heading('3.1 Proprietary Models')
    pdf.body_text(
        'ClinixSummary uses proprietary clinical language models trained and hosted entirely within our '
        'controlled infrastructure. No patient data is ever sent to third-party AI providers. This '
        'eliminates the most significant privacy risk in AI clinical documentation.')
    pdf.sub_heading('3.2 De-Identified Training Data')
    pdf.body_text(
        'All model training uses rigorously de-identified data compliant with HIPAA Safe Harbor and '
        'Expert Determination standards. Training data sources include licensed de-identified datasets, '
        'medical literature, clinical guidelines, and synthetic data validated by clinicians.')
    pdf.sub_heading('3.3 Ephemeral Audio Processing')
    pdf.body_text(
        'Audio recordings are encrypted immediately upon capture, processed in secure memory, and deleted '
        'automatically after note generation. Maximum audio retention is 24 hours, after which '
        'cryptographic erasure ensures irrecoverable deletion.')
    pdf.sub_heading('3.4 Data Sovereignty')
    pdf.body_text(
        'ClinixSummary offers geographic data residency (US, EU, UK, AU) ensuring that patient data '
        'never leaves the jurisdiction in which it was created. For enterprise customers, on-premises '
        'deployment is available.')

    pdf.section_heading(4, 'Regulatory Compliance')
    pdf.body_text('Privacy by design translates directly to regulatory compliance:')
    pdf.bullet_list([
        'HIPAA \u2014 BAAs executed for all US customers. Full Administrative, Physical, and Technical Safeguards.',
        'GDPR \u2014 Data Processing Agreements, DPIAs, data subject rights, EU data residency.',
        'PIPEDA/PHIPA \u2014 Canadian privacy framework compliance.',
        'CCPA \u2014 California Consumer Privacy Act compliance.',
        'Australian Privacy Act \u2014 APPs compliance for Australian deployments.'
    ])

    pdf.section_heading(5, 'Why Proprietary Models Are More Secure')
    pdf.body_text('Proprietary models provide security advantages beyond data handling:')
    pdf.bullet_list([
        'Reduced attack surface \u2014 no external API calls to intercept or compromise.',
        'Full control over model behaviour \u2014 no risk of prompt injection or jailbreaking affecting clinical outputs.',
        'Deterministic behaviour \u2014 proprietary models can be locked to specific versions, ensuring consistent behaviour.',
        'Auditable processing \u2014 every step of the pipeline is logged and auditable within ClinixSummary\u2019s infrastructure.'
    ])

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'Privacy in clinical AI is not a feature \u2014 it is a design philosophy. ClinixSummary\u2019s proprietary '
        'model architecture ensures that patient data remains under the healthcare organisation\u2019s control '
        'at all times, with no reliance on third-party AI providers. This is the standard that healthcare '
        'AI should meet.')
    pdf.info_box('To discuss privacy architecture in detail or request a security review, contact: security@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'privacy-by-design-clinical-ai-2025.pdf'))
    print('  [OK] PUB-2025-005 Privacy by Design')


def pub06_allied_health():
    """PUB-2025-006: Allied Health — June 2025"""
    pdf = PubPDF('PUB-2025-006', 'June 2025',
                 "Allied Health Documentation: Why One Model Doesn\u2019t Fit All")
    pdf.cover_page(
        'How physiotherapy, occupational therapy, and speech & language therapy each require '
        'fundamentally different documentation models \u2014 and why ClinixSummary built dedicated modules.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Allied health disciplines \u2014 physiotherapy, occupational therapy, speech & language therapy, and '
        'others \u2014 have documentation requirements that differ fundamentally from medical and surgical '
        'specialties. A physiotherapy session note has little in common with a surgical operative report '
        'or a psychiatric evaluation. Yet most AI documentation systems treat all specialties as variations '
        'of the same problem. ClinixSummary disagrees.')

    pdf.section_heading(2, 'The Allied Health Documentation Challenge')
    pdf.body_text('Each allied health discipline has unique documentation patterns:')
    pdf.sub_heading('2.1 Physiotherapy')
    pdf.bullet_list([
        'Objective measures: range of motion (ROM), muscle strength grading (MRC/Oxford), functional '
        'assessments (Timed Up and Go, Berg Balance Scale).',
        'Exercise prescription with sets, repetitions, resistance, and progression criteria.',
        'Treatment modalities (manual therapy, electrotherapy, dry needling) with parameters and response.',
        'Goal-oriented documentation linking interventions to functional outcomes.'
    ])
    pdf.sub_heading('2.2 Occupational Therapy')
    pdf.bullet_list([
        'Activity and participation assessments using standardised tools (COPM, FIM, Barthel Index).',
        'Environmental and equipment assessments and recommendations.',
        'Cognitive and perceptual screening documentation.',
        'Graded activity and task analysis documentation for rehabilitation planning.'
    ])
    pdf.sub_heading('2.3 Speech & Language Therapy')
    pdf.bullet_list([
        'Articulation, phonology, and fluency assessments with specific notation systems.',
        'Language comprehension and expression testing with norm-referenced scores.',
        'Swallowing assessments (including instrumental evaluation results).',
        'Augmentative and alternative communication (AAC) evaluation and trials.'
    ])

    pdf.section_heading(3, 'Why Generic Models Fail')
    pdf.body_text(
        'A generic clinical documentation model trained primarily on medical and surgical data produces '
        'allied health notes that are:')
    pdf.bullet_list([
        'Missing discipline-specific assessment tools and scoring systems.',
        'Structured as SOAP notes when the discipline uses different frameworks (e.g., ICF-based documentation in physiotherapy).',
        'Unable to capture exercise prescriptions, activity analyses, or therapy session parameters accurately.',
        'Using medical terminology where allied health has its own terminology (e.g., \u201cmobilisation\u201d '
        'means different things in physiotherapy vs. medicine).'
    ])

    pdf.section_heading(4, 'ClinixSummary\u2019s Dedicated Allied Health Modules')
    pdf.body_text('ClinixSummary built separate modules for each allied health discipline, each with:')
    pdf.bullet_list([
        'Discipline-specific NER models that recognise the correct terminology, assessment tools, and documentation patterns.',
        'Appropriate note structures \u2014 not forced SOAP format, but the format each discipline actually uses.',
        'Discipline-specific training data sourced from and validated by practicing clinicians in each field.',
        'Output templates designed by clinicians in each discipline to meet their regulatory and professional documentation requirements.'
    ])

    pdf.section_heading(5, 'Validation Results')
    pdf.body_text('Clinician acceptance rates for ClinixSummary\u2019s allied health modules:')
    pdf.bullet_list([
        'Physiotherapy: 91% acceptance rate, averaging 2.1 edits per note.',
        'Occupational Therapy: 89% acceptance rate, averaging 2.4 edits per note.',
        'Speech & Language Therapy: 88% acceptance rate, averaging 2.7 edits per note.'
    ])
    pdf.body_text(
        'These rates are comparable to ClinixSummary\u2019s core medical modules, demonstrating that '
        'discipline-specific training achieves parity across specialties.')

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'Allied health professionals deserve documentation tools built for their disciplines, not adapted '
        'from medical models. ClinixSummary\u2019s commitment to dedicated allied health modules reflects our '
        'belief that every clinician\u2019s documentation needs matter \u2014 not just those of physicians and surgeons.')
    pdf.info_box('For allied health module demonstrations, contact: demo@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'allied-health-documentation-2025.pdf'))
    print('  [OK] PUB-2025-006 Allied Health')


def pub07_economics():
    """PUB-2025-007: Economics of AI Scribes — July 2025"""
    pdf = PubPDF('PUB-2025-007', 'July 2025',
                 'The Economics of AI Scribes: ROI Analysis for Healthcare Organizations')
    pdf.cover_page(
        'Hard numbers on cost savings, productivity gains, reimbursement improvements, and reduced '
        'coding errors when deploying AI documentation at scale.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Healthcare organisations considering AI documentation adoption need to justify the investment '
        'with concrete financial analysis. This publication provides a framework for calculating the '
        'return on investment (ROI) of deploying ClinixSummary, based on real-world deployment data '
        'and published research on documentation costs.')

    pdf.section_heading(2, 'The Cost of Manual Documentation')
    pdf.body_text(
        'Before calculating ROI, organisations must understand the true cost of their current '
        'documentation burden:')
    pdf.bullet_list([
        'Direct time cost \u2014 Physicians spend significant time on EHR-related documentation. Sinsky et '
        'al. (Annals of Internal Medicine, 2016) found that for every hour of direct patient care, physicians '
        'spend nearly two additional hours on EHR tasks and desk work.',
        'Opportunity cost \u2014 Time spent on documentation could be spent seeing additional patients, '
        'generating additional revenue per day.',
        'Overtime and burnout costs \u2014 After-hours documentation drives overtime costs and contributes '
        'to turnover ($500K\u2013$1M per physician departure, per AAMC and Merritt Hawkins recruitment data).',
        'Coding deficiencies \u2014 The Medical Group Management Association (MGMA) reports that claim '
        'denial rates in healthcare typically range from 5\u201310% of total claims submitted, with documentation '
        'gaps being a significant contributing factor.'
    ])

    pdf.section_heading(3, 'ROI Components')
    pdf.sub_heading('3.1 Time Savings')
    pdf.body_text(
        'ClinixSummary reduces per-encounter documentation time by an average of 81%. For a practice '
        'with 10 clinicians each seeing 20 patients per day, this translates to:')
    pdf.bullet_list([
        'Total documentation time saved: 26 hours per day across the practice.',
        'Annualised time savings: 6,760 hours per year (based on 260 working days).',
        'Labour cost savings: $507,000\u2013$1,014,000 per year (depending on clinician compensation).'
    ])
    pdf.sub_heading('3.2 Increased Patient Throughput')
    pdf.body_text(
        'With documentation time reduced, clinicians can see additional patients. Conservative estimates '
        'of 2 additional patients per clinician per day yield:')
    pdf.bullet_list([
        'Additional encounters: 5,200 per year (10 clinicians \u00d7 2 patients \u00d7 260 days).',
        'Additional revenue: $520,000\u2013$1,560,000 per year (at $100\u2013$300 per encounter).'
    ])
    pdf.sub_heading('3.3 Improved Coding Accuracy')
    pdf.body_text(
        'AI-generated documentation captures clinical detail more consistently, supporting appropriate '
        'coding. Organisations deploying ClinixSummary report a 15\u201325% reduction in claim denials and '
        'a measurable improvement in coding specificity.')
    pdf.sub_heading('3.4 Reduced Turnover')
    pdf.body_text(
        'By addressing a leading driver of clinician burnout, AI documentation reduces turnover risk. '
        'Even preventing one physician departure per year saves $500K\u2013$1M in recruitment, onboarding, '
        'and lost revenue.')

    pdf.section_heading(4, 'Total ROI Summary')
    pdf.body_text('For a representative 10-clinician practice:')
    pdf.bullet_list([
        'Annual ClinixSummary cost: approximately $36,000\u2013$60,000 (depending on plan).',
        'Conservative annual benefit: $700,000\u2013$2,000,000.',
        'ROI: 12\u201333x investment.',
        'Payback period: less than 30 days.'
    ])

    pdf.section_heading(5, 'Beyond the Numbers')
    pdf.body_text(
        'Some benefits resist quantification but are equally important: clinician wellbeing, patient '
        'satisfaction from more present clinicians, reduced medico-legal risk from complete documentation, '
        'and improved care quality from better clinical data capture.')

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'The ROI of AI documentation is compelling by any measure. The financial case alone \u2014 time '
        'savings, throughput gains, coding accuracy, and retention \u2014 justifies adoption. The human '
        'case \u2014 restored clinical joy, better patient relationships, reduced burnout \u2014 makes it imperative.')
    pdf.info_box(
        'For a customised ROI analysis for your organisation, visit the ROI Calculator at '
        'clinixsummary.ai or contact: sales@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'economics-of-ai-scribes-roi-2025.pdf'))
    print('  [OK] PUB-2025-007 Economics')


def pub08_auto_detection():
    """PUB-2025-008: Auto-Detection — August 2025"""
    pdf = PubPDF('PUB-2025-008', 'August 2025',
                 'From Ambient to Operative: Auto-Detection of Clinical Documentation Modes')
    pdf.cover_page(
        'Technical overview of how ClinixSummary automatically detects whether audio is ambient '
        'consultation, post-visit dictation, or operative narration \u2014 and adapts accordingly.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Clinical documentation occurs in multiple modes: ambient consultation capture, single-speaker '
        'post-visit dictation, and real-time operative narration. Each mode has distinct audio '
        'characteristics, speaker patterns, and documentation requirements. ClinixSummary\u2019s Auto Ambient '
        'Dictate system automatically detects the documentation mode and adapts its processing pipeline '
        'accordingly, requiring no manual mode selection by the clinician.')

    pdf.section_heading(2, 'The Three Documentation Modes')
    pdf.sub_heading('2.1 Ambient Consultation')
    pdf.body_text(
        'Multi-speaker clinical encounter captured via device microphone. Characteristics: multiple speakers, '
        'conversational cadence, background environmental noise, mix of clinical and social dialogue, '
        'patient-reported symptoms alongside clinician assessments.')
    pdf.sub_heading('2.2 Post-Visit Dictation')
    pdf.body_text(
        'Single-speaker narration after the patient encounter. Characteristics: single speaker, structured '
        'delivery, medical shorthand and abbreviations, higher speech rate, explicit section headers '
        '(\u201cAssessment and Plan...\u201d).')
    pdf.sub_heading('2.3 Operative Narration')
    pdf.body_text(
        'Real-time narration during surgical or procedural work. Characteristics: single primary speaker '
        'with occasional team communication, procedural terminology, background equipment sounds, '
        'step-by-step procedural description, specimen and instrument references.')

    pdf.section_heading(3, 'Detection Methodology')
    pdf.body_text(
        'ClinixSummary detects the documentation mode within the first 15\u201330 seconds of audio using '
        'a multi-signal classifier that analyses:')
    pdf.bullet_list([
        'Speaker count and turn-taking patterns \u2014 ambient has frequent speaker alternation; dictation '
        'and operative are primarily single-speaker.',
        'Speech rate and cadence \u2014 dictation tends to be faster and more structured than conversational '
        'ambient speech.',
        'Vocabulary profile \u2014 operative narration has distinct procedural vocabulary; dictation uses '
        'more formal medical language than ambient.',
        'Audio environment \u2014 background noise signatures differ between clinic rooms, operating theatres, '
        'and quiet dictation environments.',
        'Linguistic structure \u2014 dictation often begins with patient identifiers and section headers; '
        'ambient begins with greetings and open-ended questions.'
    ])
    pdf.body_text(
        'Detection confidence is continuously updated as more audio is processed, with mode transitions '
        'handled seamlessly if the clinician switches mid-session (e.g., from ambient consultation to '
        'dictated addendum).')

    pdf.section_heading(4, 'Pipeline Adaptation')
    pdf.body_text('Once the mode is detected, the processing pipeline adapts:')
    pdf.bullet_list([
        'Ambient mode activates speaker diarisation, patient vs. clinician attribution, and conversational NLP models.',
        'Dictation mode uses single-speaker models optimised for structured medical narration, with enhanced '
        'abbreviation expansion and section header detection.',
        'Operative mode engages procedural terminology models, instrument and specimen recognition, and '
        'operative report templates.'
    ])

    pdf.section_heading(5, 'Detection Performance')
    pdf.bullet_list([
        'Mode detection accuracy: 97.3% within 30 seconds.',
        'Mid-session mode transition detection: 94.1%.',
        'False mode detection rate: 1.8% (with automatic self-correction in >90% of false detections).'
    ])

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'Auto-detection of documentation modes eliminates a friction point that other systems impose on '
        'clinicians. By adapting automatically to how the clinician is working, ClinixSummary ensures '
        'that the documentation system serves the clinician \u2014 not the other way around.')
    pdf.info_box('For technical details on mode detection, contact: technical@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'auto-detection-documentation-modes-2025.pdf'))
    print('  [OK] PUB-2025-008 Auto-Detection')


def pub09_kaizen():
    """PUB-2025-009: Kai-zen — September 2025"""
    pdf = PubPDF('PUB-2025-009', 'September 2025',
                 'Kai-zen in Healthcare AI: The Case for Continuous Model Improvement')
    pdf.cover_page(
        'Why static AI models fail in medicine, and how ClinixSummary\u2019s weekly update cycle and '
        'clinician feedback loop produce consistently improving outputs.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Most AI systems are trained once and deployed as static models, receiving updates infrequently '
        '\u2014 sometimes quarterly, sometimes annually. In clinical documentation, this approach is '
        'fundamentally flawed. Medical language evolves, clinical guidelines change, new medications '
        'enter the market, and individual clinician preferences vary. ClinixSummary\u2019s Kai-zen '
        'philosophy \u2014 borrowed from the Japanese principle of continuous improvement \u2014 embeds '
        'ongoing model refinement into the core product architecture.')

    pdf.section_heading(2, 'Why Static Models Fail in Medicine')
    pdf.bullet_list([
        'New medications, procedures, and clinical guidelines emerge continuously. A model trained in '
        'January lacks awareness of a drug approved in March.',
        'Medical terminology evolves \u2014 diagnostic criteria change (e.g., sepsis definitions), '
        'classification systems are updated (ICD-10 revisions), and new clinical concepts emerge.',
        'Clinician feedback reveals systematic patterns \u2014 repeated corrections indicate model '
        'deficiencies that should be addressed, not endured.',
        'Specialty expansion requires continuous learning \u2014 as ClinixSummary adds new specialties, '
        'models must incorporate new domain knowledge.'
    ])

    pdf.section_heading(3, 'The Kai-zen Process')
    pdf.sub_heading('3.1 Feedback Collection')
    pdf.body_text(
        'Every clinician interaction with a ClinixSummary note generates potential learning signal: '
        'edits, corrections, section rearrangements, terminology substitutions, and explicit ratings. '
        'This feedback is captured, de-identified, and aggregated automatically.')
    pdf.sub_heading('3.2 Pattern Analysis')
    pdf.body_text(
        'Aggregated feedback is analysed weekly to identify systematic patterns: consistently '
        'mis-recognised terms, section classification errors specific to certain specialties, new '
        'terminology appearing in clinician corrections, and accuracy variations across languages or regions.')
    pdf.sub_heading('3.3 Prioritised Retraining')
    pdf.body_text(
        'Identified patterns are prioritised by clinical impact and frequency. High-impact issues '
        '(medication names, dosage recognition) are expedited. Retraining targets the specific model '
        'components affected, avoiding unnecessary changes to well-performing areas.')
    pdf.sub_heading('3.4 Validation and Deployment')
    pdf.body_text(
        'Every model update passes through the Clinix QM validation gates: automated regression testing, '
        'specialty benchmarks, clinical review, and A/B testing before full deployment. Updates that do '
        'not meet or exceed the previous version\u2019s performance are rejected.')

    pdf.section_heading(4, 'Results: Measurable Improvement Over Time')
    pdf.body_text('ClinixSummary\u2019s Clinician Acceptance Rate has improved consistently since launch:')
    pdf.bullet_list([
        'Q1 2025 (launch): 87% average acceptance rate.',
        'Q2 2025: 90% (+3 points).',
        'Q3 2025: 92% (+2 points).',
        'Q4 2025: 93.5% (+1.5 points).',
        'Target Q2 2026: >95%.'
    ])
    pdf.body_text(
        'Average edits per note have decreased from 4.2 at launch to 1.8 \u2014 a 57% reduction in '
        'clinician correction effort.')

    pdf.section_heading(5, 'Conclusion')
    pdf.body_text(
        'Continuous improvement is not a feature \u2014 it is a design philosophy that recognises the '
        'dynamic nature of medicine. ClinixSummary\u2019s Kai-zen approach ensures that the system gets '
        'better every week, driven by the collective intelligence of the clinicians who use it.')
    pdf.info_box('For quality metrics and improvement trends, contact: quality@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'kaizen-continuous-model-improvement-2025.pdf'))
    print('  [OK] PUB-2025-009 Kai-zen')


def pub10_icd10_cpt():
    """PUB-2025-010: ICD-10 and CPT Coding — October 2025"""
    pdf = PubPDF('PUB-2025-010', 'October 2025',
                 'ICD-10 and CPT Coding Accuracy: How AI Reduces Claim Denials')
    pdf.cover_page(
        'Data on coding errors in manual documentation vs. AI-assisted documentation. How contextual '
        'understanding improves coding accuracy and reimbursement.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Medical coding \u2014 the translation of clinical encounters into ICD-10 diagnosis codes and CPT '
        'procedure codes \u2014 is the bridge between clinical care and revenue. When documentation is '
        'incomplete or ambiguous, coders make conservative choices that result in downcoding, or errors '
        'that trigger claim denials. AI-generated documentation that consistently captures clinical detail '
        'improves coding accuracy, reduces denials, and supports appropriate reimbursement.')

    pdf.section_heading(2, 'The Coding Accuracy Problem')
    pdf.body_text(
        'Manual documentation produces coding challenges at multiple levels:')
    pdf.bullet_list([
        'Incomplete documentation \u2014 missing specificity (e.g., \u201cdiabetes\u201d without type or complication '
        'detail) forces coders to use unspecified codes, reducing reimbursement.',
        'Ambiguous language \u2014 \u201cpossible pneumonia\u201d vs. \u201cpneumonia\u201d changes coding; \u201ctreated fracture\u201d '
        'without laterality or type lacks required specificity.',
        'Missing linkage \u2014 procedures must be linked to diagnoses that justify them; incomplete '
        'documentation breaks this chain.',
        'Inconsistent detail \u2014 clinician documentation practices vary widely; some clinicians routinely '
        'document at the specificity coders need, many do not.'
    ])
    pdf.body_text(
        'Industry data from the American Academy of Professional Coders (AAPC) and the Medical Group '
        'Management Association (MGMA) indicates that claim denial rates across the healthcare industry '
        'typically range from 5\u201310% of total claims submitted, with some organisations experiencing '
        'rates above 15%. The cost of reworking denied claims ranges from $25 to over $100 per claim, '
        'depending on complexity.')
    pdf.reference_text(
        'Sources: MGMA Stat Poll, 2023; AAPC Healthcare Business Monthly; Change Healthcare Revenue '
        'Cycle Denials Index.')

    pdf.section_heading(3, 'How AI Documentation Improves Coding')
    pdf.sub_heading('3.1 Consistent Specificity')
    pdf.body_text(
        'ClinixSummary\u2019s clinical NLP extracts and documents clinical details at the specificity '
        'level required for accurate coding: laterality, acuity, complication status, anatomical location, '
        'and severity. These details are captured from the clinical conversation even when the clinician '
        'doesn\u2019t explicitly dictate them in structured format.')
    pdf.sub_heading('3.2 Diagnosis-Procedure Linkage')
    pdf.body_text(
        'The contextual reasoning engine automatically links documented procedures to their supporting '
        'diagnoses, ensuring that the coded claim has complete clinical justification.')
    pdf.sub_heading('3.3 Code Suggestions')
    pdf.body_text(
        'ClinixSummary generates ICD-10 and CPT code suggestions based on the documented clinical '
        'content. These suggestions serve as decision support for coders and clinicians, reducing the '
        'gap between clinical documentation and coding requirements.')

    pdf.section_heading(4, 'Measured Impact')
    pdf.body_text('Organisations deploying ClinixSummary for documentation report:')
    pdf.bullet_list([
        'Claim denial rates reduced by 18\u201325% within 90 days of deployment.',
        'Coding specificity improvement \u2014 30% reduction in use of \u201cunspecified\u201d diagnosis codes.',
        'Revenue uplift of 3\u20137% from improved coding accuracy (reduced downcoding and denials).',
        'Coder productivity improvement \u2014 35% reduction in coder time per chart due to more complete documentation.'
    ])

    pdf.section_heading(5, 'Compliance Considerations')
    pdf.body_text(
        'AI-assisted coding raises legitimate compliance questions. ClinixSummary addresses these:')
    pdf.bullet_list([
        'Code suggestions are decision support \u2014 the clinician and/or certified coder makes the final '
        'coding determination.',
        'Documentation drives coding \u2014 ClinixSummary improves the documentation, which improves '
        'coding accuracy. It does not manipulate codes independently of clinical content.',
        'Audit trail \u2014 every code suggestion is linked to the specific clinical documentation that '
        'supports it, providing a clear compliance trail.'
    ])

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'Coding accuracy is a documentation problem, not a coding problem. When clinical encounters '
        'are documented completely and with appropriate specificity, coding accuracy follows naturally. '
        'ClinixSummary addresses coding at the source \u2014 by producing documentation that consistently '
        'captures the clinical detail coders need.')
    pdf.info_box('For coding accuracy analysis and deployment case studies, contact: sales@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'icd10-cpt-coding-accuracy-2025.pdf'))
    print('  [OK] PUB-2025-010 ICD-10/CPT')


def pub11_cme_cpd():
    """PUB-2025-011: CME/CPD — November 2025"""
    pdf = PubPDF('PUB-2025-011', 'November 2025',
                 'The Future of Medical Education: Integrating CME/CPD into the Documentation Workflow')
    pdf.cover_page(
        'How the CME/CPD Vault turns routine clinical documentation into learning opportunities, '
        'and the potential to earn continuing education credits through practice.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Continuing Medical Education (CME) and Continuing Professional Development (CPD) are essential '
        'for maintaining clinical competence, yet they are typically disconnected from daily practice. '
        'Clinicians attend conferences, complete online modules, and read journal articles \u2014 activities '
        'separated from the clinical encounters where learning actually happens. ClinixSummary\u2019s CME/CPD '
        'Vault reimagines professional development by integrating it directly into the clinical '
        'documentation workflow.')

    pdf.section_heading(2, 'The CME/CPD Problem')
    pdf.body_text('The current model of continuing education has well-documented limitations:')
    pdf.bullet_list([
        'Time burden \u2014 Clinicians must complete 20\u201350 hours of CME/CPD annually (varying by '
        'jurisdiction, specialty, and regulatory body).',
        'Disconnection from practice \u2014 Educational activities rarely relate to the clinician\u2019s actual '
        'case mix and learning needs.',
        'Compliance focus \u2014 Many clinicians view CME/CPD as a regulatory requirement to fulfil, not '
        'a learning opportunity.',
        'Passive learning \u2014 Traditional formats (lectures, articles) are passive; evidence in medical '
        'education research supports the superiority of active, practice-based learning over didactic instruction.',
        'Cost \u2014 Conference attendance, course fees, and time away from practice represent significant costs.'
    ])

    pdf.section_heading(3, 'The CME/CPD Vault Concept')
    pdf.body_text(
        'ClinixSummary\u2019s CME/CPD Vault transforms clinical documentation encounters into structured '
        'learning opportunities:')
    pdf.sub_heading('3.1 Encounter-Based Learning')
    pdf.body_text(
        'After documenting a clinical encounter, the CME/CPD Vault identifies learning opportunities '
        'embedded in the case: rare diagnoses, guideline updates relevant to the documented condition, '
        'new evidence on prescribed treatments, or clinical decision points where multiple valid approaches exist.')
    pdf.sub_heading('3.2 Personalised Learning Paths')
    pdf.body_text(
        'Over time, the Vault builds a profile of the clinician\u2019s case mix and identifies knowledge '
        'gaps or areas where practice patterns diverge from current guidelines. Learning recommendations '
        'are personalised to the clinician\u2019s actual practice, not generic curricula.')
    pdf.sub_heading('3.3 Micro-Learning Format')
    pdf.body_text(
        'Learning modules are designed for integration into the clinical workflow: 2\u20135 minute evidence '
        'summaries, guideline highlights, and clinical pearls that can be reviewed during note finalisation '
        'or between patients.')
    pdf.sub_heading('3.4 Credit Tracking')
    pdf.body_text(
        'The Vault automatically tracks learning activities and maps them to CME/CPD credit requirements. '
        'Clinicians can generate compliance reports for regulatory bodies without manual logging.')

    pdf.section_heading(4, 'Evidence for Practice-Based Learning')
    pdf.body_text(
        'The educational rationale for the CME/CPD Vault is grounded in established learning science:')
    pdf.bullet_list([
        'Contextual learning \u2014 educational research demonstrates that information encountered in context '
        '(such as a real clinical case) is retained more effectively than decontextualised learning '
        '(Koens et al., Medical Education, 2003).',
        'Spaced repetition \u2014 encountering relevant guidelines across multiple cases reinforces retention '
        'far more effectively than single-session learning (Kerfoot et al., Academic Medicine, 2010).',
        'Reflective practice \u2014 reviewing case-relevant evidence during documentation encourages the '
        'reflective practice advocated by medical education frameworks such as Kolb\u2019s experiential '
        'learning cycle.',
        'Just-in-time learning \u2014 learning at the point of care, when the clinician has a real question, '
        'is among the most effective forms of professional development (Sackett et al., Evidence-Based Medicine, 2000).'
    ])

    pdf.section_heading(5, 'Implementation Status')
    pdf.body_text('The CME/CPD Vault launched in Q4 2025 with the following capabilities:')
    pdf.bullet_list([
        'Case-relevant guideline surfacing for documented conditions.',
        'Evidence summaries linked to clinical decisions in the documented encounter.',
        'Automated learning activity tracking and CPD hour logging.',
        'Initial accreditation partnerships for CME credit recognition (expanding throughout 2026).'
    ])

    pdf.section_heading(6, 'The Vision: Learning Through Practice')
    pdf.body_text(
        'The long-term vision for the CME/CPD Vault is a world where professional development is '
        'seamlessly embedded in clinical practice. Every patient encounter becomes a learning opportunity. '
        'Every documented case contributes to the clinician\u2019s professional growth. Documentation stops '
        'being a burden and becomes a catalyst for continuous improvement \u2014 for both the AI system and '
        'the clinician using it.')
    pdf.info_box(
        'To learn more about the CME/CPD Vault or explore accreditation partnerships, contact: '
        'cme@clinixsummary.ai')

    pdf.output(os.path.join(OUT_DIR, 'cme-cpd-documentation-workflow-2025.pdf'))
    print('  [OK] PUB-2025-011 CME/CPD')


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    os.makedirs(OUT_DIR, exist_ok=True)
    print('Regenerating all 11 publication PDFs...\n')

    pub01_gold_standard()
    pub02_burnout()
    pub03_contextual_reasoning()
    pub04_multilingual()
    pub05_privacy()
    pub06_allied_health()
    pub07_economics()
    pub08_auto_detection()
    pub09_kaizen()
    pub10_icd10_cpt()
    pub11_cme_cpd()

    print('\nAll 11 publications regenerated successfully.')
