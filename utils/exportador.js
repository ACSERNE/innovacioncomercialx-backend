const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

async function exportarReportePDF(alertas) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30 });
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      doc.fontSize(18).text('Reporte de Alertas', { align: 'center' });
      doc.moveDown();

      doc.fontSize(14).text('Productos con Stock Bajo:');
      alertas.stockBajo.forEach(p => {
        doc.text(`- ${p.nombre}: ${p.stock} unidades`);
      });

      doc.moveDown();
      doc.fontSize(14).text('Productos Próximos a Vencer:');
      alertas.proximosVencer.forEach(p => {
        doc.text(`- ${p.nombre}: Vence el ${p.fecha_vencimiento} (Stock: ${p.stock})`);
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function exportarReporteExcel(alertas) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Alertas');

  sheet.columns = [
    { header: 'Tipo de Alerta', key: 'tipo', width: 30 },
    { header: 'Nombre Producto', key: 'nombre', width: 30 },
    { header: 'Stock', key: 'stock', width: 15 },
    { header: 'Fecha de Vencimiento', key: 'fecha_vencimiento', width: 20 },
  ];

  alertas.stockBajo.forEach(p => {
    sheet.addRow({ tipo: 'Stock Bajo', nombre: p.nombre, stock: p.stock, fecha_vencimiento: '' });
  });
  alertas.proximosVencer.forEach(p => {
    sheet.addRow({ tipo: 'Próximo a Vencer', nombre: p.nombre, stock: p.stock, fecha_vencimiento: p.fecha_vencimiento });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

module.exports = { exportarReportePDF, exportarReporteExcel };
