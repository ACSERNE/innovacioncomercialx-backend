const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generarReciboPDF = async ({ transaccion, producto, comprador }) => {
  const doc = new PDFDocument();
  const fileName = `recibo_${transaccion.id}.pdf`;
  const filePath = path.resolve(__dirname, '..', 'recibos', fileName);

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(20).text('Recibo de Compra', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Transacción ID: ${transaccion.id}`);
  doc.text(`Producto: ${producto.nombre}`);
  doc.text(`Cantidad: ${transaccion.cantidad}`);
  doc.text(`Precio Unitario: $${transaccion.precio_unitario}`);
  doc.text(`Total: $${transaccion.total}`);
  doc.text(`Método de Pago: ${transaccion.metodo_pago}`);
  doc.text(`Fecha: ${transaccion.createdAt.toLocaleString()}`);
  doc.text(`Comprador: ${comprador.nombre} (${comprador.email})`);

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
};

module.exports = { generarReciboPDF };
