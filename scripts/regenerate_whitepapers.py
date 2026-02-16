#!/usr/bin/env python3
"""
Regenerate all 6 English whitepaper PDFs with:
- Branded ClinixSummary format
- doc_type parameter for White Paper branding
"""

import os
from fpdf import FPDF

# ── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR  = os.path.join(BASE_DIR, 'docs', 'whitepapers')
LOGO     = os.path.join(BASE_DIR, 'images', 'logo-wings.png')
FONT_DIR = '/usr/share/fonts/truetype/liberation'

# ── Brand ────────────────────────────────────────────────────────────────────
ACCENT = (59, 197, 214)
DARK   = (9, 38, 58)

# ── PDF class ────────────────────────────────────────────────────────────────

class PubPDF(FPDF):
    def __init__(self, doc_id, date_str, title, doc_type='Publication'):
        super().__init__()
        self.doc_id = doc_id
        self.date_str = date_str
        self.pub_title = title
        self.doc_type = doc_type
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
        self.cell(0, 4, f'{self.doc_type}  |  {self.doc_id}', ln=False)
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
        self.cell(0, 6, self.doc_type.upper(), ln=True)
        self.ln(4)
        self.set_font('Liberation', 'B', 24)
        self.set_text_color(*DARK)
        self.multi_cell(0, 11, self.pub_title, align='L')
        self.ln(4)
        self.set_font('Liberation', '', 12)
        self.set_text_color(80, 80, 80)
        self.multi_cell(0, 7, subtitle, align='L')
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


# ── Whitepaper content generators ────────────────────────────────────────────

def wp01_architecture():
    """WP-2025-001: ClinixSummary Architecture: A Technical Overview — March 2025"""
    pdf = PubPDF('WP-2025-001', 'March 2025',
                 'ClinixSummary Architecture: A Technical Overview',
                 doc_type='White Paper')
    pdf.cover_page(
        'System architecture, model pipeline, audio processing, NLP layers, and output generation. '
        'A comprehensive look at how ClinixSummary transforms clinical audio into structured documentation.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'ClinixSummary is a vertically integrated AI platform purpose-built for clinical documentation. '
        'Unlike generic transcription services that bolt medical vocabulary onto consumer speech-to-text '
        'engines, ClinixSummary employs a proprietary multi-stage pipeline that transforms raw clinical '
        'audio into structured, specialty-aware clinical notes in real time.')
    pdf.body_text(
        'This white paper provides a technical overview of the ClinixSummary architecture for CTOs, '
        'IT leaders, and technical evaluators. It covers the end-to-end data flow from audio capture '
        'through to final document generation, including the intermediate NLP stages that distinguish '
        'ClinixSummary from commodity transcription services.')

    pdf.section_heading(2, 'System Architecture Overview')
    pdf.body_text(
        'The ClinixSummary platform comprises five primary subsystems, each designed as an independently '
        'scalable microservice communicating over encrypted internal channels:')
    pdf.bullet_list([
        'Audio Ingestion Layer \u2014 Handles real-time audio capture, buffering, and preprocessing. '
        'Supports both ambient (multi-speaker) and single-speaker dictation modes with automatic detection.',
        'Speech Recognition Engine \u2014 Proprietary ASR models fine-tuned on medical speech corpora spanning '
        '40+ specialties. Achieves word error rates (WER) significantly below commercial general-purpose '
        'engines on clinical vocabulary.',
        'Clinical NLP Pipeline \u2014 Multi-stage processing including speaker diarisation, medical named entity '
        'recognition (NER), section classification, and clinical context inference.',
        'Document Assembly Engine \u2014 Transforms structured NLP outputs into specialty-appropriate clinical '
        'note formats (SOAP, BIRADS, operative reports, therapy notes, etc.).',
        'Integration & Delivery Layer \u2014 FHIR-compatible APIs, direct EHR/EMR export, and the ClinixSummary '
        'Console for review and editing.'
    ])

    pdf.section_heading(3, 'Audio Ingestion & Preprocessing')
    pdf.sub_heading('3.1 Capture Modes')
    pdf.body_text(
        'ClinixSummary supports three distinct capture modes, automatically detected by the Auto Ambient '
        'Dictate system:')
    pdf.bullet_list([
        'Ambient Mode \u2014 Multi-speaker clinical consultation captured via device microphone. Speaker '
        'diarisation separates clinician from patient dialogue.',
        'Dictation Mode \u2014 Single-speaker post-visit narration. Optimised for higher speech rates and '
        'medical shorthand.',
        'Operative Mode \u2014 Real-time narration during surgical procedures. Handles background noise, '
        'team communication, and procedural terminology.'
    ])
    pdf.sub_heading('3.2 Signal Processing')
    pdf.body_text(
        'Raw audio undergoes adaptive noise reduction, automatic gain control, and voice activity detection '
        '(VAD) before reaching the ASR engine. The preprocessing pipeline runs on-device where possible to '
        'minimise data transmission and latency, with server-side processing as fallback.')

    pdf.section_heading(4, 'Speech Recognition Engine')
    pdf.body_text(
        'ClinixSummary\u2019s ASR is not a fine-tuned wrapper around a third-party engine. It is a proprietary '
        'encoder-decoder architecture trained from the ground up on de-identified clinical speech data. '
        'Key characteristics include:')
    pdf.bullet_list([
        'Vocabulary coverage of 250,000+ medical terms across ICD-10, CPT, SNOMED-CT, and specialty-specific '
        'lexicons.',
        'Real-time streaming inference with <500ms latency from speech to preliminary transcript.',
        'Multi-language support (English, French, Spanish, Portuguese, Italian, Arabic) with in-consultation '
        'code-switching capability.',
        'Accent and dialect robustness trained on geographically diverse clinical speech samples.'
    ])

    pdf.section_heading(5, 'Clinical NLP Pipeline')
    pdf.sub_heading('5.1 Speaker Diarisation')
    pdf.body_text(
        'In ambient mode, speaker diarisation identifies and separates clinician speech from patient speech, '
        'supporting up to 4 concurrent speakers. This is critical for accurate attribution of reported '
        'symptoms (patient) versus clinical assessments (clinician).')
    pdf.sub_heading('5.2 Medical Named Entity Recognition')
    pdf.body_text(
        'A domain-specific NER model extracts clinical entities including diagnoses, medications, dosages, '
        'procedures, anatomical references, lab values, and temporal markers. Entity extraction feeds '
        'downstream section classification and coding suggestion modules.')
    pdf.sub_heading('5.3 Section Classification')
    pdf.body_text(
        'A classification model assigns transcript segments to appropriate clinical note sections (Chief '
        'Complaint, History of Present Illness, Review of Systems, Physical Examination, Assessment, Plan, '
        'etc.). Section schemas are specialty-configurable.')
    pdf.sub_heading('5.4 Clinical Context Inference')
    pdf.body_text(
        'Beyond entity extraction, ClinixSummary\u2019s contextual reasoning layer infers unstated clinical '
        'logic \u2014 for example, understanding that a discussion of \u2018the usual dose\u2019 refers to a previously '
        'established medication regimen, or that \u2018better than last time\u2019 implies comparison to a prior visit.')

    pdf.section_heading(6, 'Document Assembly')
    pdf.body_text(
        'The Document Assembly Engine takes structured NLP outputs and generates a complete clinical note '
        'in the appropriate format for the specialty and context. Templates are maintained per specialty '
        'and are continuously refined through the Kai-zen feedback loop.')
    pdf.body_text(
        'Output formats include SOAP notes, procedure notes, therapy session summaries, dental charting '
        'narratives, psychiatric evaluations, veterinary SOAP, and free-form dictation transcripts. Each '
        'format enforces completeness checks \u2014 flagging potential omissions before the clinician finalises '
        'the note.')

    pdf.section_heading(7, 'Infrastructure & Scalability')
    pdf.body_text(
        'ClinixSummary operates on a cloud-native infrastructure with the following characteristics:')
    pdf.bullet_list([
        'Auto-scaling compute clusters for ASR and NLP inference, handling variable load without performance '
        'degradation.',
        'Geographic data residency options (US, EU, UK, AU) to meet jurisdictional compliance requirements.',
        '99.9% uptime SLA with multi-region failover.',
        'All inter-service communication encrypted with TLS 1.3; data at rest encrypted with AES-256.'
    ])

    pdf.section_heading(8, 'Conclusion')
    pdf.body_text(
        'ClinixSummary\u2019s architecture reflects a fundamental design principle: clinical documentation is '
        'a clinical problem, not a transcription problem. Every layer of the stack \u2014 from audio capture to '
        'document assembly \u2014 is purpose-built for the medical domain. This vertical integration enables '
        'accuracy, speed, and specialty awareness that cannot be achieved by layering medical prompts onto '
        'generic AI services.')

    pdf.output(os.path.join(OUT_DIR, 'clinixsummary-architecture-overview-2025.pdf'))
    print('  [OK] WP-2025-001 Architecture Overview')


def wp02_training():
    """WP-2025-002: Clinical Model Training Methodology — April 2025"""
    pdf = PubPDF('WP-2025-002', 'April 2025',
                 'Clinical Model Training Methodology',
                 doc_type='White Paper')
    pdf.cover_page(
        'Data sourcing from de-identified sources, training pipeline, specialty-specific fine-tuning, '
        'evaluation metrics, and quality assurance processes.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'The accuracy of any AI clinical documentation system depends entirely on the quality and methodology '
        'of its training process. ClinixSummary employs a rigorous, multi-phase training methodology that '
        'combines large-scale de-identified clinical data with specialty-specific fine-tuning and continuous '
        'clinician-validated improvement.')
    pdf.body_text(
        'This white paper details our approach to data sourcing, model training, evaluation, and the '
        'continuous improvement cycle that keeps ClinixSummary\u2019s outputs aligned with clinical standards '
        'across 40+ medical specialties.')

    pdf.section_heading(2, 'Data Sourcing & Ethics')
    pdf.sub_heading('2.1 De-identification Standards')
    pdf.body_text(
        'All training data undergoes rigorous de-identification compliant with HIPAA Safe Harbor and Expert '
        'Determination methods. Protected Health Information (PHI) is removed through a combination of '
        'automated NLP-based detection and human review. No raw patient data is ever used in model training.')
    pdf.sub_heading('2.2 Data Sources')
    pdf.body_text('Training corpora are sourced from:')
    pdf.bullet_list([
        'Licensed de-identified clinical datasets from academic medical centres and data cooperatives.',
        'Publicly available medical literature, clinical guidelines, and documentation standards.',
        'Synthetic data generated from clinical templates and validated by practicing clinicians.',
        'Anonymised aggregate patterns from consenting ClinixSummary users (opt-in only, fully de-identified).'
    ])
    pdf.sub_heading('2.3 Ethical Review')
    pdf.body_text(
        'All data sourcing and training protocols are reviewed by our internal ethics board, which includes '
        'practicing clinicians, data privacy specialists, and independent advisors. We maintain a data '
        'provenance registry tracking the origin and processing history of all training data.')

    pdf.section_heading(3, 'Training Pipeline')
    pdf.sub_heading('3.1 Base Model Pre-training')
    pdf.body_text(
        'ClinixSummary\u2019s base language models are pre-trained on large medical text corpora including '
        'clinical notes, medical textbooks, journal articles, and clinical guidelines. This establishes '
        'deep medical language understanding before any speech-specific training begins.')
    pdf.sub_heading('3.2 ASR Fine-tuning')
    pdf.body_text(
        'The automatic speech recognition models are fine-tuned on clinical speech recordings with verified '
        'transcriptions. Training data spans diverse accents, speaking styles, and clinical environments '
        '(quiet offices, busy clinics, operating theatres).')
    pdf.sub_heading('3.3 Specialty-Specific Adaptation')
    pdf.body_text(
        'After base training, models undergo specialty-specific fine-tuning for each supported discipline. '
        'This involves:')
    pdf.bullet_list([
        'Specialty vocabulary augmentation (e.g., dental nomenclature, psychiatric rating scales, veterinary anatomy).',
        'Documentation pattern training on specialty-appropriate note structures.',
        'Clinical reasoning calibration using specialty-specific clinical scenarios.',
        'Output format alignment with discipline-standard documentation templates.'
    ])

    pdf.section_heading(4, 'Evaluation & Quality Metrics')
    pdf.body_text('Model performance is evaluated across multiple dimensions:')
    pdf.bullet_list([
        'Word Error Rate (WER) \u2014 Measured against expert-verified transcriptions on held-out test sets.',
        'Clinical Accuracy Score (CAS) \u2014 Proprietary metric measuring correct identification of diagnoses, '
        'medications, and clinical findings.',
        'Section Completeness Index \u2014 Measures whether generated notes include all clinically relevant '
        'information from the source audio.',
        'Clinician Acceptance Rate \u2014 Percentage of generated notes accepted by clinicians without '
        'substantive edits.',
        'Specialty Terminology Precision \u2014 Accuracy of specialty-specific terms, abbreviations, and '
        'scoring systems.'
    ])
    pdf.body_text(
        'Current performance: ClinixSummary achieves a Clinician Acceptance Rate of >92% across core '
        'specialties, with continuous improvement through the Kai-zen feedback loop.')

    pdf.section_heading(5, 'The Kai-zen Continuous Improvement Loop')
    pdf.body_text(
        'ClinixSummary operates on a weekly model update cycle. Clinician feedback (corrections, edits, '
        'and ratings) is aggregated, de-identified, and used to continuously refine model outputs. This '
        'creates a virtuous cycle where the system improves with every clinical encounter.')
    pdf.body_text('The Kai-zen process includes:')
    pdf.bullet_list([
        'Automated detection of systematic errors or gaps in specialty coverage.',
        'Prioritised retraining targeting the most impactful improvement areas.',
        'A/B testing of model updates against baseline before full deployment.',
        'Clinician advisory panels for each specialty reviewing model outputs quarterly.'
    ])

    pdf.section_heading(6, 'Model Governance & Versioning')
    pdf.body_text(
        'Every model version is tracked in a comprehensive registry with full lineage including training '
        'data composition, hyperparameters, evaluation metrics, and deployment dates. Rollback capability '
        'ensures that any model update can be reverted within minutes if quality regressions are detected.')

    pdf.section_heading(7, 'Conclusion')
    pdf.body_text(
        'ClinixSummary\u2019s training methodology is designed for the unique demands of clinical AI: accuracy '
        'is non-negotiable, specialty nuance matters, and continuous improvement is essential. Our approach '
        '\u2014 combining rigorous de-identification, specialty-specific fine-tuning, multi-dimensional evaluation, '
        'and continuous clinician feedback \u2014 ensures that every model update makes the system more accurate, '
        'more complete, and more useful for the clinicians who depend on it.')

    pdf.output(os.path.join(OUT_DIR, 'clinical-model-training-methodology-2025.pdf'))
    print('  [OK] WP-2025-002 Clinical Model Training')


def wp03_integration():
    """WP-2025-003: Integration Framework: Connecting to EHR/EMR Systems — May 2025"""
    pdf = PubPDF('WP-2025-003', 'May 2025',
                 'Integration Framework: Connecting to EHR/EMR Systems',
                 doc_type='White Paper')
    pdf.cover_page(
        'API specifications, data formats, FHIR compatibility, and deployment models (cloud/hybrid) '
        'for seamless EHR integration.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Clinical documentation does not exist in isolation. For AI-generated notes to deliver value, '
        'they must flow seamlessly into the clinician\u2019s existing workflow \u2014 specifically, into their '
        'Electronic Health Record (EHR) or Electronic Medical Record (EMR) system. ClinixSummary\u2019s '
        'Integration Framework is designed to make this connection as frictionless as possible.')
    pdf.body_text(
        'This white paper details the technical specifications, supported standards, deployment options, '
        'and security considerations for integrating ClinixSummary into existing healthcare IT infrastructure.')

    pdf.section_heading(2, 'Integration Architecture')
    pdf.body_text(
        'ClinixSummary offers three integration tiers to accommodate different infrastructure maturity levels:')
    pdf.bullet_list([
        'Tier 1: Manual Export \u2014 Copy-paste or document download. Zero integration overhead, suitable '
        'for solo practitioners or initial evaluation.',
        'Tier 2: API Integration \u2014 RESTful API with FHIR-compatible endpoints. Notes are pushed to the '
        'EHR/EMR via standard clinical document resources.',
        'Tier 3: Deep Integration \u2014 Bidirectional data exchange including patient context import '
        '(demographics, medication lists, problem lists) and note push-back. Requires EHR vendor cooperation '
        'or open API access.'
    ])

    pdf.section_heading(3, 'FHIR Compatibility')
    pdf.sub_heading('3.1 Supported Resources')
    pdf.body_text('ClinixSummary generates and consumes FHIR R4 resources including:')
    pdf.bullet_list([
        'DocumentReference \u2014 Clinical notes as structured documents.',
        'Composition \u2014 Assembled clinical documents with section-level structure.',
        'Encounter \u2014 Visit context for note association.',
        'Patient \u2014 Demographics import for note pre-population.',
        'Condition, MedicationStatement, Procedure \u2014 Extracted clinical entities mapped to FHIR resources.'
    ])
    pdf.sub_heading('3.2 Terminology Bindings')
    pdf.body_text(
        'Clinical entities are mapped to standard terminologies: ICD-10-CM/PCS for diagnoses and procedures, '
        'SNOMED-CT for clinical findings, RxNorm for medications, and LOINC for laboratory observations. '
        'Mapping accuracy is validated as part of the Clinix QM process.')

    pdf.section_heading(4, 'API Specification')
    pdf.body_text(
        'The ClinixSummary API follows RESTful conventions with OAuth 2.0 authentication:')
    pdf.bullet_list([
        'POST /api/v1/sessions \u2014 Create a new documentation session.',
        'POST /api/v1/sessions/{id}/audio \u2014 Stream audio to an active session.',
        'GET /api/v1/sessions/{id}/note \u2014 Retrieve the generated clinical note.',
        'PUT /api/v1/sessions/{id}/note \u2014 Submit clinician edits.',
        'POST /api/v1/export/{id} \u2014 Push finalised note to configured EHR endpoint.',
        'GET /api/v1/templates \u2014 List available note templates for the authenticated user\u2019s specialty.'
    ])
    pdf.body_text(
        'Full API documentation with interactive sandbox available at: docs.clinixsummary.ai/api')

    pdf.section_heading(5, 'Deployment Models')
    pdf.sub_heading('5.1 Cloud (SaaS)')
    pdf.body_text(
        'Default deployment model. ClinixSummary handles all infrastructure, scaling, and maintenance. '
        'Data is processed in the customer\u2019s chosen geographic region (US, EU, UK, or AU). Suitable '
        'for most practices and organisations.')
    pdf.sub_heading('5.2 Hybrid')
    pdf.body_text(
        'Audio processing and ASR run on-premises or in the customer\u2019s private cloud; NLP and document '
        'assembly are processed in ClinixSummary\u2019s cloud. Reduces data transmission while maintaining '
        'access to the latest model updates. Suitable for organisations with strict data residency requirements.')
    pdf.sub_heading('5.3 On-Premises (Enterprise)')
    pdf.body_text(
        'Full ClinixSummary stack deployed within the customer\u2019s data centre or private cloud. Requires '
        'dedicated infrastructure and a ClinixSummary deployment engineering engagement. Model updates are '
        'delivered as signed packages. Available for Plan Enterprise customers.')

    pdf.section_heading(6, 'Security Considerations')
    pdf.body_text('All integration pathways enforce the same security standards:')
    pdf.bullet_list([
        'TLS 1.2+ for all data in transit.',
        'OAuth 2.0 with short-lived tokens and refresh rotation.',
        'IP whitelisting and mutual TLS available for Tier 2/3 integrations.',
        'Audit logging of all API calls with tamper-evident log storage.',
        'BAA (Business Associate Agreement) executed for all US healthcare customers.'
    ])

    pdf.section_heading(7, 'Conclusion')
    pdf.body_text(
        'ClinixSummary\u2019s integration framework is designed to meet organisations where they are \u2014 from '
        'solo practitioners who need simple copy-paste to health systems requiring deep, bidirectional EHR '
        'integration with FHIR compliance. Our tiered approach ensures that integration complexity scales '
        'with organisational needs, not the other way around.')

    pdf.output(os.path.join(OUT_DIR, 'integration-framework-ehr-emr-2025.pdf'))
    print('  [OK] WP-2025-003 Integration Framework')


def wp04_security():
    """WP-2025-004: Security & Compliance Technical Specification — June 2025"""
    pdf = PubPDF('WP-2025-004', 'June 2025',
                 'Security & Compliance Technical Specification',
                 doc_type='White Paper')
    pdf.cover_page(
        'Encryption standards, access controls, audit logging, and HIPAA/GDPR technical implementation '
        'details for compliance officers and CTOs.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'Healthcare data is among the most sensitive information in existence. ClinixSummary treats security '
        'and compliance not as features to be added, but as foundational architectural principles that inform '
        'every design decision. This white paper provides the technical detail that compliance officers, '
        'CISOs, and CTOs need to evaluate ClinixSummary\u2019s security posture.')

    pdf.section_heading(2, 'Encryption Standards')
    pdf.sub_heading('2.1 Data in Transit')
    pdf.body_text(
        'All data transmitted between client devices, ClinixSummary services, and external integrations is '
        'encrypted using TLS 1.2 or higher (TLS 1.3 preferred). Certificate pinning is enforced on mobile '
        'clients. Internal service-to-service communication uses mutual TLS (mTLS) with automatically '
        'rotated certificates.')
    pdf.sub_heading('2.2 Data at Rest')
    pdf.body_text(
        'All persistent data storage uses AES-256 encryption. Encryption keys are managed through a '
        'dedicated Key Management Service (KMS) with hardware security module (HSM) backing. Key rotation '
        'occurs on a 90-day cycle with zero-downtime re-encryption.')
    pdf.sub_heading('2.3 Audio Data')
    pdf.body_text(
        'Audio recordings are encrypted immediately upon capture and are automatically purged once note '
        'generation is complete. Audio is immediately and permanently deleted via cryptographic erasure as '
        'soon as the clinical note has been generated. No audio data is ever retained beyond note generation.')

    pdf.section_heading(3, 'Access Controls')
    pdf.sub_heading('3.1 Authentication')
    pdf.body_text('ClinixSummary supports multiple authentication methods:')
    pdf.bullet_list([
        'Email/password with mandatory MFA (TOTP or WebAuthn).',
        'SAML 2.0 SSO for enterprise customers integrating with existing identity providers.',
        'OAuth 2.0 for API access with scoped permissions and short-lived tokens.'
    ])
    pdf.sub_heading('3.2 Role-Based Access Control (RBAC)')
    pdf.body_text(
        'A fine-grained RBAC system controls access at the organisation, team, and individual level. Default '
        'roles include: Clinician (create/edit own notes), Reviewer (read team notes), Administrator (manage '
        'users, view audit logs), and Billing Manager (access billing-related data only). Custom roles can '
        'be defined per organisation.')
    pdf.sub_heading('3.3 Data Isolation')
    pdf.body_text(
        'Multi-tenant architecture enforces strict data isolation between organisations. Each organisation\u2019s '
        'data resides in a logically isolated data partition. Enterprise customers can opt for physically '
        'isolated database instances.')

    pdf.section_heading(4, 'Audit Logging & Monitoring')
    pdf.body_text('Every action within ClinixSummary is logged in a tamper-evident audit trail:')
    pdf.bullet_list([
        'User authentication events (login, logout, MFA challenges, failed attempts).',
        'Data access events (note creation, viewing, editing, export, deletion).',
        'Administrative actions (user management, role changes, configuration updates).',
        'API calls (endpoint, parameters, response codes, latency).',
        'System events (deployments, model updates, infrastructure changes).'
    ])
    pdf.body_text(
        'Audit logs are retained for a minimum of 7 years and are available to organisation administrators '
        'through the ClinixSummary Console. Logs are stored in append-only, cryptographically signed storage '
        'to prevent tampering.')

    pdf.section_heading(5, 'Regulatory Compliance')
    pdf.sub_heading('5.1 HIPAA (United States)')
    pdf.body_text(
        'ClinixSummary maintains full HIPAA compliance including: Business Associate Agreements (BAAs) for '
        'all US healthcare customers, implementation of all required Administrative, Physical, and Technical '
        'Safeguards, regular risk assessments, workforce training, and breach notification procedures.')
    pdf.sub_heading('5.2 GDPR (European Union)')
    pdf.body_text(
        'GDPR compliance includes: lawful basis documentation for all processing activities, Data Protection '
        'Impact Assessments (DPIAs), data subject rights implementation (access, rectification, erasure, '
        'portability), Data Processing Agreements (DPAs), and EU data residency options.')
    pdf.sub_heading('5.3 Additional Frameworks')
    pdf.body_text(
        'ClinixSummary also maintains compliance with PIPEDA/PHIPA (Canada), CCPA (California), the '
        'Australian Privacy Act, and is pursuing UK medical device registration (MHRA). Our compliance '
        'programme is designed to be additive \u2014 new regulatory frameworks are incorporated as we expand '
        'into new jurisdictions.')

    pdf.section_heading(6, 'Incident Response')
    pdf.body_text(
        'ClinixSummary maintains a documented incident response plan covering detection, containment, '
        'eradication, recovery, and post-incident review. Key elements include:')
    pdf.bullet_list([
        '24/7 security monitoring with automated anomaly detection.',
        'Documented escalation paths and response time SLAs.',
        'Customer notification within 72 hours for any confirmed data breach (per GDPR) or without '
        'unreasonable delay (per HIPAA).',
        'Post-incident reviews with root cause analysis and preventive measures.'
    ])

    pdf.section_heading(7, 'Conclusion')
    pdf.body_text(
        'Security in healthcare AI is not optional \u2014 it is the price of entry. ClinixSummary\u2019s security '
        'architecture reflects this reality at every layer, from encryption and access controls to audit '
        'logging and regulatory compliance. We invite security teams to engage with our detailed technical '
        'documentation and to schedule security review sessions with our compliance team.')

    pdf.output(os.path.join(OUT_DIR, 'security-compliance-specification-2025.pdf'))
    print('  [OK] WP-2025-004 Security & Compliance')


def wp05_qms():
    """WP-2025-005: Quality Management System (QMS): How Clinix QM Works — July 2025"""
    pdf = PubPDF('WP-2025-005', 'July 2025',
                 'Quality Management System (QMS): How Clinix QM Works',
                 doc_type='White Paper')
    pdf.cover_page(
        'The QA review process, feedback incorporation, model versioning, output monitoring, and '
        'continuous improvement protocols.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'In clinical AI, output quality is a patient safety issue. A single inaccurate medication dosage, '
        'a missed diagnosis, or an incorrect procedure code can have real clinical consequences. The Clinix '
        'Quality Management System (Clinix QM) is a systematic framework ensuring that every ClinixSummary '
        'output meets clinical documentation standards.')
    pdf.body_text(
        'This white paper describes the processes, metrics, and governance structures that constitute '
        'Clinix QM, providing the detail needed by quality officers, clinical leaders, and compliance teams '
        'evaluating ClinixSummary for deployment.')

    pdf.section_heading(2, 'QMS Framework Overview')
    pdf.body_text('Clinix QM operates across four pillars:')
    pdf.bullet_list([
        'Proactive Quality \u2014 Preventing errors through model design, training methodology, and output '
        'validation rules.',
        'Reactive Quality \u2014 Detecting and correcting errors through clinician feedback, automated '
        'monitoring, and manual QA review.',
        'Continuous Improvement \u2014 Systematically incorporating quality findings into model updates '
        '(the Kai-zen loop).',
        'Governance \u2014 Oversight structures, documentation, and accountability mechanisms.'
    ])

    pdf.section_heading(3, 'Proactive Quality Controls')
    pdf.sub_heading('3.1 Model Validation Gates')
    pdf.body_text(
        'Every model update must pass through a series of validation gates before deployment:')
    pdf.bullet_list([
        'Automated regression testing against a curated test suite of 10,000+ clinical scenarios.',
        'Specialty-specific accuracy benchmarks that must meet or exceed the previous model version.',
        'Clinical review by specialty advisors for any changes affecting clinical reasoning or terminology.',
        'A/B testing on a subset of production traffic before full rollout.'
    ])
    pdf.sub_heading('3.2 Output Validation Rules')
    pdf.body_text(
        'Generated notes are checked against a rule engine that flags potential issues before the clinician '
        'sees the output: missing mandatory sections, medication dosages outside normal ranges, contradictory '
        'clinical findings, and incomplete procedure documentation. Flagged items are highlighted for '
        'clinician review.')

    pdf.section_heading(4, 'Reactive Quality Processes')
    pdf.sub_heading('4.1 Clinician Feedback Integration')
    pdf.body_text(
        'Every clinician edit, correction, or rating is captured and fed into the quality pipeline. Feedback '
        'is categorised (terminology error, section misclassification, missing information, incorrect clinical '
        'reasoning, etc.) and prioritised for remediation.')
    pdf.sub_heading('4.2 Manual QA Reviews')
    pdf.body_text(
        'A dedicated clinical QA team conducts regular manual reviews of model outputs. Review samples are '
        'stratified by specialty, note type, and complexity to ensure comprehensive coverage. QA reviewers '
        'are licensed clinicians with specialty expertise in the areas they review.')
    pdf.sub_heading('4.3 Automated Monitoring')
    pdf.body_text(
        'Production outputs are continuously monitored for statistical anomalies: sudden changes in note '
        'length, section distribution, terminology frequency, or clinician edit rates. Anomalies trigger '
        'automated alerts and investigation by the QA team.')

    pdf.section_heading(5, 'Continuous Improvement: The Kai-zen Loop')
    pdf.body_text(
        'Quality findings from all three reactive channels (clinician feedback, manual QA, automated '
        'monitoring) are aggregated weekly into a prioritised improvement backlog. The top priorities are '
        'addressed in the next model update cycle, creating a continuous improvement loop that makes '
        'ClinixSummary more accurate with every iteration.')
    pdf.body_text('Key metrics tracked over time:')
    pdf.bullet_list([
        'Clinician Acceptance Rate (target: >95% by end of 2025).',
        'Clinical Accuracy Score per specialty.',
        'Mean edits per note (trending toward zero).',
        'Critical error rate (medication, allergy, procedure \u2014 target: <0.1%).',
        'Time from error detection to model fix deployment.'
    ])

    pdf.section_heading(6, 'Governance & Documentation')
    pdf.body_text(
        'Clinix QM is governed by a Quality Steering Committee comprising the Chief Medical Officer, Head '
        'of AI, Head of Quality, and external clinical advisors. The committee meets monthly to review '
        'quality metrics, approve model releases, and set quality targets.')
    pdf.body_text(
        'All QMS processes are documented in a controlled document system with version tracking, approval '
        'workflows, and periodic review cycles. Documentation is available for review by customers and '
        'regulators upon request.')

    pdf.section_heading(7, 'Conclusion')
    pdf.body_text(
        'Quality management in clinical AI requires the same rigour applied to medical devices and '
        'pharmaceuticals. Clinix QM provides the systematic framework to ensure that ClinixSummary\u2019s '
        'outputs are not just technically impressive, but clinically safe, accurate, and continuously '
        'improving. Our commitment to quality is not aspirational \u2014 it is operational, measurable, '
        'and governed.')

    pdf.output(os.path.join(OUT_DIR, 'quality-management-system-qms-2025.pdf'))
    print('  [OK] WP-2025-005 Quality Management System')


def wp06_ambient():
    """WP-2025-006: Ambient Audio Processing: From Sound to Structured Note — August 2025"""
    pdf = PubPDF('WP-2025-006', 'August 2025',
                 'Ambient Audio Processing: From Sound to Structured Note',
                 doc_type='White Paper')
    pdf.cover_page(
        'How raw audio becomes a structured clinical document \u2014 speaker diarisation, medical NER, '
        'section classification, and note assembly.')

    pdf.add_page()
    pdf.section_heading(1, 'Executive Summary')
    pdf.body_text(
        'The transformation of a live clinical conversation into a structured, accurate clinical note is '
        'the core technical challenge in ambient AI documentation. This white paper traces the complete '
        'processing pipeline from the moment audio enters the system to the final structured note, '
        'explaining each processing stage and the clinical intelligence that makes it possible.')

    pdf.section_heading(2, 'The Processing Pipeline')
    pdf.body_text(
        'Ambient audio processing in ClinixSummary follows a six-stage pipeline, each stage building on '
        'the outputs of the previous one:')
    pdf.bullet_list([
        'Stage 1: Audio Capture & Preprocessing',
        'Stage 2: Speech Recognition & Transcription',
        'Stage 3: Speaker Diarisation',
        'Stage 4: Medical Named Entity Recognition (NER)',
        'Stage 5: Section Classification & Clinical Reasoning',
        'Stage 6: Document Assembly & Formatting'
    ])
    pdf.body_text(
        'Total end-to-end latency from final audio segment to complete note is typically under 30 seconds '
        'for a standard 15-minute consultation.')

    pdf.section_heading(3, 'Stage 1: Audio Capture & Preprocessing')
    pdf.body_text('Raw audio captured from the clinician\u2019s device undergoes immediate preprocessing:')
    pdf.bullet_list([
        'Adaptive noise reduction tuned for clinical environments (keyboard typing, door sounds, equipment '
        'beeps, HVAC).',
        'Automatic gain control to normalise volume differences between speakers at varying distances from '
        'the microphone.',
        'Voice Activity Detection (VAD) to segment audio into speech and non-speech regions, reducing '
        'unnecessary processing.',
        'Audio quality assessment to flag recordings that may produce unreliable transcriptions (excessive '
        'noise, very low volume).'
    ])

    pdf.section_heading(4, 'Stage 2: Speech Recognition')
    pdf.body_text(
        'Preprocessed audio is streamed to the ASR engine in real time. The medical ASR model produces a '
        'preliminary transcript with word-level timestamps and confidence scores. Low-confidence segments '
        'are flagged for downstream verification against clinical context.')
    pdf.body_text('Key differentiators of ClinixSummary\u2019s medical ASR:')
    pdf.bullet_list([
        '250,000+ medical term vocabulary with specialty-specific pronunciation variants.',
        'Contextual language model that biases recognition toward clinically probable terms (e.g., '
        '\u2018dyspnoea\u2019 over \u2018Disney\u2019 in a respiratory consultation).',
        'Real-time code-switching support for multilingual consultations.',
        'Robust handling of medical abbreviations, acronyms, and numeric expressions (dosages, lab values, '
        'vital signs).'
    ])

    pdf.section_heading(5, 'Stage 3: Speaker Diarisation')
    pdf.body_text(
        'Speaker diarisation identifies who said what \u2014 critical for accurate clinical documentation. '
        'ClinixSummary\u2019s diarisation system:')
    pdf.bullet_list([
        'Supports 2-4 speakers per session (clinician, patient, family member, interpreter).',
        'Uses voice embedding models trained on clinical dialogue to distinguish speakers based on vocal '
        'characteristics.',
        'Assigns clinical roles (clinician vs. patient) based on speech patterns, terminology usage, and '
        'conversational dynamics.',
        'Handles overlapping speech and interruptions common in clinical consultations.'
    ])

    pdf.section_heading(6, 'Stage 4: Medical Named Entity Recognition')
    pdf.body_text(
        'A specialised NER model extracts clinical entities from the diarised transcript:')
    pdf.bullet_list([
        'Diagnoses and conditions (mapped to ICD-10).',
        'Medications with dosage, route, frequency, and duration.',
        'Procedures and interventions (mapped to CPT where applicable).',
        'Anatomical references and laterality.',
        'Laboratory values with units and reference ranges.',
        'Temporal markers (onset, duration, frequency of symptoms).',
        'Negation detection (\u2018no chest pain\u2019, \u2018denies fever\u2019).'
    ])

    pdf.section_heading(7, 'Stage 5: Section Classification & Clinical Reasoning')
    pdf.body_text(
        'Extracted entities and transcript segments are classified into clinical note sections. '
        'ClinixSummary\u2019s section classifier goes beyond simple keyword matching \u2014 it understands '
        'clinical conversational flow:')
    pdf.body_text(
        'For example, when a patient says \u2018I\u2019ve been having this pain in my chest for about two weeks, '
        'it gets worse when I lie down,\u2019 the system recognises this as History of Present Illness content, '
        'extracts \u2018chest pain\u2019 as a symptom with \u2018two weeks\u2019 duration and \u2018worse when supine\u2019 as a '
        'modifying factor \u2014 even though the patient never used those clinical terms.')

    pdf.section_heading(8, 'Stage 6: Document Assembly')
    pdf.body_text(
        'The final stage assembles classified, entity-rich content into a structured clinical document:')
    pdf.bullet_list([
        'Template selection based on specialty, note type, and clinician preferences.',
        'Section ordering per clinical documentation standards.',
        'Clinical language normalisation (converting colloquial patient language to appropriate clinical '
        'terminology while preserving meaning).',
        'Completeness checking \u2014 flagging potentially missing sections or information.',
        'Code suggestions (ICD-10, CPT) based on extracted clinical entities.'
    ])

    pdf.section_heading(9, 'Performance Characteristics')
    pdf.body_text(
        'Typical performance metrics for a 15-minute general practice consultation:')
    pdf.bullet_list([
        'Audio-to-transcript latency: <500ms (streaming).',
        'End-to-end processing: <30 seconds from final audio to complete note.',
        'Speaker diarisation accuracy: >95% on 2-speaker consultations.',
        'Medical NER F1 score: >0.93 across core entity types.',
        'Section classification accuracy: >91% on standard SOAP sections.'
    ])

    pdf.section_heading(10, 'Conclusion')
    pdf.body_text(
        'The journey from ambient audio to structured clinical note is a complex, multi-stage process that '
        'requires deep integration of speech technology, medical NLP, and clinical domain knowledge. '
        'ClinixSummary\u2019s purpose-built pipeline handles this complexity invisibly, allowing clinicians '
        'to focus on their patients while the system handles the documentation.')

    pdf.output(os.path.join(OUT_DIR, 'ambient-audio-processing-2025.pdf'))
    print('  [OK] WP-2025-006 Ambient Audio Processing')


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    os.makedirs(OUT_DIR, exist_ok=True)
    print('Regenerating all 6 whitepaper PDFs...\n')
    wp01_architecture()
    wp02_training()
    wp03_integration()
    wp04_security()
    wp05_qms()
    wp06_ambient()
    print('\nAll 6 whitepapers regenerated successfully.')
