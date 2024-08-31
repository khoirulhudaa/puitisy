import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

/// Array ukuran kertas
const PaperSizes = [
    { value: 'A4', label: 'A4', width: 11906, height: 16838, margin: 720 },
    { value: 'A5', label: 'A5', width: 8272, height: 11692, margin: 720 },
];

// Array ukuran font
const FontSizes = [
{ value: 10, label: '10', size: 20 },
{ value: 11, label: '11', size: 22 },
{ value: 12, label: '12', size: 24 },
];

const convertToWord = (value, title, author, fontSize, paper, font) => {

  const selectedPaper = PaperSizes.find((p) => p.value === paper);
  const selectedFontSize = FontSizes.find((f) => f.value === fontSize).size;
  console.log(value, title, fontSize, paper, font)
  // Ambil nilai dari CKEditor (ckeditorValue harus berisi HTML)
  const content = value;

  // Buat dokumen baru
  const doc = new Document({
    sections: [
      {
        properties: {
            page: {
              size: { width: selectedPaper.width, height: selectedPaper.height },
              margin: { top: selectedPaper.margin, right: selectedPaper.margin, bottom: selectedPaper.margin, left: selectedPaper.margin },
            },
          },
          children: [
            // Tambahkan teks 14px bold
            new Paragraph({
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  size: 28, // 14px = 28 half-points
                }),
              ],
            }),
            // Tambahkan teks 12px normal
            new Paragraph({
              children: [
                new TextRun({
                  text: `Karya: ${author}`,
                  size: 20, // 10px = 20 half-points
                  italics: true
                }),
              ],
              spacing: { line: 360 }, // Line height 1.5
            }),
            new Paragraph({}), // Spasi sebelum konten dari CKEditor
  
            // Parsing HTML dari CKEditor dan tambahkan ke dokumen Word
            ...parseHtmlToDocx(content, selectedFontSize, font),
          ],
      },
    ],
  });

  // Pack document into a Blob
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${title}.docx`);
  });
};

const parseHtmlToDocx = (html, fontSize, font) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = [];
    
    Array.from(doc.body.childNodes).forEach((node) => {
      if (node.nodeName === 'P') {
        elements.push(
          new Paragraph({
            children: Array.from(node.childNodes).map((child) => {
              if (child.nodeName === '#text') {
                return new TextRun({
                  text: child.textContent,
                  font: font,
                  size: fontSize,
                });
              }
              if (child.nodeName === 'STRONG') {
                return new TextRun({
                  text: child.textContent,
                  bold: true,
                  font: font,
                  size: fontSize,
                });
              }
              return new TextRun({
                text: child.textContent,
                font: font,
                size: fontSize,
              });
            }),
            spacing: { line: 360 }, // Line height 1.5 untuk setiap paragraf
          })
        );
      }
    });
    
    return elements;
};

export default convertToWord