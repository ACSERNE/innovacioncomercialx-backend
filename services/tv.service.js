const db = require('../models');
const { Op, fn, col, literal } = require('sequelize');

module.exports = {
  async obtenerTV() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // 1) Transacciones del día
    const transaccionesHoy = await db.Transaccion.findAll({
      where: { createdAt: { [Op.gte]: hoy } },
      attributes: ['id']
    });

    const ids = transaccionesHoy.map(t => t.id);

    // 2) Productos vendidos
    const productosVendidos = ids.length
      ? await db.TransaccionDetalle.sum('cantidad', {
          where: { TransaccionId: ids }
        })
      : 0;

    // 3) Ventas del día
    const totalVentas = await db.Transaccion.sum('total', {
      where: { createdAt: { [Op.gte]: hoy } }
    });

    const transacciones = transaccionesHoy.length;

    // 4) Últimas transacciones
    const ultimasTransacciones = await db.Transaccion.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: db.Usuario, as: 'Usuario' }]
    });

    // 5) Ranking productos (FIX alias)
    const rankingProductos = ids.length
      ? await db.TransaccionDetalle.findAll({
          where: { TransaccionId: ids },
          attributes: [
            'ProductoId',
            [fn('SUM', col('cantidad')), 'total_vendido']
          ],
          include: [
            { model: db.Producto, as: 'Producto' }   // ✔ FIX
          ],
          group: ['ProductoId', 'Producto.id'],
          order: [[literal('total_vendido'), 'DESC']],
          limit: 5
        })
      : [];

    // 6) Stock crítico
    const stockCritico = await db.Producto.findAll({
      where: { stock: { [Op.lte]: 5 } }
    });

    // 7) Alertas activas
    const alertasActivas = await db.Alerta.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']]
    });

    // 8) Flujo de caja
    const ingresos = await db.FlujoCaja.sum('monto', { where: { tipo: 'ingreso' } });
    const egresos = await db.FlujoCaja.sum('monto', { where: { tipo: 'egreso' } });

    return {
      ventas_dia: {
        total: totalVentas || 0,
        transacciones,
        productos_vendidos: Number(productosVendidos || 0)
      },
      ultimas_transacciones: ultimasTransacciones,
      ranking_productos: rankingProductos,
      stock_critico: stockCritico,
      alertas: alertasActivas,
      flujo: {
        ingresos: ingresos || 0,
        egresos: egresos || 0,
        balance: (ingresos || 0) - (egresos || 0)
      }
    };
  }
};
