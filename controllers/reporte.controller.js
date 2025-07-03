const path = require('path');
const fs = require('fs');
const { exportarAPDF, exportarAExcel } = require('../utils/exportador');
const { Producto } = require('../models'); // ajusta según tus modelos

// Ejemplo: Reporte de productos (puedes cambiar por otro modelo o lógica)
exports.reporteProductos = async (req, res) => {
  try {
    // Obtener datos de productos (solo ejemplo)
    const productos = await Producto.findAll({
      attributes: ['nombre', 'precio', 'stock'],
      raw: true,
    });

    if (!productos.length) {
      return res.status(404).json({ error: 'No hay productos para el reporte' });
    }

    const titulo = 'Reporte de Productos';
    const columnas = ['nombre', 'precio', 'stock'];

    // Generar PDF
    const pdfPath = path.resolve(__dirname, '../exports/reporte-productos.pdf');
    await exportarAPDF(titulo, columnas, productos, pdfPath);

    // Generar Excel
    const excelPath = path.resolve(__dirname, '../exports/reporte-productos.xlsx');
    await exportarAExcel(titulo, columnas, productos, excelPath);

    res.json({
      message: 'Reportes generados exitosamente',
      pdfUrl: '/exports/reporte-productos.pdf',
      excelUrl: '/exports/reporte-productos.xlsx',
    });
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};

// Descargar archivo (pdf o excel)
exports.descargarArchivo = (req, res) => {
  const { tipo } = req.params; // 'pdf' o 'excel'
  const fileMap = {
    pdf: 'reporte-productos.pdf',
    excel: 'reporte-productos.xlsx',
  };
  const filename = fileMap[tipo];

  if (!filename) {
    return res.status(400).json({ error: 'Tipo de archivo no válido' });
  }

  const filePath = path.resolve(__dirname, '../exports', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Archivo no encontrado' });
  }

  res.download(filePath);
};
