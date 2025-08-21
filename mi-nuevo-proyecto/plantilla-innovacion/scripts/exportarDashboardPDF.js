const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function exportarPDF() {
  const logsDir = path.join(__dirname, '../logs');
  const htmlFiles = fs.readdirSync(logsDir)
    .filter(file => file.startsWith('dashboard-ejecutores') && file.endsWith('.html'))
    .sort()
    .reverse();

  if (htmlFiles.length === 0) {
    console.error('❌ No se encontró ningún archivo HTML de dashboard para exportar.');
    return;
  }

  const archivoHTML = path.join(logsDir, htmlFiles[0]);
  const pdfPath = archivoHTML.replace('.html', '.pdf');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + archivoHTML, { waitUntil: 'networkidle0' });
  await page.pdf({ path: pdfPath, format: 'A4' });

  await browser.close();
  console.log(`✅ Dashboard exportado como PDF en: ${pdfPath}`);
}

exportarPDF();