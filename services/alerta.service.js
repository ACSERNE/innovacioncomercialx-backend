const db = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async generarAlertasStockBajo() {
    const productos = await db.Producto.findAll({
      where: { stock: { [Op.lte]: 5 } }
    });

    for (const p of productos) {
      await db.Alerta.create({
        tipo: 'stock_bajo',
        mensaje: `Stock bajo: ${p.nombre} (${p.stock})`,
        ProductoId: p.id
      });
    }

    console.log('⏰ CRON: Alertas de stock bajo generadas');
  },

  async generarAlertasVencimiento() {
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 7);

    const productos = await db.Producto.findAll({
      where: {
        fechaVencimiento: { [Op.between]: [hoy, limite] }
      }
    });

    for (const p of productos) {
      await db.Alerta.create({
        tipo: 'vencimiento',
        mensaje: `Producto por vencer: ${p.nombre}`,
        ProductoId: p.id
      });
    }

    console.log('⏰ CRON: Alertas de vencimiento generadas');
  },

  async generarAlertasVentasDia() {
    await db.Alerta.create({
      tipo: 'ventas_dia',
      mensaje: 'Resumen de ventas del día generado automáticamente'
    });

    console.log('⏰ CRON: Alerta de ventas del día generada');
  }
};
