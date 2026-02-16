#!/usr/bin/env python3
"""
Generate 8 multilingual publication and white paper PDFs:
  INTL-2026-001  FR  Jun 2025  Publication   — Documentation clinique IA (francophones)
  INTL-2026-002  ES  Aug 2025  Publication   — Documentación clínica IA (América Latina)
  INTL-2026-003  PT  Oct 2025  Publication   — Documentação clínica IA (SUS brasileiro)
  INTL-2026-004  AR  Dec 2025  Publication   — التوثيق السريري الذكي (الخليج)
  INTL-2026-005  IT  Jan 2026  Publication   — Documentazione clinica SSN
  INTL-2026-006  FR  Sep 2025  White Paper   — Conformité RGPD
  INTL-2026-007  ES  Feb 2026  Publication   — Terminología médica / CIE-10
  INTL-2026-008  AR  Nov 2025  White Paper   — Arabic Medical NLP
"""

import os
from fpdf import FPDF

# ── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR  = os.path.join(BASE_DIR, 'docs', 'publications')
WP_DIR   = os.path.join(BASE_DIR, 'docs', 'whitepapers')
LOGO     = os.path.join(BASE_DIR, 'images', 'logo-wings.png')
FONT_DIR = '/usr/share/fonts/truetype/liberation'
FREE_DIR = '/usr/share/fonts/truetype/freefont'

ACCENT = (59, 197, 214)
DARK   = (9, 38, 58)

# ── Latin-script PDF class (FR / ES / PT) ───────────────────────────────────

class PubPDF(FPDF):
    def __init__(self, doc_id, date_str, title, doc_type='Publication'):
        super().__init__()
        self.doc_id = doc_id
        self.date_str = date_str
        self.pub_title = title
        self.doc_type = doc_type
        self.add_font('Liberation', '', os.path.join(FONT_DIR, 'LiberationSans-Regular.ttf'), uni=True)
        self.add_font('Liberation', 'B', os.path.join(FONT_DIR, 'LiberationSans-Bold.ttf'), uni=True)
        self.add_font('Liberation', 'I', os.path.join(FONT_DIR, 'LiberationSans-Italic.ttf'), uni=True)
        self.add_font('Liberation', 'BI', os.path.join(FONT_DIR, 'LiberationSans-BoldItalic.ttf'), uni=True)
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
        self.cell(0, 4, f'{self.doc_type}  |  {self.doc_id}', ln=False)
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
        yr = self.date_str.split()[-1] if self.date_str else '2026'
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
        self.cell(0, 6, self.doc_type.upper(), ln=True)
        self.ln(4)
        self.set_font('Liberation', 'B', 24)
        self.set_text_color(*DARK)
        self.multi_cell(0, 11, self.pub_title, align='L')
        self.ln(4)
        self.set_font('Liberation', '', 12)
        self.set_text_color(80, 80, 80)
        self.multi_cell(0, 7, subtitle, align='L')
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


# ── Arabic PDF class ────────────────────────────────────────────────────────

class ArabicPubPDF(FPDF):
    """PDF with Arabic (RTL) body text using FreeSerif + reshaper/bidi."""

    def __init__(self, doc_id, date_str, title_ar, title_en, doc_type='Publication'):
        super().__init__()
        self.doc_id = doc_id
        self.date_str = date_str
        self.pub_title_ar = title_ar
        self.pub_title_en = title_en
        self.doc_type = doc_type
        # Latin font for headers/footers/metadata
        self.add_font('Liberation', '', os.path.join(FONT_DIR, 'LiberationSans-Regular.ttf'), uni=True)
        self.add_font('Liberation', 'B', os.path.join(FONT_DIR, 'LiberationSans-Bold.ttf'), uni=True)
        self.add_font('Liberation', 'I', os.path.join(FONT_DIR, 'LiberationSans-Italic.ttf'), uni=True)
        # Arabic-capable font
        self.add_font('FreeSerif', '', os.path.join(FREE_DIR, 'FreeSerif.ttf'), uni=True)
        self.add_font('FreeSerif', 'B', os.path.join(FREE_DIR, 'FreeSerifBold.ttf'), uni=True)
        self.set_auto_page_break(auto=True, margin=25)

    @staticmethod
    def _ar(text):
        """Reshape and reorder Arabic text for visual LTR rendering in PDF."""
        import arabic_reshaper
        from bidi.algorithm import get_display
        reshaped = arabic_reshaper.reshape(text)
        return get_display(reshaped)

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
        self.cell(0, 4, f'{self.doc_type}  |  {self.doc_id}', ln=False)
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
        short = self.pub_title_en if len(self.pub_title_en) < 70 else self.pub_title_en[:67] + '...'
        self.cell(0, 4, f'ClinixSummary  |  {short}', ln=True, align='L')
        yr = self.date_str.split()[-1] if self.date_str else '2026'
        self.cell(0, 4,
                  f'\u00a9 {yr} GATMEDI. All rights reserved.  |  contact@clinixsummary.ai',
                  ln=False, align='L')
        self.cell(0, 4, f'Page {self.page_no()}/{{nb}}', ln=False, align='R')

    def cover_page(self, subtitle_ar, subtitle_en):
        self.add_page()
        self.alias_nb_pages()
        self.set_y(50)
        self.set_font('Liberation', 'B', 9)
        self.set_text_color(*ACCENT)
        self.cell(0, 6, self.doc_type.upper(), ln=True)
        self.ln(4)
        # Arabic title
        self.set_font('FreeSerif', 'B', 22)
        self.set_text_color(*DARK)
        self.cell(0, 11, self._ar(self.pub_title_ar), ln=True, align='R')
        self.ln(2)
        # English subtitle
        self.set_font('Liberation', 'B', 14)
        self.set_text_color(*DARK)
        self.multi_cell(0, 8, self.pub_title_en, align='L')
        self.ln(4)
        # Arabic subtitle
        self.set_font('FreeSerif', '', 11)
        self.set_text_color(80, 80, 80)
        self.multi_cell(0, 7, self._ar(subtitle_ar), align='R')
        self.ln(2)
        # English subtitle
        self.set_font('Liberation', '', 11)
        self.set_text_color(80, 80, 80)
        self.multi_cell(0, 7, subtitle_en, align='L')
        self.ln(10)
        # Meta box
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
            'The information contained herein is proprietary and confidential.')

    def ar_heading(self, number, title_ar):
        self.ln(6)
        self.set_font('FreeSerif', 'B', 14)
        self.set_text_color(*DARK)
        self.cell(0, 8, self._ar(f'{number}. {title_ar}'), ln=True, align='R')
        self.ln(2)

    def ar_body(self, text):
        self.set_font('FreeSerif', '', 11)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 6, self._ar(text), align='R')
        self.ln(2)

    def ar_bullets(self, items):
        self.set_font('FreeSerif', '', 11)
        self.set_text_color(50, 50, 50)
        for item in items:
            self.cell(0, 6, self._ar(item) + '  \u2022', ln=True, align='R')
            self.ln(1)
        self.ln(1)

    def en_heading(self, number, title):
        self.ln(6)
        self.set_font('Liberation', 'B', 14)
        self.set_text_color(*DARK)
        self.cell(0, 8, f'{number}. {title}', ln=True)
        self.ln(2)

    def en_body(self, text):
        self.set_font('Liberation', '', 10)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def info_box(self, text):
        self.ln(2)
        self.set_fill_color(242, 242, 240)
        self.set_font('Liberation', 'I', 10)
        self.set_text_color(80, 80, 80)
        self.set_x(14)
        self.multi_cell(182, 5.5, text, fill=True)
        self.ln(3)


# ══════════════════════════════════════════════════════════════════════════════
# 1. FRENCH PUBLICATION
# ══════════════════════════════════════════════════════════════════════════════

def generate_french():
    pdf = PubPDF('INTL-2026-001', 'June 2025',
                 'Optimisation de la Documentation Clinique par IA\n'
                 'dans les Syst\u00e8mes de Sant\u00e9 Francophones')
    pdf.cover_page(
        'Comment l\u2019intelligence artificielle transforme la documentation clinique dans '
        'les \u00e9tablissements de sant\u00e9 francophones \u2014 de la France au Qu\u00e9bec, de la '
        'Belgique \u00e0 l\u2019Afrique de l\u2019Ouest.')

    pdf.add_page()
    pdf.section_heading(1, 'R\u00e9sum\u00e9 Ex\u00e9cutif')
    pdf.body_text(
        'La documentation clinique repr\u00e9sente l\u2019un des d\u00e9fis les plus importants pour les '
        'professionnels de sant\u00e9 francophones. Les m\u00e9decins consacrent en moyenne 2 heures de '
        'documentation pour chaque heure de soins directs aux patients. Cette charge administrative '
        'contribue \u00e0 l\u2019\u00e9puisement professionnel et r\u00e9duit le temps disponible pour les patients.')
    pdf.body_text(
        'ClinixSummary offre une solution adapt\u00e9e aux syst\u00e8mes de sant\u00e9 francophones, avec '
        'une prise en charge compl\u00e8te du fran\u00e7ais m\u00e9dical \u2014 incluant les terminologies '
        'sp\u00e9cifiques au fran\u00e7ais de France, au fran\u00e7ais qu\u00e9b\u00e9cois et au fran\u00e7ais '
        'utilis\u00e9 en Afrique francophone.')

    pdf.section_heading(2, 'Le D\u00e9fi de la Documentation en Fran\u00e7ais')
    pdf.body_text(
        'La documentation clinique en fran\u00e7ais pr\u00e9sente des d\u00e9fis uniques que les syst\u00e8mes '
        'anglophones ne rencontrent pas :')
    pdf.bullet_list([
        'Variations terminologiques r\u00e9gionales \u2014 le vocabulaire m\u00e9dical diff\u00e8re entre la France, '
        'le Qu\u00e9bec, la Belgique et l\u2019Afrique francophone. Par exemple, \u00ab urgences \u00bb en France '
        'correspond \u00e0 \u00ab salle d\u2019urgence \u00bb au Qu\u00e9bec.',
        'Exigences r\u00e9glementaires vari\u00e9es \u2014 la HAS en France, l\u2019INESSS au Qu\u00e9bec et les '
        'autorit\u00e9s r\u00e9gionales en Afrique imposent des formats de documentation diff\u00e9rents.',
        'Alternance codique fr\u00e9quente \u2014 dans de nombreux contextes francophones, les termes '
        'techniques anglais sont couramment utilis\u00e9s au sein de consultations en fran\u00e7ais '
        '(par exemple, \u00ab le patient pr\u00e9sente un burnout \u00bb ou \u00ab on va faire un check-up \u00bb).',
        'Normes de codification \u2014 la CIM-10 (Classification Internationale des Maladies) est '
        'utilis\u00e9e dans sa version fran\u00e7aise, avec des libell\u00e9s et des r\u00e8gles de codage '
        'sp\u00e9cifiques au contexte francophone.'
    ])

    pdf.section_heading(3, 'Le March\u00e9 Francophone de la Sant\u00e9')
    pdf.sub_heading('3.1 France')
    pdf.body_text(
        'Avec plus de 226 000 m\u00e9decins en activit\u00e9 et un syst\u00e8me de sant\u00e9 reconnu comme '
        'l\u2019un des meilleurs au monde, la France repr\u00e9sente le plus grand march\u00e9 francophone '
        'pour la documentation clinique par IA. La transformation num\u00e9rique des \u00e9tablissements '
        'de sant\u00e9 fran\u00e7ais, acc\u00e9l\u00e9r\u00e9e par le programme Ma Sant\u00e9 2022 et le Ségur du '
        'num\u00e9rique en sant\u00e9, cr\u00e9e un environnement favorable \u00e0 l\u2019adoption d\u2019outils '
        'd\u2019IA clinique.')
    pdf.sub_heading('3.2 Qu\u00e9bec et Canada Francophone')
    pdf.body_text(
        'Le syst\u00e8me de sant\u00e9 qu\u00e9b\u00e9cois dessert 8,5 millions de r\u00e9sidents dans un '
        'contexte bilingue. Les cliniciens naviguent quotidiennement entre le fran\u00e7ais et l\u2019anglais, '
        'tant dans les consultations que dans la documentation. ClinixSummary g\u00e8re naturellement '
        'cette alternance linguistique, produisant des notes dans la langue pr\u00e9f\u00e9r\u00e9e du clinicien '
        'ind\u00e9pendamment de la langue parl\u00e9e durant la consultation.')
    pdf.sub_heading('3.3 Afrique Francophone')
    pdf.body_text(
        'L\u2019Afrique francophone repr\u00e9sente un march\u00e9 en croissance rapide avec des besoins '
        'sp\u00e9cifiques : infrastructure num\u00e9rique limit\u00e9e, p\u00e9nurie de personnel de sant\u00e9, '
        'et n\u00e9cessit\u00e9 d\u2019outils fonctionnant dans des contextes multilingues (fran\u00e7ais '
        'plus langues locales). ClinixSummary est con\u00e7u pour fonctionner efficacement m\u00eame '
        'avec une connectivit\u00e9 limit\u00e9e.')

    pdf.section_heading(4, 'Capacit\u00e9s de ClinixSummary en Fran\u00e7ais')
    pdf.body_text(
        'ClinixSummary offre une prise en charge compl\u00e8te du fran\u00e7ais m\u00e9dical :')
    pdf.bullet_list([
        'Reconnaissance vocale optimis\u00e9e pour le fran\u00e7ais m\u00e9dical, incluant les terminologies '
        'latines, les \u00e9ponymes et les abr\u00e9viations courantes.',
        'Gestion de l\u2019alternance codique fran\u00e7ais-anglais \u2014 les termes techniques anglais '
        'utilis\u00e9s dans un discours fran\u00e7ais sont correctement identifi\u00e9s et document\u00e9s.',
        'Mod\u00e8les sp\u00e9cifiques par sp\u00e9cialit\u00e9 avec terminologie fran\u00e7aise adapt\u00e9e pour '
        'plus de 40 sp\u00e9cialit\u00e9s m\u00e9dicales.',
        'Conformit\u00e9 RGPD int\u00e9gr\u00e9e \u2014 r\u00e9sidence des donn\u00e9es dans l\u2019Union '
        'europ\u00e9enne pour les utilisateurs fran\u00e7ais et belges.',
        'Suggestions de codification CIM-10 en fran\u00e7ais, adapt\u00e9es aux pratiques locales.'
    ])

    pdf.section_heading(5, 'Donn\u00e9es de Performance')
    pdf.body_text(
        'Les premiers d\u00e9ploiements de ClinixSummary dans des \u00e9tablissements francophones '
        'montrent des r\u00e9sultats prometteurs :')
    pdf.bullet_list([
        'Taux d\u2019acceptation des notes : 90 % (comparable aux r\u00e9sultats anglophones).',
        'R\u00e9duction du temps de documentation : 78 % en moyenne.',
        'Pr\u00e9cision de la reconnaissance de l\u2019alternance codique : 93 %.',
        'Satisfaction des cliniciens : 88 % rapportent une am\u00e9lioration significative de leur flux de travail.'
    ])

    pdf.section_heading(6, 'Conclusion')
    pdf.body_text(
        'Les syst\u00e8mes de sant\u00e9 francophones m\u00e9ritent des outils de documentation clinique '
        'con\u00e7us pour leurs besoins sp\u00e9cifiques \u2014 pas simplement des traductions de produits '
        'anglophones. ClinixSummary s\u2019engage \u00e0 offrir une exp\u00e9rience v\u00e9ritablement '
        'francophone, respectant les variations r\u00e9gionales, les exigences r\u00e9glementaires et '
        'les pratiques cliniques propres \u00e0 chaque march\u00e9 francophone.')

    pdf.output(os.path.join(OUT_DIR, 'fr-documentation-clinique-ia-2026.pdf'))
    print('  [OK] INTL-2026-001  FR  Documentation Clinique IA')


# ══════════════════════════════════════════════════════════════════════════════
# 2. SPANISH PUBLICATION
# ══════════════════════════════════════════════════════════════════════════════

def generate_spanish():
    pdf = PubPDF('INTL-2026-002', 'August 2025',
                 'Documentaci\u00f3n Cl\u00ednica con IA en la\n'
                 'Transformaci\u00f3n Digital de Am\u00e9rica Latina')
    pdf.cover_page(
        'C\u00f3mo la inteligencia artificial est\u00e1 transformando la documentaci\u00f3n cl\u00ednica en '
        'los sistemas de salud de Am\u00e9rica Latina \u2014 desde M\u00e9xico hasta Argentina, de Colombia '
        'a Chile.')

    pdf.add_page()
    pdf.section_heading(1, 'Resumen Ejecutivo')
    pdf.body_text(
        'Am\u00e9rica Latina se encuentra en un momento cr\u00edtico de transformaci\u00f3n digital en salud. '
        'Con m\u00e1s de 650 millones de habitantes y sistemas de salud que van desde centros de '
        'atenci\u00f3n primaria rurales hasta hospitales de alta complejidad, la regi\u00f3n enfrenta '
        'desaf\u00edos \u00fanicos en la documentaci\u00f3n cl\u00ednica.')
    pdf.body_text(
        'ClinixSummary ofrece una soluci\u00f3n dise\u00f1ada para la realidad latinoamericana: '
        'soporte completo del espa\u00f1ol m\u00e9dico con variantes regionales, funcionamiento '
        'en entornos con conectividad limitada, y conformidad con las regulaciones de '
        'protecci\u00f3n de datos de cada pa\u00eds.')

    pdf.section_heading(2, 'El Desaf\u00edo de la Documentaci\u00f3n en Am\u00e9rica Latina')
    pdf.body_text(
        'La documentaci\u00f3n cl\u00ednica en Am\u00e9rica Latina presenta desaf\u00edos espec\u00edficos:')
    pdf.bullet_list([
        'Variaciones terminol\u00f3gicas regionales \u2014 el vocabulario m\u00e9dico var\u00eda '
        'significativamente entre pa\u00edses. Por ejemplo, \u00ab tensi\u00f3n arterial \u00bb en algunos '
        'pa\u00edses es \u00ab presi\u00f3n arterial \u00bb en otros.',
        'Carga administrativa desproporcionada \u2014 en muchos pa\u00edses latinoamericanos, los '
        'm\u00e9dicos atienden entre 30 y 50 pacientes diarios, con tiempo m\u00ednimo para documentaci\u00f3n.',
        'Digitalizaci\u00f3n heterog\u00e9nea \u2014 coexisten hospitales con historias cl\u00ednicas '
        'electr\u00f3nicas avanzadas y centros que a\u00fan usan documentaci\u00f3n en papel.',
        'Marco regulatorio diverso \u2014 cada pa\u00eds tiene sus propias leyes de protecci\u00f3n de '
        'datos y est\u00e1ndares de documentaci\u00f3n cl\u00ednica.',
        'Escasez de personal de salud \u2014 la OPS estima un d\u00e9ficit de m\u00e1s de 600 000 '
        'profesionales de salud en la regi\u00f3n, lo que hace cr\u00edtica la optimizaci\u00f3n del '
        'tiempo cl\u00ednico.'
    ])

    pdf.section_heading(3, 'Mercados Clave')
    pdf.sub_heading('3.1 M\u00e9xico')
    pdf.body_text(
        'Con m\u00e1s de 300 000 m\u00e9dicos en ejercicio y un sistema de salud que atiende a '
        '130 millones de personas, M\u00e9xico representa el mayor mercado hispanohablante para '
        'la documentaci\u00f3n cl\u00ednica por IA. La Estrategia Digital Nacional y la modernizaci\u00f3n '
        'del IMSS e ISSSTE crean oportunidades significativas para la adopci\u00f3n de herramientas '
        'de IA en salud.')
    pdf.sub_heading('3.2 Colombia')
    pdf.body_text(
        'Colombia ha sido pionera en la adopci\u00f3n de historias cl\u00ednicas electr\u00f3nicas en '
        'Am\u00e9rica Latina. La Ley 2015 de 2020 sobre interoperabilidad en salud establece un '
        'marco favorable para la integraci\u00f3n de herramientas de documentaci\u00f3n cl\u00ednica por IA.')
    pdf.sub_heading('3.3 Argentina y Chile')
    pdf.body_text(
        'Ambos pa\u00edses cuentan con sistemas de salud desarrollados y una alta penetraci\u00f3n '
        'tecnol\u00f3gica. La Ley de Protecci\u00f3n de Datos Personales de Argentina y la Ley 20 584 '
        'de Chile sobre derechos del paciente establecen marcos claros para el uso de IA '
        'en documentaci\u00f3n cl\u00ednica.')

    pdf.section_heading(4, 'Capacidades de ClinixSummary en Espa\u00f1ol')
    pdf.body_text(
        'ClinixSummary ofrece soporte integral del espa\u00f1ol m\u00e9dico:')
    pdf.bullet_list([
        'Reconocimiento de voz optimizado para el espa\u00f1ol m\u00e9dico, incluyendo terminolog\u00eda '
        'latina, ep\u00f3nimos y abreviaturas cl\u00ednicas regionales.',
        'Adaptaci\u00f3n a variantes regionales \u2014 el sistema distingue entre las variantes '
        'mexicana, colombiana, argentina, chilena y espa\u00f1ola del espa\u00f1ol m\u00e9dico.',
        'Gesti\u00f3n de la alternancia de c\u00f3digos espa\u00f1ol-ingl\u00e9s \u2014 com\u00fan en contextos '
        'cl\u00ednicos donde se usan t\u00e9rminos t\u00e9cnicos en ingl\u00e9s.',
        'M\u00e1s de 40 especialidades m\u00e9dicas con terminolog\u00eda en espa\u00f1ol adaptada regionalmente.',
        'Sugerencias de codificaci\u00f3n CIE-10 en espa\u00f1ol, adaptadas a las pr\u00e1cticas de '
        'codificaci\u00f3n de cada pa\u00eds.'
    ])

    pdf.section_heading(5, 'Impacto Medido')
    pdf.body_text(
        'Los despliegues iniciales de ClinixSummary en entornos hispanohablantes demuestran:')
    pdf.bullet_list([
        'Reducci\u00f3n del tiempo de documentaci\u00f3n: 80 % en promedio.',
        'Tasa de aceptaci\u00f3n de notas: 89 %.',
        'Horas recuperadas por m\u00e9dico por d\u00eda: 2,3 horas en promedio.',
        'Mejora en la completitud de la documentaci\u00f3n: 35 % m\u00e1s elementos cl\u00ednicos capturados.',
        'Satisfacci\u00f3n del m\u00e9dico: 91 % reportan mejora en su calidad de vida profesional.'
    ])

    pdf.section_heading(6, 'Conclusi\u00f3n')
    pdf.body_text(
        'Am\u00e9rica Latina est\u00e1 lista para la transformaci\u00f3n digital de la documentaci\u00f3n '
        'cl\u00ednica. ClinixSummary ofrece una soluci\u00f3n que respeta las variaciones regionales '
        'del espa\u00f1ol m\u00e9dico, cumple con las regulaciones locales y est\u00e1 dise\u00f1ada para '
        'funcionar en la diversidad de contextos que caracterizan los sistemas de salud '
        'latinoamericanos.')

    pdf.output(os.path.join(OUT_DIR, 'es-documentacion-clinica-ia-latam-2026.pdf'))
    print('  [OK] INTL-2026-002  ES  Documentaci\u00f3n Cl\u00ednica IA (Am\u00e9rica Latina)')


# ══════════════════════════════════════════════════════════════════════════════
# 3. PORTUGUESE PUBLICATION
# ══════════════════════════════════════════════════════════════════════════════

def generate_portuguese():
    pdf = PubPDF('INTL-2026-003', 'October 2025',
                 'Documenta\u00e7\u00e3o Cl\u00ednica por IA no\n'
                 'Sistema \u00danico de Sa\u00fade Brasileiro')
    pdf.cover_page(
        'Como a intelig\u00eancia artificial pode transformar a documenta\u00e7\u00e3o cl\u00ednica no '
        'maior sistema p\u00fablico de sa\u00fade do mundo \u2014 o SUS brasileiro, que atende mais '
        'de 200 milh\u00f5es de pessoas.')

    pdf.add_page()
    pdf.section_heading(1, 'Resumo Executivo')
    pdf.body_text(
        'O Sistema \u00danico de Sa\u00fade (SUS) \u00e9 o maior sistema p\u00fablico de sa\u00fade do mundo, '
        'atendendo mais de 200 milh\u00f5es de brasileiros. Com mais de 500 000 m\u00e9dicos em '
        'atividade e uma rede que abrange desde unidades b\u00e1sicas de sa\u00fade em \u00e1reas '
        'remotas da Amaz\u00f4nia at\u00e9 hospitais terci\u00e1rios de alta complexidade, o Brasil '
        'apresenta desafios \u00fanicos para a documenta\u00e7\u00e3o cl\u00ednica.')
    pdf.body_text(
        'ClinixSummary oferece uma solu\u00e7\u00e3o adaptada \u00e0 realidade brasileira: suporte '
        'completo ao portugu\u00eas m\u00e9dico brasileiro, integra\u00e7\u00e3o com os padr\u00f5es do '
        'prontu\u00e1rio eletr\u00f4nico do SUS, e conformidade com a Lei Geral de Prote\u00e7\u00e3o '
        'de Dados (LGPD).')

    pdf.section_heading(2, 'O Desafio da Documenta\u00e7\u00e3o Cl\u00ednica no Brasil')
    pdf.body_text(
        'A documenta\u00e7\u00e3o cl\u00ednica no contexto brasileiro enfrenta desafios espec\u00edficos:')
    pdf.bullet_list([
        'Volume de atendimento \u2014 m\u00e9dicos do SUS frequentemente atendem 30 a 40 pacientes '
        'por dia, com tempo m\u00e9dio de consulta de 7 a 15 minutos. A documenta\u00e7\u00e3o compete '
        'diretamente com o tempo de aten\u00e7\u00e3o ao paciente.',
        'Dupla carga documental \u2014 muitos profissionais precisam documentar tanto no sistema '
        'eletr\u00f4nico quanto em formul\u00e1rios f\u00edsicos, especialmente em unidades b\u00e1sicas '
        'de sa\u00fade com infraestrutura digital limitada.',
        'Diversidade terminol\u00f3gica \u2014 o portugu\u00eas m\u00e9dico brasileiro possui terminologia '
        'pr\u00f3pria que difere do portugu\u00eas europeu, al\u00e9m de varia\u00e7\u00f5es regionais '
        'significativas.',
        'Integra\u00e7\u00e3o com o e-SUS \u2014 a Estrat\u00e9gia e-SUS Aten\u00e7\u00e3o B\u00e1sica exige '
        'formatos de documenta\u00e7\u00e3o espec\u00edficos que devem ser respeitados.',
        'Requisitos da LGPD \u2014 a Lei Geral de Prote\u00e7\u00e3o de Dados imp\u00f5e obriga\u00e7\u00f5es '
        'espec\u00edficas para o tratamento de dados de sa\u00fade que devem ser atendidas por '
        'qualquer ferramenta de IA cl\u00ednica.'
    ])

    pdf.section_heading(3, 'O Contexto do SUS')
    pdf.sub_heading('3.1 Escala e Complexidade')
    pdf.body_text(
        'O SUS realiza anualmente mais de 4 bilh\u00f5es de procedimentos ambulatoriais, '
        '11 milh\u00f5es de interna\u00e7\u00f5es e 1 bilh\u00e3o de consultas m\u00e9dicas. Cada um desses '
        'atendimentos gera documenta\u00e7\u00e3o cl\u00ednica que precisa ser precisa, completa e '
        'padronizada. A magnitude do sistema torna a otimiza\u00e7\u00e3o da documenta\u00e7\u00e3o uma '
        'prioridade estrat\u00e9gica.')
    pdf.sub_heading('3.2 Transforma\u00e7\u00e3o Digital')
    pdf.body_text(
        'O governo brasileiro tem investido na digitaliza\u00e7\u00e3o do SUS atrav\u00e9s da '
        'Estrat\u00e9gia de Sa\u00fade Digital 2020-2028. O prontu\u00e1rio eletr\u00f4nico do cidad\u00e3o, '
        'a Rede Nacional de Dados em Sa\u00fade (RNDS) e o aplicativo Meu SUS Digital '
        'representam avan\u00e7os significativos que criam um ecossistema favor\u00e1vel \u00e0 '
        'ado\u00e7\u00e3o de ferramentas de IA.')
    pdf.sub_heading('3.3 Setor Privado')
    pdf.body_text(
        'Al\u00e9m do SUS, o Brasil possui um setor de sa\u00fade suplementar com mais de 47 milh\u00f5es '
        'de benefici\u00e1rios. Hospitais privados e operadoras de planos de sa\u00fade est\u00e3o entre '
        'os primeiros a adotar tecnologias de IA para documentação cl\u00ednica, criando '
        'um mercado receptivo para solu\u00e7\u00f5es como o ClinixSummary.')

    pdf.section_heading(4, 'Capacidades em Portugu\u00eas Brasileiro')
    pdf.body_text(
        'ClinixSummary oferece suporte completo ao portugu\u00eas m\u00e9dico brasileiro:')
    pdf.bullet_list([
        'Reconhecimento de voz otimizado para o portugu\u00eas brasileiro m\u00e9dico, incluindo '
        'sotaques regionais, terminologia t\u00e9cnica e abreviaturas cl\u00ednicas comuns.',
        'Modelos espec\u00edficos por especialidade com terminologia m\u00e9dica brasileira para '
        'mais de 40 especialidades.',
        'Integra\u00e7\u00e3o com padr\u00f5es do e-SUS e TISS (Troca de Informa\u00e7\u00f5es em Sa\u00fade '
        'Suplementar) para documenta\u00e7\u00e3o compat\u00edvel.',
        'Sugest\u00f5es de codifica\u00e7\u00e3o CID-10 em portugu\u00eas, adaptadas \u00e0s pr\u00e1ticas '
        'brasileiras de codifica\u00e7\u00e3o.',
        'Conformidade total com a LGPD, incluindo resid\u00eancia de dados no Brasil para '
        'clientes brasileiros.'
    ])

    pdf.section_heading(5, 'Resultados Preliminares')
    pdf.body_text(
        'Os primeiros desdobramentos do ClinixSummary em institui\u00e7\u00f5es brasileiras '
        'demonstram resultados promissores:')
    pdf.bullet_list([
        'Redu\u00e7\u00e3o do tempo de documenta\u00e7\u00e3o: 79 % em m\u00e9dia.',
        'Taxa de aceita\u00e7\u00e3o das notas: 88 %.',
        'Aumento na completude da documenta\u00e7\u00e3o: 40 % mais elementos cl\u00ednicos registrados.',
        'Satisfa\u00e7\u00e3o dos m\u00e9dicos: 87 % relatam melhoria significativa no fluxo de trabalho.',
        'Tempo recuperado por m\u00e9dico: 2,5 horas por dia em m\u00e9dia.'
    ])

    pdf.section_heading(6, 'Conclus\u00e3o')
    pdf.body_text(
        'O Brasil, com o maior sistema p\u00fablico de sa\u00fade do mundo e um setor privado '
        'din\u00e2mico, est\u00e1 pronto para a transforma\u00e7\u00e3o da documenta\u00e7\u00e3o cl\u00ednica por IA. '
        'ClinixSummary oferece uma solu\u00e7\u00e3o que respeita a complexidade do sistema '
        'brasileiro, atende \u00e0s exig\u00eancias regulat\u00f3rias da LGPD e est\u00e1 adaptada ao '
        'portugu\u00eas m\u00e9dico brasileiro em toda a sua diversidade regional.')

    pdf.output(os.path.join(OUT_DIR, 'pt-documentacao-clinica-sus-2026.pdf'))
    print('  [OK] INTL-2026-003  PT  Documenta\u00e7\u00e3o Cl\u00ednica IA (SUS Brasileiro)')


# ══════════════════════════════════════════════════════════════════════════════
# 4. ARABIC PUBLICATION (bilingual Arabic/English)
# ══════════════════════════════════════════════════════════════════════════════

def generate_arabic():
    pdf = ArabicPubPDF(
        'INTL-2026-004', 'December 2025',
        'التوثيق السريري الذكي في منظومة الرعاية الصحية الخليجية',
        'Intelligent Clinical Documentation in Gulf Healthcare Systems')

    pdf.cover_page(
        'كيف يُحدث الذكاء الاصطناعي تحولاً في التوثيق السريري عبر دول مجلس التعاون الخليجي '
        '— من الإمارات إلى المملكة العربية السعودية وقطر',
        'How AI is transforming clinical documentation across the GCC '
        '\u2014 from the UAE to Saudi Arabia and Qatar.')

    # Section 1: Executive Summary (bilingual)
    pdf.add_page()
    pdf.ar_heading(1, 'الملخص التنفيذي')
    pdf.ar_body(
        'تشهد دول مجلس التعاون الخليجي تحولاً رقمياً غير مسبوق في قطاع الرعاية الصحية. '
        'من رؤية السعودية 2030 إلى استراتيجية الإمارات للذكاء الاصطناعي، تضع حكومات '
        'المنطقة الابتكار التكنولوجي في صميم خططها لتطوير الخدمات الصحية.')
    pdf.ar_body(
        'يقدم ClinixSummary حلاً متكاملاً للتوثيق السريري بالذكاء الاصطناعي، مصمماً خصيصاً '
        'لبيئة الرعاية الصحية الخليجية متعددة اللغات، حيث يتنقل الأطباء بين العربية '
        'والإنجليزية بشكل يومي.')

    # Section 2: The Gulf Healthcare Landscape
    pdf.ar_heading(2, 'واقع الرعاية الصحية في الخليج')
    pdf.ar_body(
        'تتميز منظومة الرعاية الصحية الخليجية بخصائص فريدة تؤثر على متطلبات التوثيق السريري:')
    pdf.ar_bullets([
        'تعدد اللغات — يتم إجراء الاستشارات بالعربية والإنجليزية وأحياناً لغات أخرى، مع التبديل المتكرر بين اللغات خلال الاستشارة الواحدة',
        'تنوع القوى العاملة — يعمل أطباء من أكثر من 50 جنسية في المستشفيات الخليجية، كل منهم يحمل خلفية لغوية مختلفة',
        'معايير اعتماد صارمة — هيئات مثل JCI وCBHI وDHA تفرض معايير توثيق عالية',
        'استثمارات ضخمة في الصحة الرقمية — تستثمر دول الخليج مليارات الدولارات في تحديث البنية التحتية الصحية',
    ])

    # Section 3: Key Markets
    pdf.add_page()
    pdf.ar_heading(3, 'الأسواق الرئيسية')
    pdf.ar_body(
        'الإمارات العربية المتحدة: تضم أكثر من 40 مستشفى حكومي و120 مستشفى خاص. '
        'تقود هيئة الصحة بدبي واستراتيجية أبوظبي الصحية مبادرات التحول الرقمي. '
        'تُعد الإمارات من أكثر بيئات الرعاية الصحية تنوعاً لغوياً في العالم.')
    pdf.ar_body(
        'المملكة العربية السعودية: مع أكثر من 80 ألف طبيب ورؤية 2030 التي تهدف إلى '
        'تحويل القطاع الصحي، تمثل المملكة أكبر سوق للتوثيق السريري بالذكاء الاصطناعي '
        'في المنطقة. برنامج التحول الصحي يدفع نحو رقمنة شاملة للخدمات الصحية.')
    pdf.ar_body(
        'قطر: تستعد لتوسيع بنيتها الصحية مع مشاريع جديدة، مع التركيز على الجودة '
        'والابتكار في الرعاية الصحية.')

    # Section 4: ClinixSummary Capabilities
    pdf.ar_heading(4, 'قدرات ClinixSummary للسوق الخليجي')
    pdf.ar_bullets([
        'دعم كامل للعربية الطبية مع التعرف على المصطلحات الطبية العربية والتبديل اللغوي العربي-الإنجليزي',
        'واجهة مستخدم كاملة من اليمين إلى اليسار مع دعم الاتجاهين للنصوص المختلطة',
        'أكثر من 40 تخصصاً طبياً بمصطلحات عربية وإنجليزية متوازية',
        'إقامة البيانات في المنطقة — خوادم داخل دول مجلس التعاون الخليجي',
        'التوافق مع معايير الاعتماد الخليجية بما في ذلك CBAHI و DHA و HAAD',
    ])

    # Section 5: Performance Data
    pdf.ar_heading(5, 'بيانات الأداء')
    pdf.ar_bullets([
        'معدل قبول الملاحظات: 91% في البيئات ثنائية اللغة عربي-إنجليزي',
        'تقليل وقت التوثيق: 82% في المتوسط',
        'دقة التعرف على التبديل اللغوي: 94%',
        'رضا الأطباء: 92% يبلغون عن تحسن كبير في سير العمل',
    ])

    # Section 6: Conclusion
    pdf.ar_heading(6, 'الخلاصة')
    pdf.ar_body(
        'تستحق منظومة الرعاية الصحية الخليجية أدوات توثيق سريري مصممة لواقعها '
        'المتعدد اللغات والثقافات. يلتزم ClinixSummary بتقديم تجربة حقيقية ثنائية اللغة '
        'تحترم خصوصية البيئة السريرية الخليجية.')

    pdf.output(os.path.join(OUT_DIR, 'ar-clinical-documentation-gulf-2026.pdf'))
    print('  [OK] INTL-2026-004  AR  Gulf Healthcare Documentation')


# ══════════════════════════════════════════════════════════════════════════════
# 5. ITALIAN PUBLICATION — SSN
# ══════════════════════════════════════════════════════════════════════════════

def generate_italian():
    pdf = PubPDF('INTL-2026-005', 'January 2026',
                 'Documentazione Clinica Automatizzata nel\n'
                 'Servizio Sanitario Nazionale Italiano')
    pdf.cover_page(
        'Come l\u2019intelligenza artificiale pu\u00f2 trasformare la documentazione clinica '
        'nel SSN italiano \u2014 tra liste d\u2019attesa, carenza di personale e la sfida '
        'della digitalizzazione del Fascicolo Sanitario Elettronico.')

    pdf.add_page()
    pdf.section_heading(1, 'Sintesi')
    pdf.body_text(
        'Il Servizio Sanitario Nazionale (SSN) italiano garantisce l\u2019assistenza sanitaria '
        'a oltre 59 milioni di cittadini. Con circa 240\u2009000 medici in attivit\u00e0 e una rete '
        'che comprende ospedali pubblici, strutture convenzionate, medici di medicina generale '
        'e pediatri di libera scelta, il sistema affronta una pressione crescente: liste '
        'd\u2019attesa in continuo aumento, carenza cronica di personale medico e un carico '
        'burocratico che sottrae tempo prezioso alla cura del paziente.')
    pdf.body_text(
        'La documentazione clinica rappresenta una parte significativa di questo carico. '
        'Secondo dati dell\u2019Ordine dei Medici, un medico ospedaliero italiano dedica in media '
        'oltre un terzo della propria giornata lavorativa ad attivit\u00e0 di tipo amministrativo '
        'e documentale. ClinixSummary offre una risposta concreta: un sistema di documentazione '
        'clinica basato sull\u2019intelligenza artificiale, progettato per la realt\u00e0 italiana.')

    pdf.section_heading(2, 'Le Sfide della Documentazione Clinica in Italia')
    pdf.body_text(
        'Il contesto italiano presenta criticit\u00e0 specifiche che rendono la documentazione '
        'clinica particolarmente onerosa:')
    pdf.bullet_list([
        'Frammentazione dei sistemi informativi \u2014 ogni Regione e spesso ogni ASL adotta '
        'sistemi informatici diversi, con formati di cartella clinica elettronica non sempre '
        'interoperabili. Il Fascicolo Sanitario Elettronico (FSE) 2.0, pur rappresentando '
        'un passo avanti, richiede ancora tempo per una piena adozione.',
        'Burocrazia documentale \u2014 lettere di dimissione, referti, schede di dimissione '
        'ospedaliera (SDO), piani terapeutici, certificati INPS: il medico italiano produce '
        'una quantit\u00e0 di documentazione che va ben oltre la cartella clinica.',
        'Doppia documentazione \u2014 in molte strutture coesistono ancora il cartaceo e il '
        'digitale, costringendo i medici a duplicare le registrazioni.',
        'Terminologia medica italiana \u2014 la documentazione clinica in Italia utilizza una '
        'terminologia propria che include latinismi, eponimi della tradizione medica italiana '
        'e abbreviazioni specifiche del contesto ospedaliero nazionale.',
        'Codifica ICD-9-CM e transizione all\u2019ICD-10 \u2014 l\u2019Italia \u00e8 in fase di '
        'transizione dal sistema ICD-9-CM all\u2019ICD-10, creando un periodo di complessit\u00e0 '
        'aggiuntiva nella codifica delle prestazioni.'
    ])

    pdf.section_heading(3, 'Il Contesto Normativo e Regolatorio')
    pdf.sub_heading('3.1 Protezione dei Dati Personali')
    pdf.body_text(
        'Il trattamento dei dati sanitari in Italia \u00e8 disciplinato dal Regolamento Generale '
        'sulla Protezione dei Dati (RGPD/GDPR) e dal Codice in materia di protezione dei '
        'dati personali (D.Lgs. 196/2003, cos\u00ec come modificato dal D.Lgs. 101/2018). Il '
        'Garante per la protezione dei dati personali ha emanato provvedimenti specifici '
        'sul trattamento dei dati sanitari e sull\u2019uso di sistemi di intelligenza artificiale '
        'in ambito sanitario. ClinixSummary \u00e8 progettato per rispettare integralmente '
        'questo quadro normativo.')
    pdf.sub_heading('3.2 Regolamento Europeo sull\u2019Intelligenza Artificiale')
    pdf.body_text(
        'Il Regolamento UE sull\u2019IA (AI Act) classifica i sistemi di IA in ambito sanitario '
        'come \u00ab ad alto rischio \u00bb, imponendo requisiti stringenti in termini di trasparenza, '
        'supervisione umana, qualit\u00e0 dei dati e gestione del rischio. L\u2019architettura di '
        'ClinixSummary \u00e8 stata progettata per essere conforme a questi requisiti, con un '
        'approccio che garantisce la supervisione del medico su ogni documento generato.')
    pdf.sub_heading('3.3 Fascicolo Sanitario Elettronico 2.0')
    pdf.body_text(
        'Il Piano Nazionale di Ripresa e Resilienza (PNRR) ha stanziato 1,38 miliardi '
        'di euro per il potenziamento del Fascicolo Sanitario Elettronico. L\u2019obiettivo \u00e8 '
        'rendere il FSE il punto unico di accesso ai documenti sanitari di ogni cittadino '
        'italiano. ClinixSummary genera documentazione in formati compatibili con gli '
        'standard del FSE 2.0, facilitando l\u2019integrazione con l\u2019infrastruttura nazionale.')

    pdf.section_heading(4, 'ClinixSummary per il Medico Italiano')
    pdf.body_text(
        'ClinixSummary offre funzionalit\u00e0 specifiche per il contesto sanitario italiano:')
    pdf.bullet_list([
        'Riconoscimento vocale ottimizzato per l\u2019italiano medico, inclusi i regionalismi '
        'e le abbreviazioni cliniche pi\u00f9 diffuse (es., \u00ab EO nella norma \u00bb, \u00ab MV presente '
        'su tutto l\u2019ambito \u00bb, \u00ab PAO nei limiti \u00bb).',
        'Modelli specialistici per oltre 40 specialit\u00e0 mediche con terminologia italiana '
        'specifica \u2014 dalla cardiologia all\u2019ortopedia, dalla pediatria alla psichiatria.',
        'Generazione automatica della lettera di dimissione strutturata, del referto '
        'ambulatoriale e del diario clinico in formato conforme agli standard regionali.',
        'Supporto alla codifica ICD-9-CM e ICD-10 con suggerimenti contestuali basati '
        'sulla documentazione clinica generata.',
        'Gestione dell\u2019alternanza linguistica italiano-inglese \u2014 frequente nella pratica '
        'clinica italiana, dove molti termini tecnici vengono usati in inglese '
        '(es., \u00ab follow-up \u00bb, \u00ab imaging \u00bb, \u00ab screening \u00bb, \u00ab device \u00bb).',
        'Conformit\u00e0 GDPR/RGPD integrata con residenza dei dati nell\u2019Unione Europea e '
        'possibilit\u00e0 di deployment on-premises per le strutture che lo richiedono.'
    ])

    pdf.section_heading(5, 'Dati Preliminari')
    pdf.body_text(
        'Le prime implementazioni di ClinixSummary in strutture sanitarie italiane '
        'evidenziano risultati significativi:')
    pdf.bullet_list([
        'Riduzione del tempo di documentazione: 77 % in media.',
        'Tasso di accettazione delle note: 89 %.',
        'Completezza della documentazione: incremento del 38 % degli elementi clinici '
        'registrati rispetto alla documentazione manuale.',
        'Soddisfazione dei medici: l\u201987 % riferisce un miglioramento rilevante del '
        'proprio flusso di lavoro quotidiano.',
        'Tempo recuperato per medico: una media di 2,0 ore al giorno riallocate alla '
        'cura diretta del paziente.'
    ])

    pdf.section_heading(6, 'Conclusione')
    pdf.body_text(
        'Il medico italiano merita strumenti di documentazione clinica pensati per la '
        'complessit\u00e0 del sistema sanitario nazionale \u2014 non semplici traduzioni di '
        'prodotti anglofoni. ClinixSummary si impegna a offrire un\u2019esperienza autenticamente '
        'italiana, che rispetti le specificit\u00e0 terminologiche, le esigenze normative e le '
        'pratiche cliniche proprie del contesto italiano, contribuendo concretamente a '
        'restituire tempo alla relazione medico-paziente.')

    pdf.output(os.path.join(OUT_DIR, 'it-documentazione-clinica-ssn-2026.pdf'))
    print('  [OK] INTL-2026-005  IT  Documentazione Clinica SSN')


# ══════════════════════════════════════════════════════════════════════════════
# 6. FRENCH PUBLICATION #2 — RGPD / GDPR COMPLIANCE
# ══════════════════════════════════════════════════════════════════════════════

def generate_french_rgpd():
    pdf = PubPDF('INTL-2026-006', 'September 2025',
                 'Cadre de Conformit\u00e9 RGPD pour la\n'
                 'Documentation Clinique Automatis\u00e9e',
                 doc_type='White Paper')
    pdf.cover_page(
        'Analyse approfondie des exigences du R\u00e8glement G\u00e9n\u00e9ral sur la Protection '
        'des Donn\u00e9es appliqu\u00e9es \u00e0 la documentation clinique par intelligence artificielle '
        '\u2014 obligations du responsable de traitement, analyse d\u2019impact, droits des patients '
        'et r\u00f4le de la CNIL.')

    pdf.add_page()
    pdf.section_heading(1, 'R\u00e9sum\u00e9 Ex\u00e9cutif')
    pdf.body_text(
        'Le d\u00e9ploiement de syst\u00e8mes d\u2019intelligence artificielle pour la documentation '
        'clinique soul\u00e8ve des questions fondamentales en mati\u00e8re de protection des donn\u00e9es '
        '\u00e0 caract\u00e8re personnel. Les donn\u00e9es de sant\u00e9 figurent parmi les cat\u00e9gories '
        'particuli\u00e8res de donn\u00e9es au sens de l\u2019article 9 du RGPD, b\u00e9n\u00e9ficiant d\u2019un '
        'r\u00e9gime de protection renforc\u00e9.')
    pdf.body_text(
        'Cette publication pr\u00e9sente le cadre de conformit\u00e9 RGPD mis en \u0153uvre par '
        'ClinixSummary, \u00e0 l\u2019intention des d\u00e9l\u00e9gu\u00e9s \u00e0 la protection des donn\u00e9es (DPO), '
        'des responsables de la s\u00e9curit\u00e9 des syst\u00e8mes d\u2019information (RSSI) et des '
        'directions d\u2019\u00e9tablissements de sant\u00e9 francophones.')

    pdf.section_heading(2, 'Base Juridique du Traitement')
    pdf.body_text(
        'Tout traitement de donn\u00e9es de sant\u00e9 par un syst\u00e8me d\u2019IA doit reposer sur '
        'une base juridique clairement identifi\u00e9e. Dans le cadre de ClinixSummary, '
        'les bases juridiques applicables sont :')
    pdf.bullet_list([
        'Article 6(1)(b) \u2014 Ex\u00e9cution du contrat de soins : le traitement des donn\u00e9es '
        'est n\u00e9cessaire \u00e0 la prise en charge m\u00e9dicale du patient, la documentation '
        'clinique constituant une obligation l\u00e9gale et d\u00e9ontologique du professionnel de sant\u00e9.',
        'Article 9(2)(h) \u2014 M\u00e9decine pr\u00e9ventive ou du travail, diagnostic m\u00e9dical, '
        'prise en charge sanitaire : cette exception permet le traitement des donn\u00e9es '
        'de sant\u00e9 dans le cadre de la fourniture de soins de sant\u00e9.',
        'Article 6(1)(f) \u2014 Int\u00e9r\u00eat l\u00e9gitime : pour certaines op\u00e9rations sp\u00e9cifiques '
        'comme l\u2019am\u00e9lioration de la qualit\u00e9 du service, sous r\u00e9serve d\u2019une mise en '
        'balance avec les droits des personnes concern\u00e9es.',
    ])
    pdf.body_text(
        'ClinixSummary ne recourt jamais au consentement comme base juridique principale '
        'pour le traitement li\u00e9 \u00e0 la documentation clinique, reconnaissant le d\u00e9s\u00e9quilibre '
        'inh\u00e9rent \u00e0 la relation m\u00e9decin-patient qui rend le consentement difficilement \u00ab libre \u00bb '
        'au sens du RGPD dans ce contexte.')

    pdf.section_heading(3, 'Analyse d\u2019Impact (AIPD)')
    pdf.body_text(
        'L\u2019article 35 du RGPD impose la r\u00e9alisation d\u2019une analyse d\u2019impact relative '
        '\u00e0 la protection des donn\u00e9es (AIPD) lorsque le traitement est susceptible '
        'd\u2019engendrer un risque \u00e9lev\u00e9 pour les droits et libert\u00e9s des personnes. '
        'Le traitement de donn\u00e9es de sant\u00e9 par un syst\u00e8me d\u2019IA r\u00e9pond \u00e0 ce crit\u00e8re.')
    pdf.sub_heading('3.1 M\u00e9thodologie d\u2019Analyse')
    pdf.body_text(
        'ClinixSummary fournit \u00e0 chaque \u00e9tablissement client une AIPD pr\u00e9-\u00e9labor\u00e9e '
        'suivant la m\u00e9thodologie PIA de la CNIL. Cette analyse couvre :')
    pdf.bullet_list([
        'Description d\u00e9taill\u00e9e du traitement \u2014 nature des donn\u00e9es collect\u00e9es (audio '
        'de consultation, transcription, note clinique), finalit\u00e9s, dur\u00e9e de conservation, '
        'destinataires.',
        '\u00c9valuation de la n\u00e9cessit\u00e9 et de la proportionnalit\u00e9 \u2014 justification de '
        'chaque cat\u00e9gorie de donn\u00e9es trait\u00e9es au regard de la finalit\u00e9 poursuivie.',
        'Identification des risques \u2014 risques d\u2019acc\u00e8s non autoris\u00e9, de divulgation, '
        'd\u2019alt\u00e9ration ou de perte des donn\u00e9es de sant\u00e9.',
        'Mesures d\u2019att\u00e9nuation \u2014 chiffrement AES-256, effacement cryptographique de '
        'l\u2019audio, contr\u00f4les d\u2019acc\u00e8s, journalisation, pseudonymisation.'
    ])

    pdf.section_heading(4, 'Minimisation des Donn\u00e9es et Finalit\u00e9 Limit\u00e9e')
    pdf.sub_heading('4.1 Principe de Minimisation')
    pdf.body_text(
        'Conform\u00e9ment \u00e0 l\u2019article 5(1)(c) du RGPD, ClinixSummary applique strictement '
        'le principe de minimisation des donn\u00e9es :')
    pdf.bullet_list([
        'Effacement imm\u00e9diat de l\u2019audio \u2014 l\u2019enregistrement audio est supprim\u00e9 d\u00e8s '
        'que la note clinique est g\u00e9n\u00e9r\u00e9e. Aucun fichier audio n\u2019est conserv\u00e9.',
        'Absence de stockage de donn\u00e9es d\u2019entra\u00eenement \u2014 les donn\u00e9es des patients '
        'ne sont jamais utilis\u00e9es pour l\u2019entra\u00eenement des mod\u00e8les. Les mod\u00e8les sont '
        'entra\u00een\u00e9s exclusivement sur des donn\u00e9es d\u00e9-identifi\u00e9es et synth\u00e9tiques.',
        'Traitement \u00e9ph\u00e9m\u00e8re \u2014 les donn\u00e9es transitent en m\u00e9moire vive chiffr\u00e9e '
        'durant le traitement et ne sont jamais \u00e9crites sur disque en clair.'
    ])
    pdf.sub_heading('4.2 Limitation des Finalit\u00e9s')
    pdf.body_text(
        'Les donn\u00e9es trait\u00e9es par ClinixSummary sont utilis\u00e9es exclusivement pour la '
        'finalit\u00e9 d\u00e9clar\u00e9e : la g\u00e9n\u00e9ration de documentation clinique au b\u00e9n\u00e9fice du '
        'professionnel de sant\u00e9 et du patient. Aucun traitement secondaire (profilage, '
        'analyse comportementale, recherche non consentie) n\u2019est effectu\u00e9.')

    pdf.section_heading(5, 'Droits des Personnes Concern\u00e9es')
    pdf.body_text(
        'ClinixSummary garantit l\u2019exercice effectif des droits reconnus par le RGPD :')
    pdf.bullet_list([
        'Droit d\u2019acc\u00e8s (article 15) \u2014 le patient peut obtenir, via son professionnel '
        'de sant\u00e9, l\u2019int\u00e9gralit\u00e9 des donn\u00e9es trait\u00e9es le concernant.',
        'Droit de rectification (article 16) \u2014 toute inexactitude dans la note clinique '
        'g\u00e9n\u00e9r\u00e9e peut \u00eatre corrig\u00e9e par le professionnel de sant\u00e9.',
        'Droit \u00e0 l\u2019effacement (article 17) \u2014 sous r\u00e9serve des obligations l\u00e9gales de '
        'conservation du dossier m\u00e9dical (20 ans en France conform\u00e9ment au Code de la '
        'sant\u00e9 publique, article R. 1112-7).',
        'Droit \u00e0 la portabilit\u00e9 (article 20) \u2014 les notes cliniques sont exportables '
        'dans des formats structur\u00e9s et interop\u00e9rables (HL7 FHIR, CDA).',
        'Droit d\u2019opposition (article 21) \u2014 le patient peut s\u2019opposer \u00e0 l\u2019utilisation '
        'du syst\u00e8me d\u2019IA lors de sa consultation, sans cons\u00e9quence sur sa prise en charge.'
    ])

    pdf.section_heading(6, 'H\u00e9bergement de Donn\u00e9es de Sant\u00e9 (HDS)')
    pdf.body_text(
        'En France, l\u2019h\u00e9bergement de donn\u00e9es de sant\u00e9 \u00e0 caract\u00e8re personnel est '
        'soumis \u00e0 une certification sp\u00e9cifique (certification HDS, d\u00e9cret n\u00b0 2018-137). '
        'ClinixSummary utilise exclusivement des h\u00e9bergeurs certifi\u00e9s HDS pour le '
        'traitement et le stockage des donn\u00e9es de ses clients fran\u00e7ais. La r\u00e9sidence '
        'des donn\u00e9es est garantie au sein de l\u2019Union europ\u00e9enne.')

    pdf.section_heading(7, 'Conclusion')
    pdf.body_text(
        'La conformit\u00e9 RGPD n\u2019est pas un obstacle au d\u00e9ploiement de l\u2019IA en sant\u00e9 \u2014 '
        'c\u2019est un cadre qui garantit la confiance n\u00e9cessaire \u00e0 son adoption. '
        'ClinixSummary d\u00e9montre qu\u2019il est possible de concilier innovation technologique '
        'et protection rigoureuse des donn\u00e9es de sant\u00e9, dans le respect du droit '
        'europ\u00e9en et des sp\u00e9cificit\u00e9s du syst\u00e8me de sant\u00e9 fran\u00e7ais.')

    pdf.output(os.path.join(WP_DIR, 'fr-conformite-rgpd-documentation-2026.pdf'))
    print('  [OK] INTL-2026-006  FR  Conformit\u00e9 RGPD')


# ══════════════════════════════════════════════════════════════════════════════
# 7. SPANISH PUBLICATION #2 — TERMINOLOGÍA / CIE-10
# ══════════════════════════════════════════════════════════════════════════════

def generate_spanish_cie10():
    pdf = PubPDF('INTL-2026-007', 'February 2026',
                 'Terminolog\u00eda M\u00e9dica Estandarizada y\n'
                 'Codificaci\u00f3n CIE-10 en Sistemas de Salud\n'
                 'Hispanohablantes')
    pdf.cover_page(
        'C\u00f3mo la inteligencia artificial aborda el desaf\u00edo de la estandarizaci\u00f3n '
        'terminol\u00f3gica m\u00e9dica y la codificaci\u00f3n CIE-10 a trav\u00e9s de m\u00e1s de 20 pa\u00edses '
        'hispanohablantes \u2014 donde un mismo concepto cl\u00ednico puede recibir nombres distintos '
        'seg\u00fan el pa\u00eds.')

    pdf.add_page()
    pdf.section_heading(1, 'Resumen Ejecutivo')
    pdf.body_text(
        'El espa\u00f1ol m\u00e9dico no es un idioma \u00fanico. Un mismo concepto cl\u00ednico puede '
        'expresarse de formas radicalmente distintas en M\u00e9xico, Argentina, Colombia, '
        'Espa\u00f1a o Chile. Esta variaci\u00f3n terminol\u00f3gica, invisible para los sistemas de '
        'documentaci\u00f3n cl\u00ednica dise\u00f1ados en ingl\u00e9s, tiene consecuencias directas '
        'sobre la calidad de la codificaci\u00f3n CIE-10, la interoperabilidad de los registros '
        'cl\u00ednicos y, en \u00faltima instancia, la seguridad del paciente.')
    pdf.body_text(
        'Esta publicaci\u00f3n analiza las variaciones terminol\u00f3gicas del espa\u00f1ol m\u00e9dico '
        'entre pa\u00edses, su impacto en la codificaci\u00f3n cl\u00ednica, y c\u00f3mo ClinixSummary '
        'aborda este desaf\u00edo mediante modelos de normalizaci\u00f3n terminol\u00f3gica '
        'espec\u00edficos por regi\u00f3n.')

    pdf.section_heading(2, 'El Problema: Un Idioma, M\u00faltiples Terminolog\u00edas')
    pdf.body_text(
        'Las variaciones terminol\u00f3gicas en el espa\u00f1ol m\u00e9dico no son meramente coloquiales '
        '\u2014 afectan la terminolog\u00eda cl\u00ednica formal utilizada en la documentaci\u00f3n:')
    pdf.bullet_list([
        'Denominaciones anat\u00f3micas \u2014 \u00ab tobillo \u00bb (Espa\u00f1a, M\u00e9xico) vs. '
        '\u00ab tobillo / empeine \u00bb (variaciones regionales en Centroam\u00e9rica). '
        '\u00ab Mu\u00f1eca \u00bb es universal, pero \u00ab antebrazo \u00bb vs. \u00ab brazo \u00bb se confunden '
        'en el uso cl\u00ednico coloquial de algunos pa\u00edses.',
        'Nombres de procedimientos \u2014 \u00ab leg\u00e8rize / legrado \u00bb (Colombia) vs. '
        '\u00ab curetaje \u00bb (Argentina) vs. \u00ab raspado uterino \u00bb (uso coloquial en M\u00e9xico). '
        '\u00ab Apendicectom\u00eda \u00bb vs. \u00ab apendectom\u00eda \u00bb coexisten en la literatura m\u00e9dica.',
        'Denominaciones farmacol\u00f3gicas \u2014 \u00ab paracetamol \u00bb (Espa\u00f1a, Argentina, Chile) vs. '
        '\u00ab acetaminof\u00e9n \u00bb (M\u00e9xico, Colombia, Centroam\u00e9rica). \u00ab Ibuprofeno \u00bb es universal, '
        'pero los nombres comerciales y las formas de referirse al medicamento var\u00edan.',
        'S\u00edntomas y hallazgos \u2014 \u00ab tensi\u00f3n arterial \u00bb (Argentina, Uruguay) vs. '
        '\u00ab presi\u00f3n arterial \u00bb (M\u00e9xico, Colombia). \u00ab Emesis \u00bb (formal) vs. \u00ab v\u00f3mito \u00bb '
        '(coloquial en toda la regi\u00f3n) vs. \u00ab g\u00f3mito \u00bb (uso informal en algunos pa\u00edses).',
        'Niveles de atenci\u00f3n \u2014 \u00ab consultorio \u00bb (M\u00e9xico) vs. \u00ab consulta \u00bb (Espa\u00f1a) vs. '
        '\u00ab consultorio externo \u00bb (Argentina). \u00ab Centro de salud \u00bb, \u00ab cl\u00ednica \u00bb, '
        '\u00ab unidad m\u00e9dica \u00bb tienen connotaciones distintas seg\u00fan el pa\u00eds.'
    ])

    pdf.section_heading(3, 'Impacto en la Codificaci\u00f3n CIE-10')
    pdf.body_text(
        'La Clasificaci\u00f3n Internacional de Enfermedades, 10.\u00aa revisi\u00f3n (CIE-10) '
        'utiliza t\u00e9rminos estandarizados en su versi\u00f3n en espa\u00f1ol (OPS/OMS). Sin embargo, '
        'la documentaci\u00f3n cl\u00ednica que alimenta la codificaci\u00f3n est\u00e1 escrita en el '
        'espa\u00f1ol local del m\u00e9dico, no en el espa\u00f1ol estandarizado de la CIE-10.')
    pdf.body_text(
        'Este desajuste genera problemas sistem\u00e1ticos:')
    pdf.bullet_list([
        'P\u00e9rdida de especificidad \u2014 cuando el codificador no reconoce un sin\u00f3nimo '
        'regional, recurre a c\u00f3digos inespec\u00edficos (con sufijo .9), reduciendo la '
        'calidad de los datos epidemiol\u00f3gicos y la precisi\u00f3n del reembolso.',
        'Errores de codificaci\u00f3n \u2014 sin\u00f3nimos regionales pueden llevar a c\u00f3digos '
        'err\u00f3neos si el codificador no est\u00e1 familiarizado con la variante utilizada.',
        'Dificultad en la interoperabilidad \u2014 registros cl\u00ednicos de distintos pa\u00edses '
        'hispanohablantes resultan dif\u00edcilmente comparables a nivel terminol\u00f3gico.',
        'Impacto en investigaci\u00f3n \u2014 los estudios multicentric\u00e9ntricos que abarcan varios '
        'pa\u00edses hispanohablantes enfrentan barreras terminol\u00f3gicas no triviales.'
    ])

    pdf.section_heading(4, 'Enfoque de ClinixSummary')
    pdf.sub_heading('4.1 Normalizaci\u00f3n Terminol\u00f3gica Contextual')
    pdf.body_text(
        'ClinixSummary mantiene un grafo de sin\u00f3nimos m\u00e9dicos por regi\u00f3n que mapea '
        'las variantes locales a terminolog\u00eda CIE-10 estandarizada. El sistema reconoce '
        'que cuando un m\u00e9dico mexicano dice \u00ab acetaminof\u00e9n \u00bb y un m\u00e9dico espa\u00f1ol dice '
        '\u00ab paracetamol \u00bb, se refieren al mismo principio activo \u2014 y documenta '
        'ambos correctamente.')
    pdf.sub_heading('4.2 Mapeo SNOMED CT')
    pdf.body_text(
        'Adem\u00e1s de la CIE-10, ClinixSummary mapea los t\u00e9rminos cl\u00ednicos a SNOMED CT '
        'en espa\u00f1ol (edici\u00f3n del Centro Nacional de Referencia de cada pa\u00eds), '
        'permitiendo una codificaci\u00f3n sem\u00e1ntica m\u00e1s rica que la clasificaci\u00f3n puramente '
        'diagn\u00f3stica de la CIE-10.')
    pdf.sub_heading('4.3 Adaptaci\u00f3n por Pa\u00eds')
    pdf.body_text(
        'El sistema detecta autom\u00e1ticamente la variante regional del espa\u00f1ol m\u00e9dico '
        'utilizada por el cl\u00ednico y adapta su procesamiento en consecuencia. No se trata '
        'de una simple detecci\u00f3n de acento \u2014 es un reconocimiento integral del contexto '
        'terminol\u00f3gico regional que incluye vocabulario, abreviaturas y convenciones '
        'documentales propias de cada pa\u00eds.')

    pdf.section_heading(5, 'Resultados de Precisi\u00f3n')
    pdf.body_text(
        'La normalizaci\u00f3n terminol\u00f3gica de ClinixSummary ha sido evaluada en consultas '
        'cl\u00ednicas reales en cinco pa\u00edses hispanohablantes:')
    pdf.bullet_list([
        'Precisi\u00f3n en la normalizaci\u00f3n terminol\u00f3gica: 94 % promedio regional.',
        'Reducci\u00f3n en el uso de c\u00f3digos CIE-10 inespec\u00edficos (.9): 32 %.',
        'Mejora en la concordancia de codificaci\u00f3n entre pa\u00edses: 28 %.',
        'Reconocimiento de sin\u00f3nimos regionales: 96 % de cobertura para las 500 '
        'variantes terminol\u00f3gicas m\u00e1s frecuentes.'
    ])

    pdf.section_heading(6, 'Conclusi\u00f3n')
    pdf.body_text(
        'La estandarizaci\u00f3n terminol\u00f3gica no consiste en eliminar las variaciones '
        'regionales del espa\u00f1ol m\u00e9dico \u2014 consiste en comprenderlas y mapearlas '
        'correctamente. ClinixSummary permite que cada m\u00e9dico se exprese en su variante '
        'natural del espa\u00f1ol, mientras genera documentaci\u00f3n y codificaci\u00f3n '
        'estandarizadas y comparables a nivel internacional.')

    pdf.output(os.path.join(OUT_DIR, 'es-terminologia-codificacion-cie10-2026.pdf'))
    print('  [OK] INTL-2026-007  ES  Terminolog\u00eda M\u00e9dica / CIE-10')


# ══════════════════════════════════════════════════════════════════════════════
# 8. ARABIC PUBLICATION #2 — ARABIC MEDICAL NLP
# ══════════════════════════════════════════════════════════════════════════════

def generate_arabic_nlp():
    pdf = ArabicPubPDF(
        'INTL-2026-008', 'November 2025',
        '\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0637\u0628\u064a\u0629: \u0646\u062d\u0648 \u062a\u0648\u062b\u064a\u0642 \u0633\u0631\u064a\u0631\u064a \u0623\u0643\u062b\u0631 \u062f\u0642\u0629',
        'AI and Arabic Medical Language Processing:\nTowards More Accurate Clinical Documentation',
        doc_type='White Paper')

    pdf.cover_page(
        '\u062a\u062d\u0644\u064a\u0644 \u0645\u0639\u0645\u0651\u0642 \u0644\u062a\u062d\u062f\u064a\u0627\u062a \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0641\u064a \u0627\u0644\u0633\u064a\u0627\u0642 \u0627\u0644\u0633\u0631\u064a\u0631\u064a \u2014 '
        '\u0645\u0646 \u0627\u0644\u062a\u0639\u0642\u064a\u062f \u0627\u0644\u0635\u0631\u0641\u064a \u0625\u0644\u0649 \u062a\u0639\u062f\u062f \u0627\u0644\u0644\u0647\u062c\u0627\u062a\u060c \u0648\u0645\u0646 \u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0644\u063a\u0648\u064a '
        '\u0625\u0644\u0649 \u0627\u0644\u0645\u0635\u0637\u0644\u062d\u0627\u062a \u0627\u0644\u0637\u0628\u064a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629',
        'A deep analysis of Arabic language processing challenges in clinical settings '
        '\u2014 from morphological complexity to dialect variation, code-switching, '
        'and Arabic medical terminology.')

    # Section 1: Executive Summary
    pdf.add_page()
    pdf.ar_heading(1, '\u0627\u0644\u0645\u0644\u062e\u0635 \u0627\u0644\u062a\u0646\u0641\u064a\u0630\u064a')
    pdf.ar_body(
        '\u062a\u064f\u0639\u062f\u0651 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0645\u0646 \u0623\u0643\u062b\u0631 \u0627\u0644\u0644\u063a\u0627\u062a \u062a\u062d\u062f\u064a\u0627\u064b \u0644\u0623\u0646\u0638\u0645\u0629 \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0637\u0628\u064a\u0639\u064a\u0629. '
        '\u0641\u0647\u064a \u0644\u063a\u0629 \u0633\u0627\u0645\u064a\u0629 \u0630\u0627\u062a \u0646\u0638\u0627\u0645 \u0635\u0631\u0641\u064a \u0645\u0639\u0642\u062f \u064a\u0639\u062a\u0645\u062f \u0639\u0644\u0649 \u0627\u0644\u062c\u0630\u0648\u0631 \u0648\u0627\u0644\u0623\u0648\u0632\u0627\u0646\u060c '
        '\u0648\u062a\u0643\u062a\u0628 \u0645\u0646 \u0627\u0644\u064a\u0645\u064a\u0646 \u0625\u0644\u0649 \u0627\u0644\u064a\u0633\u0627\u0631\u060c \u0648\u062a\u062a\u0645\u064a\u0632 \u0628\u062a\u0639\u062f\u062f \u0627\u0644\u0644\u0647\u062c\u0627\u062a '
        '\u0627\u0644\u062a\u064a \u062a\u062e\u062a\u0644\u0641 \u0627\u062e\u062a\u0644\u0627\u0641\u0627\u064b \u062c\u0648\u0647\u0631\u064a\u0627\u064b \u0639\u0646 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0641\u0635\u062d\u0649 \u0627\u0644\u0645\u0639\u0627\u0635\u0631\u0629.')
    pdf.ar_body(
        '\u0641\u064a \u0627\u0644\u0633\u064a\u0627\u0642 \u0627\u0644\u0633\u0631\u064a\u0631\u064a\u060c \u062a\u0632\u062f\u0627\u062f \u0647\u0630\u0647 \u0627\u0644\u062a\u062d\u062f\u064a\u0627\u062a \u062a\u0639\u0642\u064a\u062f\u0627\u064b: '
        '\u0641\u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u064a\u062a\u0646\u0642\u0644\u0648\u0646 \u0628\u0627\u0633\u062a\u0645\u0631\u0627\u0631 \u0628\u064a\u0646 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0648\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629\u060c '
        '\u0648\u064a\u0633\u062a\u062e\u062f\u0645\u0648\u0646 \u0644\u0647\u062c\u0627\u062a\u0647\u0645 \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0645\u0639 \u0627\u0644\u0645\u0631\u0636\u0649\u060c '
        '\u0648\u064a\u0648\u0638\u0641\u0648\u0646 \u0645\u0635\u0637\u0644\u062d\u0627\u062a \u0637\u0628\u064a\u0629 \u0639\u0631\u0628\u064a\u0629 \u0648\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 \u0648\u0644\u0627\u062a\u064a\u0646\u064a\u0629 \u0641\u064a \u0627\u0644\u062c\u0645\u0644\u0629 \u0627\u0644\u0648\u0627\u062d\u062f\u0629.')

    # Section 2: Arabic Morphological Complexity
    pdf.ar_heading(2, '\u0627\u0644\u062a\u0639\u0642\u064a\u062f \u0627\u0644\u0635\u0631\u0641\u064a \u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629')
    pdf.ar_body(
        '\u064a\u0639\u062a\u0645\u062f \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0635\u0631\u0641\u064a \u0627\u0644\u0639\u0631\u0628\u064a \u0639\u0644\u0649 \u0646\u0638\u0627\u0645 \u0627\u0644\u062c\u0630\u0631 \u0648\u0627\u0644\u0648\u0632\u0646. '
        '\u0641\u0645\u0646 \u0627\u0644\u062c\u0630\u0631 \u0627\u0644\u062b\u0644\u0627\u062b\u064a \u0643-\u062a-\u0628 \u062a\u064f\u0634\u062a\u0642 \u0643\u0644\u0645\u0627\u062a \u0645\u062b\u0644: '
        '\u0643\u0627\u062a\u0628\u060c \u0645\u0643\u062a\u0648\u0628\u060c \u0643\u062a\u0627\u0628\u0629\u060c \u0645\u0643\u062a\u0628\u060c \u0643\u0650\u062a\u0627\u0628. '
        '\u0647\u0630\u0627 \u0627\u0644\u062b\u0631\u0627\u0621 \u0627\u0644\u0635\u0631\u0641\u064a \u064a\u0639\u0646\u064a \u0623\u0646 \u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u0648\u0627\u062d\u062f\u0629 \u064a\u0645\u0643\u0646 \u0623\u0646 \u062a\u0623\u062e\u0630 '
        '\u0639\u0634\u0631\u0627\u062a \u0627\u0644\u0623\u0634\u0643\u0627\u0644 \u0627\u0644\u0645\u062e\u062a\u0644\u0641\u0629\u060c \u0645\u0645\u0627 \u064a\u062c\u0639\u0644 \u0627\u0644\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0635\u0637\u0644\u062d\u0627\u062a '
        '\u0627\u0644\u0637\u0628\u064a\u0629 \u0623\u0643\u062b\u0631 \u062a\u0639\u0642\u064a\u062f\u0627\u064b \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0644\u063a\u0627\u062a \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a\u0629.')

    # Section 3: Dialects in Clinical Settings
    pdf.add_page()
    pdf.ar_heading(3, '\u0627\u0644\u0644\u0647\u062c\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0641\u064a \u0627\u0644\u0633\u064a\u0627\u0642 \u0627\u0644\u0633\u0631\u064a\u0631\u064a')
    pdf.ar_body(
        '\u064a\u0648\u062c\u062f \u0641\u0631\u0642 \u062c\u0648\u0647\u0631\u064a \u0628\u064a\u0646 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0641\u0635\u062d\u0649 \u0627\u0644\u0645\u0639\u0627\u0635\u0631\u0629 '
        '\u0648\u0627\u0644\u0644\u0647\u062c\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0627\u0644\u062a\u064a \u064a\u0633\u062a\u062e\u062f\u0645\u0647\u0627 \u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0641\u064a \u062a\u0648\u0627\u0635\u0644\u0647\u0645 '
        '\u0627\u0644\u064a\u0648\u0645\u064a \u0645\u0639 \u0627\u0644\u0645\u0631\u0636\u0649. \u0627\u0644\u0644\u0647\u062c\u0629 \u0627\u0644\u062e\u0644\u064a\u062c\u064a\u0629 \u062a\u062e\u062a\u0644\u0641 '
        '\u0627\u062e\u062a\u0644\u0627\u0641\u0627\u064b \u0643\u0628\u064a\u0631\u0627\u064b \u0639\u0646 \u0627\u0644\u0644\u0647\u062c\u0629 \u0627\u0644\u0645\u0635\u0631\u064a\u0629 \u0623\u0648 \u0627\u0644\u0634\u0627\u0645\u064a\u0629 '
        '\u0623\u0648 \u0627\u0644\u0645\u063a\u0627\u0631\u0628\u064a\u0629\u060c \u0648\u0643\u0644 \u0645\u0646\u0647\u0627 \u062a\u0633\u062a\u062e\u062f\u0645 '
        '\u0623\u0644\u0641\u0627\u0638\u0627\u064b \u0645\u062e\u062a\u0644\u0641\u0629 \u0644\u0648\u0635\u0641 \u0627\u0644\u0623\u0639\u0631\u0627\u0636 \u0648\u0627\u0644\u0623\u0645\u0631\u0627\u0636.')
    pdf.ar_bullets([
        '\u0627\u0644\u0644\u0647\u062c\u0629 \u0627\u0644\u062e\u0644\u064a\u062c\u064a\u0629 \u2014 \u00ab\u0639\u0646\u062f\u064a \u0635\u062f\u0627\u0639 \u0648\u062d\u0631\u0627\u0631\u0629\u00bb \u062a\u0639\u0646\u064a \u00ab\u0623\u0639\u0627\u0646\u064a \u0645\u0646 \u0635\u062f\u0627\u0639 \u0648\u062d\u0645\u0649\u00bb',
        '\u0627\u0644\u0644\u0647\u062c\u0629 \u0627\u0644\u0645\u0635\u0631\u064a\u0629 \u2014 \u00ab\u0628\u0637\u0646\u064a \u0628\u062a\u0648\u062c\u0639\u0646\u064a \u0623\u0648\u064a\u00bb \u062a\u0639\u0646\u064a \u00ab\u0623\u0634\u0639\u0631 \u0628\u0623\u0644\u0645 \u0634\u062f\u064a\u062f \u0641\u064a \u0627\u0644\u0628\u0637\u0646\u00bb',
        '\u0627\u0644\u0644\u0647\u062c\u0629 \u0627\u0644\u0634\u0627\u0645\u064a\u0629 \u2014 \u00ab\u0645\u0639\u062f\u062a\u064a \u0639\u0645 \u062a\u0648\u062c\u0639\u0646\u064a \u0643\u062a\u064a\u0631\u00bb \u062a\u0639\u0646\u064a \u00ab\u0623\u0639\u0627\u0646\u064a \u0645\u0646 \u0623\u0644\u0645 \u0634\u062f\u064a\u062f \u0641\u064a \u0627\u0644\u0645\u0639\u062f\u0629\u00bb',
        '\u0627\u0644\u0644\u0647\u062c\u0629 \u0627\u0644\u0645\u063a\u0627\u0631\u0628\u064a\u0629 \u2014 \u00ab\u0643\u0646\u062d\u0633 \u0628\u0627\u0644\u0635\u062f\u0627\u0639 \u0641 \u0631\u0627\u0633\u064a\u00bb \u062a\u0639\u0646\u064a \u00ab\u0623\u0634\u0639\u0631 \u0628\u0635\u062f\u0627\u0639 \u0641\u064a \u0631\u0623\u0633\u064a\u00bb',
    ])

    # Section 4: Code-Switching Patterns
    pdf.ar_heading(4, '\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0644\u063a\u0648\u064a \u0641\u064a \u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0629 \u0627\u0644\u0633\u0631\u064a\u0631\u064a\u0629')
    pdf.ar_body(
        '\u064a\u064f\u0639\u062f\u0651 \u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0644\u063a\u0648\u064a \u0628\u064a\u0646 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0648\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 \u0633\u0645\u0629 \u0645\u0645\u064a\u0632\u0629 \u0644\u0644\u0645\u0645\u0627\u0631\u0633\u0629 '
        '\u0627\u0644\u0633\u0631\u064a\u0631\u064a\u0629 \u0641\u064a \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0639\u0631\u0628\u064a. \u0641\u0627\u0644\u0637\u0628\u064a\u0628 \u0642\u062f \u064a\u0642\u0648\u0644: '
        '\u00ab\u0627\u0644\u0645\u0631\u064a\u0636 \u0639\u0646\u062f\u0647 chest pain \u0648 shortness of breath\u060c '
        '\u0648\u0627\u0644\u0640 ECG \u0637\u0628\u064a\u0639\u064a\u060c \u0628\u0633 \u0627\u0644\u0640 troponin \u0645\u0631\u062a\u0641\u0639 \u0634\u0648\u064a\u0629\u00bb. '
        '\u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0637 \u0627\u0644\u0645\u062e\u062a\u0644\u0637 \u0637\u0628\u064a\u0639\u064a \u062a\u0645\u0627\u0645\u0627\u064b \u0641\u064a \u0627\u0644\u0628\u064a\u0626\u0629 \u0627\u0644\u0633\u0631\u064a\u0631\u064a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629\u060c '
        '\u0644\u0643\u0646\u0647 \u064a\u0645\u062b\u0644 \u062a\u062d\u062f\u064a\u0627\u064b \u0643\u0628\u064a\u0631\u0627\u064b \u0644\u0623\u0646\u0638\u0645\u0629 \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0637\u0628\u064a\u0639\u064a\u0629.')

    # Section 5: Arabic Medical Terminology
    pdf.ar_heading(5, '\u0627\u0644\u0645\u0635\u0637\u0644\u062d\u0627\u062a \u0627\u0644\u0637\u0628\u064a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629')
    pdf.ar_body(
        '\u062a\u0645\u062a\u0644\u0643 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u062a\u0631\u0627\u062b\u0627\u064b \u0637\u0628\u064a\u0627\u064b \u063a\u0646\u064a\u0627\u064b \u064a\u0639\u0648\u062f \u0625\u0644\u0649 \u0627\u0644\u0639\u0635\u0631 \u0627\u0644\u0630\u0647\u0628\u064a '
        '\u0644\u0644\u062d\u0636\u0627\u0631\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629. \u0627\u0628\u0646 \u0633\u064a\u0646\u0627 \u0648\u0627\u0644\u0631\u0627\u0632\u064a \u0648\u0627\u0628\u0646 \u0627\u0644\u0646\u0641\u064a\u0633 '
        '\u0623\u0633\u0633\u0648\u0627 \u0645\u0635\u0637\u0644\u062d\u0627\u062a \u0637\u0628\u064a\u0629 \u0639\u0631\u0628\u064a\u0629 \u0644\u0627 \u062a\u0632\u0627\u0644 \u0645\u0633\u062a\u062e\u062f\u0645\u0629 \u062d\u062a\u0649 \u0627\u0644\u064a\u0648\u0645. '
        '\u0648\u0645\u0639 \u0630\u0644\u0643\u060c \u0641\u0625\u0646 \u0643\u062b\u064a\u0631\u0627\u064b \u0645\u0646 \u0627\u0644\u0645\u0635\u0637\u0644\u062d\u0627\u062a \u0627\u0644\u0637\u0628\u064a\u0629 \u0627\u0644\u062d\u062f\u064a\u062b\u0629 \u062a\u064f\u0633\u062a\u062e\u062f\u0645 '
        '\u0628\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 \u0641\u064a \u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629\u060c \u0645\u0645\u0627 \u064a\u062e\u0644\u0642 \u0627\u0632\u062f\u0648\u0627\u062c\u064a\u0629 '
        '\u0645\u0635\u0637\u0644\u062d\u064a\u0629 \u064a\u062c\u0628 \u0639\u0644\u0649 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u062a\u0648\u062b\u064a\u0642 \u0627\u0644\u0633\u0631\u064a\u0631\u064a \u0627\u0644\u062a\u0639\u0627\u0645\u0644 \u0645\u0639\u0647\u0627.')

    # Section 6: Performance and Conclusion
    pdf.ar_heading(6, '\u0627\u0644\u0623\u062f\u0627\u0621 \u0648\u0627\u0644\u062e\u0644\u0627\u0635\u0629')
    pdf.ar_body(
        '\u062d\u0642\u0642 ClinixSummary \u0646\u062a\u0627\u0626\u062c \u0645\u062a\u0642\u062f\u0645\u0629 \u0641\u064a \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0637\u0628\u064a\u0629:')
    pdf.ar_bullets([
        '\u062f\u0642\u0629 \u0627\u0644\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0635\u0637\u0644\u062d\u0627\u062a \u0627\u0644\u0637\u0628\u064a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629: 93%',
        '\u062f\u0642\u0629 \u0627\u0644\u062a\u0639\u0627\u0645\u0644 \u0645\u0639 \u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0644\u063a\u0648\u064a: 94%',
        '\u062a\u063a\u0637\u064a\u0629 \u0627\u0644\u0644\u0647\u062c\u0627\u062a: \u0627\u0644\u062e\u0644\u064a\u062c\u064a\u0629 \u0648\u0627\u0644\u0645\u0635\u0631\u064a\u0629 \u0648\u0627\u0644\u0634\u0627\u0645\u064a\u0629 \u0648\u0627\u0644\u0645\u063a\u0627\u0631\u0628\u064a\u0629',
        '\u0645\u0639\u062f\u0644 \u0642\u0628\u0648\u0644 \u0627\u0644\u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0641\u064a \u0628\u064a\u0626\u0627\u062a \u062b\u0646\u0627\u0626\u064a\u0629 \u0627\u0644\u0644\u063a\u0629: 91%',
    ])

    pdf.output(os.path.join(WP_DIR, 'ar-arabic-nlp-medical-2026.pdf'))
    print('  [OK] INTL-2026-008  AR  Arabic Medical NLP')


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(WP_DIR, exist_ok=True)
    print('Generating 8 multilingual publication PDFs...\n')
    print('--- Batch 1 ---')
    generate_french()
    generate_spanish()
    generate_portuguese()
    generate_arabic()
    print('\n--- Batch 2 ---')
    generate_italian()
    generate_french_rgpd()
    generate_spanish_cie10()
    generate_arabic_nlp()
    print('\nAll 8 multilingual publications generated successfully.')
