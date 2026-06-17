const db = require('../models');
const { Op, fn, col, literal } = require('sequelize');

module.exports = {
  async obtenerTV() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Ventas del día
    const totalVentas = await db.Transaccion.sum('total', {
      where: { createdAt: { [Op.gte]: hoy } }
    });

    const transacciones = await db.Transaccion.count({
      where: { createdAt: { [Op.gte]: hoy } }
    });

    const productosVendidos = await db.TransaccionDetalle.sum('cantidad', {
      include: [{ model: db.Transaccion, where: { createdAt: { [Op.gte]: hoy } } }]
    });

    // Últimas transacciones
    const ultimasTransacciones = await db.Transaccion.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [db.Usuario]
    });

    // Ranking productos
    const rankingProductos = await db.TransaccionDetalle.findAll({
      attributes: [
        'ProductoId',
        [fn('SUM', col('cantidad')), 'total_vendido']
      ],
      include: [db.Producto],
      group: ['ProductoId', 'Producto.id'],
      order: [[literal('total_vendido'), 'DESC']],
      limit: 5
    });

    // Stock crítico
    const stockCritico = await db.Producto.findAll({
      where: { stock: { [Op.lte]: 5 } }
    });

    // Alertas activas
    const alertasActivas = await db.Alerta.findAll({
      where: { leida: false },
      limit: 10,
      order: [['createdAt', 'DESC']]
    });

    // Flujo de caja
    const ingresos = await db.FlujoCaja.sum('monto', { where: { tipo: 'ingreso' } });
    const egresos = await db.FlujoCaja.sum('monto', { where: { tipo: 'egreso' } });

    return {
      ventas_dia: {
        total: totalVentas || 0,
        transacciones,
        productos_vendidos: productosVendidos || 0
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
