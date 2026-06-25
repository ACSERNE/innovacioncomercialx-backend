const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const { Transaccion, FlujoCaja, Producto, Usuario } = require('../models');
const { Op } = require('sequelize');

class ReporteService {

  // -----------------------------
  // VENTAS ENTRE FECHAS
  // -----------------------------
  async obtenerVentasEntreFechas(desde, hasta) {
    return await Transaccion.findAll({
      where: {
        tipo: 'venta',
        fecha: { [Op.between]: [desde, hasta] }
      },
      include: [{ model: Usuario, as: 'usuario' }],
      order: [['fecha', 'ASC']]
    });
  }

  // -----------------------------
  // FLUJO DE CAJA ENTRE FECHAS
  // -----------------------------
  async obtenerFlujoCajaEntreFechas(desde, hasta) {
    return await FlujoCaja.findAll({
      where: {
        fecha: { [Op.between]: [desde, hasta] }
      },
      order: [['fecha', 'ASC']]
    });
  }

  // -----------------------------
  // PRODUCTOS
  // -----------------------------
  async obtenerProductos() {
    return await Producto.findAll({
      order: [['nombre', 'ASC']]
    });
  }

  // -----------------------------
  // EXCEL: VENTAS
  // -----------------------------
  async generarExcelVentas(ventas, stream) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Ventas');

    sheet.columns = [
      { header: 'Fecha', key: 'fecha', width: 15 },
      { header: 'Monto', key: 'monto', width: 15 },
      { header: 'Usuario', key: 'usuario', width: 25 },
      { header: 'Descripción', key: 'descripcion', width: 40 }
    ];

    ventas.forEach(v => {
      sheet.addRow({
        fecha: v.fecha,
        monto: v.monto,
        usuario: v.usuario ? v.usuario.nombre : '',
        descripcion: v.descripcion || ''
      });
    });

    await workbook.xlsx.write(stream);
  }

  // -----------------------------
  // PDF: VENTAS
  // -----------------------------
  async generarPDFVentas(ventas, stream) {
    const doc = new PDFDocument();
    doc.pipe(stream);

    doc.fontSize(18).text('Reporte de Ventas', { align: 'center' });
    doc.moveDown();

    ventas.forEach(v => {
      doc.fontSize(12).text(
        `${v.fecha} - $${v.monto} - ${v.usuario ? v.usuario.nombre : ''}`
      );
      if (v.descripcion) doc.text(`Descripción: ${v.descripcion}`);
      doc.moveDown();
    });

    doc.end();
  }

  // -----------------------------
  // EXCEL: FLUJO DE CAJA
  // -----------------------------
  async generarExcelFlujoCaja(movimientos, stream) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Flujo de Caja');

    sheet.columns = [
      { header: 'Fecha', key: 'fecha', width: 15 },
      { header: 'Tipo', key: 'tipo', width: 10 },
      { header: 'Monto', key: 'monto', width: 15 },
      { header: 'Descripción', key: 'descripcion', width: 40 }
    ];

    movimientos.forEach(m => {
      sheet.addRow({
        fecha: m.fecha,
        tipo: m.tipo,
        monto: m.monto,
        descripcion: m.descripcion || ''
      });
    });

    await workbook.xlsx.write(stream);
  }

  // -----------------------------
  // EXCEL: PRODUCTOS
  // -----------------------------
  async generarExcelProductos(productos, stream) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Productos');

    sheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 25 },
      { header: 'Stock', key: 'stock', width: 10 },
      { header: 'Categoría', key: 'categoria', width: 20 },
      { header: 'Fecha Vencimiento', key: 'fechaVencimiento', width: 20 }
    ];

    productos.forEach(p => {
      sheet.addRow({
        nombre: p.nombre,
        stock: p.stock,
        categoria: p.categoriaNombre || '',
        fechaVencimiento: p.fechaVencimiento || ''
      });
    });

    await workbook.xlsx.write(stream);
  }
}

module.exports = new ReporteService();
