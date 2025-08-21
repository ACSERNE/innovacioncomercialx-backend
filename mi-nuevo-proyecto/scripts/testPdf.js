const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('demo.pdf'));

doc.fontSize(18).text('📄 PDF generado desde Docker', 100, 100);
doc.end();

console.log('✅ PDF generado como demo.pdf');