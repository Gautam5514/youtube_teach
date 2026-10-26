from pathlib import Path
import re
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent.parent
out = ROOT / 'output/pdf/prompt-documentation.pdf'
out.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont('Arial', '/System/Library/Fonts/Supplemental/Arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold', '/System/Library/Fonts/Supplemental/Arial Bold.ttf'))
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='BodyDoc', fontName='Arial', fontSize=9.5, leading=14.5, textColor=HexColor('#334e68'), spaceAfter=8))
styles.add(ParagraphStyle(name='SectionDoc', fontName='ArialBold', fontSize=16, leading=21, textColor=HexColor('#102a43'), spaceBefore=18, spaceAfter=10, keepWithNext=True))
styles.add(ParagraphStyle(name='SubDoc', fontName='ArialBold', fontSize=11, leading=16, textColor=HexColor('#0d8277'), spaceBefore=10, spaceAfter=7, keepWithNext=True))
styles.add(ParagraphStyle(name='CoverDoc', fontName='ArialBold', fontSize=31, leading=37, textColor=HexColor('#102a43'), spaceAfter=22))
styles.add(ParagraphStyle(name='CellDoc', fontName='Arial', fontSize=8, leading=11, textColor=HexColor('#334e68')))

def clean(text):
    for old in ['—','–','‑']:
        text = text.replace(old, '-')
    return escape(text.replace('`','')).replace('\n', '<br/>')

def p(text, kind='BodyDoc'):
    return Paragraph(clean(text), styles[kind])

def footer(canvas, doc):
    canvas.setStrokeColor(HexColor('#e4ebf0'))
    canvas.line(46, 39, 549, 39)
    canvas.setFont('Arial', 8)
    canvas.setFillColor(HexColor('#526477'))
    canvas.drawString(46, 25, 'SMILECARE / AI DEVELOPMENT & PROMPT RECORD')
    canvas.drawRightString(549, 25, str(doc.page))

story = [Spacer(1, 65), p('SMILECARE DENTAL STUDIO', 'SubDoc'), p('AI development &\nprompt engineering record', 'CoverDoc'), p('Healthcare / Website Development\nAI Growth & Automation Associate Assessment\n26 October 2026'), Spacer(1, 26), p('What is included', 'SectionDoc'), p('Part 1: Tool usage, prompt provenance, observed follow-ups, implementation decisions, and limits.\nPart 2: The full supplied 12-prompt reference sequence.'), p('This record distinguishes the supplied original brief from the AI interactions visible in this session. It does not invent unavailable earlier conversations or claim a completed personal video or live deployment.'), Spacer(1, 18), p('Original source: github.com/Gautam5514/course_selling/blob/main/prompt'), p('The accompanying original-prompts.txt preserves the retrieved source text. This PDF normalizes typographic dashes and wraps the text for reading.'), PageBreak()]
text = (ROOT / 'public/submission/prompt-documentation.md').read_text()
lines = text.splitlines()
i = 0
while i < len(lines):
    line = lines[i].strip()
    if not line:
        i += 1; continue
    if line.startswith('|'):
        rows = []
        while i < len(lines) and lines[i].strip().startswith('|'):
            cols = [x.strip() for x in lines[i].strip().strip('|').split('|')]
            if not all(re.fullmatch(r'[-: ]+', x) for x in cols):
                rows.append([p(x, 'CellDoc') for x in cols])
            i += 1
        table = Table(rows, colWidths=[42, 148, 313], repeatRows=1)
        table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor('#e8f8f5')),('GRID',(0,0),(-1,-1),.4,HexColor('#e4ebf0')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]))
        story.extend([table, Spacer(1,12)]); continue
    if line.startswith('# '):
        story.append(p('Part 1 / AI process and observed revisions', 'SectionDoc'))
    elif line.startswith('## '): story.append(p(line[3:], 'SubDoc'))
    elif line.startswith('>'): story.append(p(line.lstrip('> ')))
    else: story.append(p(line))
    i += 1
story.append(PageBreak())
story.append(p('Part 2 / Full original prompt reference', 'SectionDoc'))
story.append(p('All twelve supplied prompts follow. They are the source brief for the existing application, not evidence of twelve newly executed user messages in the improvement session.'))
original = (ROOT / 'public/submission/original-prompts.txt').read_text()
blocks = re.split(r'(?=PROMPT \d{2} —)', original)
for block in blocks[1:]:
    story.append(PageBreak())
    paragraphs = re.sub(r'={10,}', '', block).strip().split('\n\n')
    for j, para in enumerate(paragraphs):
        para = para.strip()
        if para: story.append(p(para, 'SectionDoc' if j == 0 else 'BodyDoc'))
SimpleDocTemplate(str(out), pagesize=(595.28,841.89), rightMargin=46, leftMargin=46, topMargin=44, bottomMargin=56, title='SmileCare - AI Development and Prompt Engineering Record', author='SmileCare Project').build(story, onFirstPage=footer, onLaterPages=footer)
print(out)
