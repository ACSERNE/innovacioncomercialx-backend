async function main() {
const { Producto } = require('../models');
const { Op } = require('sequelize');
const { exportarReportePDF, exportarReporteExcel } = require('../utils/exportador');

const STOCK_MINIMO = 10; // Ajusta este valor según tu negocio
const DIAS_VENCIMIENTO = 7; // Productos que vencen en menos de 7 días

// Listar productos con stock bajo
exports.productosStockBajo = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: {
        stock: { [Op.lt]: STOCK_MINIMO },
      },
    });
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos con stock bajo:', error);
    res.status(500).json({ error: 'Error en servidor' });
  }
};

// Listar productos próximos a vencer
exports.productosProximosAVencer = async (req, res) => {
  try {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + DIAS_VENCIMIENTO);

    const productos = await Producto.findAll({
      where: {
        fecha_vencimiento: {
          [Op.lte]: fechaLimite,
          [Op.gte]: new Date()
        },
      },
    });
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos próximos a vencer:', error);
    res.status(500).json({ error: 'Error en servidor' });
  }
};

// Exportar alertas en PDF o Excel
exports.exportarAlertas = async (req, res) => {
  try {
    const { tipo } = req.query; // 'pdf' o 'excel'

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + DIAS_VENCIMIENTO);

    const productosStockBajo = await Producto.findAll({
      where: { stock: { [Op.lt]: STOCK_MINIMO } },
    });

    const productosVencimiento = await Producto.findAll({
      where: {
        fecha_vencimiento: {
          [Op.lte]: fechaLimite,
          [Op.gte]: new Date()
        },
      },
    });

    const data = {
      stockBajo: productosStockBajo.map(p => p.toJSON()),
      proximosVencer: productosVencimiento.map(p => p.toJSON())
    };

    if (tipo === 'pdf') {
      const buffer = await exportarReportePDF(data);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=alertas.pdf');
      return res.send(buffer);
    } else if (tipo === 'excel') {
      const buffer = await exportarReporteExcel(data);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=alertas.xlsx');
      return res.send(buffer);
    } else {
      return res.status(400).json({ error: 'Tipo de exportación no válido' });
    }
  } catch (error) {
    console.error('Error al exportar alertas:', error);
    res.status(500).json({ error: 'Error en servidor' });
  }
};
}
main()
