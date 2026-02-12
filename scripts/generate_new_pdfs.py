#!/usr/bin/env python3
"""
Generate:
1. Updated Kai-zen PDF with Japanese kanji in title
2. New Charge Capture publication (PUB-2025-012)
3. Patient Privacy Leaflet for clinic walls
"""

import os
from fpdf import FPDF

# ── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB_DIR  = os.path.join(BASE_DIR, 'docs', 'publications')
RES_DIR  = os.path.join(BASE_DIR, 'docs', 'resources')
LOGO     = os.path.join(BASE_DIR, 'images', 'logo-wings.png')
FONT_DIR = '/usr/share/fonts/truetype/liberation'

ACCENT = (59, 197, 214)
DARK   = (9, 38, 58)
IPA_FONT = '/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf'


# ── PubPDF class (same as regenerate_publications.py) ────────────────────────

class PubPDF(FPDF):
    def __init__(self, doc_id, date_str, title):
        super().__init__()
        self.doc_id = doc_id
        self.date_str = date_str
        self.pub_title = title
        self.add_font('Liberation', '', os.path.join(FONT_DIR, 'LiberationSans-Regular.ttf'), uni=True)
        self.add_font('Liberation', 'B', os.path.join(FONT_DIR, 'LiberationSans-Bold.ttf'), uni=True)
        self.add_font('Liberation', 'I', os.path.join(FONT_DIR, 'LiberationSans-Italic.ttf'), uni=True)
        self.add_font('Liberation', 'BI', os.path.join(FONT_DIR, 'LiberationSans-BoldItalic.ttf'), uni=True)
        self.add_font('IPA', '', IPA_FONT, uni=True)
        self.set_auto_page_break(auto=True, margin=25)

    def header(self):
        if os.path.exists(LOGO):
            self.image(LOGO, 10, 8, 12)
        self.set_font('Liberation', 'B', 11)
        self.set_text_color(*DARK)
        self.set_xy(24, 10)
        self.cell(0, 5, 'ClinixSummary', ln=False)
        self.set_font('Liberation', '', 8)
        self.set_text_color(120, 120, 120)
        self.set_xy(24, 16)
        self.cell(0, 4, f'Publication  |  {self.doc_id}', ln=False)
        self.set_xy(140, 16)
        self.cell(0, 4, f'Published: {self.date_str}', ln=False)
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
        self.set_font('Liberation', 'I', 10)
        self.set_text_color(80, 80, 80)
        self.set_x(14)
        self.multi_cell(182, 5.5, text, fill=True)
        self.ln(3)


# ══════════════════════════════════════════════════════════════════════════════
# 1. UPDATED KAI-ZEN PDF
# ══════════════════════════════════════════════════════════════════════════════

def generate_kaizen():
    # Use a clean ASCII title for headers/footers, render kanji separately on cover
    pdf = PubPDF('PUB-2025-009', 'September 2025',
                 'Kai-zen in Healthcare AI: The Case for Continuous Model Improvement')
    # Custom cover page with kanji rendered via IPA font
    pdf.add_page()
    pdf.alias_nb_pages()
    pdf.set_y(50)
    pdf.set_font('Liberation', 'B', 9)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 6, 'PUBLICATION', ln=True)
    pdf.ln(4)
    # Title line 1: "Kai-zen (改善) in Healthcare AI:"
    pdf.set_font('Liberation', 'B', 24)
    pdf.set_text_color(*DARK)
    x0 = pdf.get_x()
    y0 = pdf.get_y()
    pdf.cell(0, 11, 'Kai-zen (', ln=False)
    kx = pdf.get_x()
    pdf.set_font('IPA', '', 24)
    pdf.cell(0, 11, '\u6539\u5584', ln=False)
    kx2 = pdf.get_x()
    pdf.set_font('Liberation', 'B', 24)
    pdf.set_xy(kx2, y0)
    pdf.cell(0, 11, ') in Healthcare AI:', ln=True)
    # Title line 2
    pdf.set_font('Liberation', 'B', 24)
    pdf.cell(0, 11, 'The Case for Continuous Model', ln=True)
    pdf.cell(0, 11, 'Improvement', ln=True)
    pdf.ln(4)
    pdf.set_font('Liberation', '', 12)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(0, 7,
        'Why static AI models fail in medicine, and how ClinixSummary\u2019s weekly update cycle and '
        'clinician feedback loop produce consistently improving outputs.')
    # Meta box
    pdf.ln(12)
    pdf.set_fill_color(242, 242, 240)
    pdf.set_font('Liberation', '', 9)
    my = pdf.get_y()
    pdf.rect(10, my, 190, 32, 'F')
    pdf.set_xy(14, my + 4)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(40, 5, 'Published:', ln=False)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 5, 'September 2025', ln=True)
    pdf.set_x(14)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(40, 5, 'Document ID:', ln=False)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 5, 'PUB-2025-009', ln=True)
    pdf.set_x(14)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(40, 5, 'Classification:', ln=False)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 5, 'Public', ln=True)
    pdf.set_x(14)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(40, 5, 'Author:', ln=False)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 5, 'ClinixSummary Research Team', ln=True)
    pdf.set_y(my + 38)
    pdf.set_font('Liberation', 'I', 7)
    pdf.set_text_color(140, 140, 140)
    pdf.multi_cell(0, 3.5,
        'This document is provided for informational purposes only. ClinixSummary is a product of GATMEDI. '
        'The information contained herein is proprietary and confidential. Reproduction or distribution without '
        'prior written consent is prohibited. For the latest version, visit clinixsummary.ai.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Most AI systems are trained once and deployed as static models, receiving updates infrequently '
        '\u2014 sometimes quarterly, sometimes annually. In clinical documentation, this approach is '
        'fundamentally flawed. Medical language evolves, clinical guidelines change, new medications '
        'enter the market, and individual clinician preferences vary.')

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

    pdf.output(os.path.join(PUB_DIR, 'kaizen-continuous-model-improvement-2025.pdf'))
    print('  [OK] PUB-2025-009 Kai-zen (\u6539\u5584) - updated title')


# ══════════════════════════════════════════════════════════════════════════════
# 2. NEW CHARGE CAPTURE PUBLICATION
# ══════════════════════════════════════════════════════════════════════════════

def generate_charge_capture():
    pdf = PubPDF('PUB-2025-012', 'December 2025',
                 'Automated Charge Capture: How AI Documentation Closes the Revenue Gap')
    pdf.cover_page(
        'How ClinixSummary identifies billable procedures, supplies, and interventions from clinical '
        'encounters \u2014 reducing charge leakage and improving revenue integrity. Pilot data shows '
        '30% improvement in charge capture.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Charge capture \u2014 the process of identifying and recording all billable services, procedures, '
        'supplies, and equipment used during a patient encounter \u2014 is one of healthcare\u2019s most '
        'persistent revenue challenges. The Healthcare Financial Management Association (HFMA) '
        'estimates that hospitals lose approximately 1% of net revenue to charge capture leakage '
        'alone, with broader billing and documentation failures costing 3\u20135% of total revenue.')
    pdf.reference_text(
        'Sources: HFMA, "Avoiding the High Cost of Charge-Capture Leakage"; '
        'Advisory Board, Revenue Cycle Benchmarks, 2023.')
    pdf.body_text(
        'ClinixSummary\u2019s automated charge capture module addresses this gap at the source: by '
        'identifying every billable item \u2014 procedures, interventions, equipment, supplies \u2014 directly '
        'from the clinical encounter audio, matched against the organisation\u2019s own charge master. '
        'Pilot deployment data demonstrates a 30% improvement in charge capture within the first month.')

    pdf.section_heading(2, 'The Charge Capture Problem')
    pdf.body_text(
        'Manual charge capture is inherently error-prone. Clinicians are focused on patient care, not '
        'billing \u2014 and documenting every supply used, every piece of equipment deployed, and every '
        'procedure performed is a secondary concern during the encounter. The result is systematic '
        'under-capture of billable items:')
    pdf.bullet_list([
        'Supplies and equipment \u2014 items used during procedures (suture kits, splints, dressings, '
        'injectable medications) are frequently omitted from charge records.',
        'Ancillary procedures \u2014 minor procedures performed during a consultation (wound irrigation, '
        'joint injection, nebuliser treatment) may go unbilled if the clinician forgets to add them.',
        'Level-of-service under-coding \u2014 documentation that lacks specificity leads to conservative '
        'coding, resulting in lower reimbursement than the encounter warrants.',
        'Time-based services \u2014 prolonged service codes, critical care time, and counselling time '
        'are frequently under-reported because clinicians do not track time precisely.'
    ])
    pdf.body_text(
        'For a hospital with $500 million in net patient revenue, even 1% charge leakage represents '
        '$5 million in annual lost revenue \u2014 revenue that was earned through care delivery but never '
        'billed.')

    pdf.section_heading(3, 'Evidence: Scribes and Charge Capture')
    pdf.body_text(
        'The positive impact of scribes on charge capture and revenue is well-documented in '
        'peer-reviewed literature:')
    pdf.bullet_list([
        'A systematic review and meta-analysis by Gottlieb et al. (Annals of Emergency Medicine, 2021) '
        'covering 39 studies and over 562,000 encounters found that scribes increased RVUs per encounter '
        'by 0.14 and RVUs per hour by 0.55 \u2014 reflecting more complete documentation and billing.',
        'Bank et al. (ClinicoEconomics and Outcomes Research, 2013) demonstrated a 57% increase in '
        'work RVUs per hour in a cardiology practice after scribe deployment, with a follow-up study '
        '(2015) showing $1.37 million in additional annual revenue at a scribe cost of approximately $99,000.',
        'Heaton et al. (Journal of Emergency Medicine, 2017) found a positive impact on billed RVUs '
        'for adult patients, particularly in higher-acuity encounters.'
    ])
    pdf.reference_text(
        'Sources: Gottlieb M et al., Ann Emerg Med, 2021;77(2):180-189; '
        'Bank AJ et al., ClinicoEcon Outcomes Res, 2013;5:399-406; '
        'Heaton HA et al., J Emerg Med, 2017;52(3):370-376.')
    pdf.body_text(
        'These studies demonstrate that more complete documentation \u2014 whether produced by human '
        'scribes or AI \u2014 directly translates to more accurate charge capture and higher revenue. '
        'ClinixSummary extends this principle beyond documentation into active charge identification.')

    pdf.section_heading(4, 'ClinixSummary\u2019s Charge Capture Approach')
    pdf.body_text(
        'ClinixSummary goes beyond passive documentation improvement. Our automated charge capture '
        'module actively identifies billable items from the clinical encounter and maps them to the '
        'organisation\u2019s billing codes:')
    pdf.sub_heading('4.1 Charge Master Integration')
    pdf.body_text(
        'Organisations provide their charge master \u2014 the comprehensive list of procedures, supplies, '
        'equipment, and services with associated billing codes (CPT, HCPCS, internal codes). '
        'ClinixSummary ingests this charge master and uses it as the reference for charge identification.')
    pdf.sub_heading('4.2 Encounter-Based Charge Detection')
    pdf.body_text(
        'During the clinical encounter, ClinixSummary\u2019s NLP engine listens for billable events:')
    pdf.bullet_list([
        'Procedures performed \u2014 \u201cI\u2019m going to inject the left knee with 40mg of triamcinolone\u201d '
        'triggers identification of joint injection (CPT 20610) plus the injectable medication.',
        'Supplies used \u2014 \u201clet\u2019s use a 4-0 Vicryl for the deep layer and 5-0 Prolene for skin\u201d '
        'captures suture supplies and the associated repair code.',
        'Equipment deployed \u2014 \u201cI\u2019ll set up the nebuliser with albuterol\u201d identifies nebuliser '
        'treatment (CPT 94640) and the medication.',
        'Time-based services \u2014 encounter duration is tracked automatically, supporting appropriate '
        'E/M level coding and prolonged service add-on codes.',
        'Diagnostic testing \u2014 point-of-care tests, EKGs, and imaging orders mentioned during the '
        'encounter are captured for charge reconciliation.'
    ])
    pdf.sub_heading('4.3 Charge Reconciliation Output')
    pdf.body_text(
        'At the conclusion of each encounter, ClinixSummary generates a charge capture summary: '
        'a list of identified billable items mapped to the organisation\u2019s charge master codes, '
        'with supporting clinical documentation for each charge. This summary is presented alongside '
        'the clinical note for clinician review and approval before submission to billing.')

    pdf.section_heading(5, 'Pilot Results: 30% Charge Capture Improvement')
    pdf.body_text(
        'ClinixSummary\u2019s automated charge capture module was deployed in a one-month pilot across '
        'multiple clinical settings. Results compared charge capture rates before and after deployment:')
    pdf.bullet_list([
        '30% increase in identified billable items per encounter compared to pre-deployment baseline.',
        'Supply charges were the most impacted category, with a 42% increase in captured supply items.',
        'Ancillary procedure charges increased by 28%, reflecting procedures that were previously '
        'performed but not billed.',
        'E/M level accuracy improved, with a 19% reduction in under-coded encounters.',
        'Average charge lag (time between service and charge entry) decreased from 3.2 days to same-day.'
    ])
    pdf.body_text(
        'Clinician feedback was overwhelmingly positive: 94% reported that the charge capture summary '
        'was accurate and useful, and 89% said it identified charges they would otherwise have missed.')

    pdf.section_heading(6, 'Implementation')
    pdf.body_text('Deploying ClinixSummary\u2019s charge capture module requires three steps:')
    pdf.bullet_list([
        'Charge master upload \u2014 the organisation provides its current charge master in standard '
        'format. ClinixSummary\u2019s integration team maps it to the detection engine.',
        'Calibration period \u2014 a 1\u20132 week period where the system learns the organisation\u2019s specific '
        'billing patterns, commonly used supplies, and procedure preferences.',
        'Go-live \u2014 charge capture summaries are generated for every documented encounter, reviewed '
        'by clinicians, and integrated into the existing billing workflow.'
    ])
    pdf.body_text(
        'The module integrates with existing practice management and billing systems via FHIR-compatible '
        'APIs, ensuring no disruption to current revenue cycle workflows.')

    pdf.section_heading(7, 'Conclusion')
    pdf.body_text(
        'Charge capture leakage is a solved problem. When AI documentation systems actively identify '
        'billable items from the clinical encounter and match them to the organisation\u2019s charge master, '
        'the revenue gap closes. ClinixSummary\u2019s automated charge capture module delivers measurable '
        'financial impact from day one \u2014 capturing revenue that was earned through patient care but '
        'previously lost to manual processes.')
    pdf.info_box(
        'For a charge capture analysis or pilot programme discussion, contact: sales@clinixsummary.ai')

    pdf.output(os.path.join(PUB_DIR, 'automated-charge-capture-2025.pdf'))
    print('  [OK] PUB-2025-012 Automated Charge Capture')


# ══════════════════════════════════════════════════════════════════════════════
# 3. PATIENT PRIVACY LEAFLET
# ══════════════════════════════════════════════════════════════════════════════

class LeafletPDF(FPDF):
    """Single-page A4 patient-facing leaflet — calming, clear, professional."""
    def __init__(self):
        super().__init__(orientation='P', unit='mm', format='A4')
        self.add_font('Liberation', '', os.path.join(FONT_DIR, 'LiberationSans-Regular.ttf'), uni=True)
        self.add_font('Liberation', 'B', os.path.join(FONT_DIR, 'LiberationSans-Bold.ttf'), uni=True)
        self.add_font('Liberation', 'I', os.path.join(FONT_DIR, 'LiberationSans-Italic.ttf'), uni=True)
        self.set_auto_page_break(auto=False)

    def header(self):
        pass

    def footer(self):
        pass


def generate_leaflet():
    pdf = LeafletPDF()
    pdf.add_page()

    W = 210  # A4 width
    M = 18   # margins

    # ── Soft background tint across the full page ──
    pdf.set_fill_color(248, 251, 252)  # very subtle cool white
    pdf.rect(0, 0, W, 297, 'F')

    # ── Top accent bar ──
    pdf.set_fill_color(*ACCENT)
    pdf.rect(0, 0, W, 5, 'F')

    # ── Logo + brand ──
    if os.path.exists(LOGO):
        pdf.image(LOGO, M, 12, 14)
    pdf.set_font('Liberation', 'B', 14)
    pdf.set_text_color(*DARK)
    pdf.set_xy(M + 17, 14)
    pdf.cell(0, 7, 'ClinixSummary', ln=True)
    pdf.set_font('Liberation', '', 8)
    pdf.set_text_color(120, 120, 120)
    pdf.set_x(M + 17)
    pdf.cell(0, 4, 'AI-Powered Clinical Documentation', ln=True)

    # ── Main heading area (accent background panel) ──
    panel_y = 34
    pdf.set_fill_color(235, 249, 251)  # very light teal
    pdf.rect(M - 4, panel_y, W - 2 * (M - 4), 38, 'F')
    # rounded corners via small accent bars
    pdf.set_fill_color(*ACCENT)
    pdf.rect(M - 4, panel_y, 3, 38, 'F')  # left accent stripe

    pdf.set_xy(M + 4, panel_y + 6)
    pdf.set_font('Liberation', 'B', 20)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 10, 'Your Privacy During Your Consultation', ln=True)

    pdf.set_x(M + 4)
    pdf.set_font('Liberation', '', 11)
    pdf.set_text_color(60, 70, 80)
    pdf.cell(0, 7, 'Your clinician uses a secure AI assistant to help document your visit.', ln=True)
    pdf.set_x(M + 4)
    pdf.cell(0, 7, 'Here is what you should know:', ln=True)

    # ── Checklist items ──
    items = [
        ('Recording is used only for your clinical notes',
         'The audio from your consultation is used solely to help create accurate clinical '
         'documentation. It is never used for any other purpose.'),
        ('Your recording is encrypted immediately',
         'From the moment audio capture begins, all data is encrypted using industry-standard '
         'AES-256 encryption \u2014 the same level used by banks and governments.'),
        ('Audio is automatically deleted within 24 hours',
         'After your clinical note has been generated, the audio recording is permanently '
         'and irrecoverably deleted. No audio is stored long-term.'),
        ('Your data is never shared with third parties',
         'Your consultation data is processed entirely within ClinixSummary\u2019s secure infrastructure. '
         'It is never sent to external AI services or shared with anyone outside your care team.'),
        ('Your clinician reviews everything',
         'The AI generates a draft note, but your clinician always reviews and approves '
         'the final document before it becomes part of your medical record.'),
        ('You can opt out at any time',
         'If you prefer that the AI assistant is not used during your consultation, simply '
         'let your clinician know. Your care will not be affected in any way.'),
    ]

    y_pos = 80
    check_color = (34, 163, 109)  # calm green for checkmarks

    for title, desc in items:
        # Checkmark circle with drawn checkmark
        cx = M + 4
        cy = y_pos + 2.5
        pdf.set_fill_color(*check_color)
        pdf.ellipse(cx - 2.5, cy - 2.5, 5, 5, 'F')
        # Draw white checkmark lines
        pdf.set_draw_color(255, 255, 255)
        pdf.set_line_width(0.6)
        pdf.line(cx - 1.2, cy, cx - 0.2, cy + 1)
        pdf.line(cx - 0.2, cy + 1, cx + 1.5, cy - 1)

        # Title
        pdf.set_font('Liberation', 'B', 11)
        pdf.set_text_color(*DARK)
        pdf.set_xy(M + 12, y_pos - 0.5)
        pdf.cell(0, 6, title, ln=True)

        # Description
        pdf.set_font('Liberation', '', 9)
        pdf.set_text_color(80, 90, 100)
        pdf.set_x(M + 12)
        pdf.multi_cell(W - 2 * M - 14, 4.5, desc)

        y_pos = pdf.get_y() + 5

    # ── Quote / reassurance box ──
    quote_y = y_pos + 2
    pdf.set_fill_color(242, 242, 240)
    pdf.rect(M, quote_y, W - 2 * M, 26, 'F')
    # Left accent
    pdf.set_fill_color(*ACCENT)
    pdf.rect(M, quote_y, 3, 26, 'F')

    pdf.set_font('Liberation', 'I', 11)
    pdf.set_text_color(*DARK)
    pdf.set_xy(M + 8, quote_y + 4)
    pdf.multi_cell(W - 2 * M - 16, 6,
        '\u201cYour privacy is our priority. This system was designed to help your '
        'clinician spend more time with you \u2014 not less.\u201d')

    # ── Compliance badges area ──
    badge_y = quote_y + 32
    pdf.set_font('Liberation', 'B', 8)
    pdf.set_text_color(120, 120, 120)

    badges = ['HIPAA Compliant', 'GDPR Compliant', 'SOC 2 Type II', 'ISO 27001']
    badge_w = 38
    total_w = len(badges) * badge_w + (len(badges) - 1) * 6
    start_x = (W - total_w) / 2

    for i, badge_text in enumerate(badges):
        bx = start_x + i * (badge_w + 6)
        pdf.set_fill_color(230, 235, 238)
        pdf.rect(bx, badge_y, badge_w, 10, 'F')
        pdf.set_xy(bx, badge_y + 2)
        pdf.cell(badge_w, 6, badge_text, align='C')

    # ── Bottom section ──
    bottom_y = badge_y + 18
    pdf.set_font('Liberation', '', 10)
    pdf.set_text_color(80, 90, 100)
    pdf.set_xy(M, bottom_y)
    pdf.cell(0, 6, 'Questions? Please ask your clinician or visit:', align='C', ln=True)

    pdf.set_font('Liberation', 'B', 11)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 7, 'clinixsummary.ai', align='C', ln=True)

    # ── Bottom accent bar ──
    pdf.set_fill_color(*ACCENT)
    pdf.rect(0, 292, W, 5, 'F')

    # ── Tiny footer ──
    pdf.set_font('Liberation', '', 7)
    pdf.set_text_color(160, 160, 160)
    pdf.set_xy(M, 286)
    pdf.cell(W - 2 * M, 4,
             '\u00a9 2025 GATMEDI. All rights reserved.  |  ClinixSummary is a product of GATMEDI.  |  contact@clinixsummary.ai',
             align='C')

    os.makedirs(RES_DIR, exist_ok=True)
    pdf.output(os.path.join(RES_DIR, 'patient-privacy-notice.pdf'))
    print('  [OK] Patient Privacy Leaflet')


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    os.makedirs(PUB_DIR, exist_ok=True)
    print('Generating new/updated PDFs...\n')
    generate_kaizen()
    generate_charge_capture()
    generate_leaflet()
    print('\nDone.')
