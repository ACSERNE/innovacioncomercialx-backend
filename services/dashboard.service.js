const db = require('../models');
const { Op, fn, col, literal } = require('sequelize');

module.exports = {
  async obtenerDashboard() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    // KPIs del día
    const ventasDia = await db.Transaccion.sum('total', {
      where: { createdAt: { [Op.gte]: hoy } }
    });

    const transaccionesDia = await db.Transaccion.count({
      where: { createdAt: { [Op.gte]: hoy } }
    });

    const productosVendidosDia = await db.TransaccionDetalle.sum('cantidad', {
      include: [{ model: db.Transaccion, where: { createdAt: { [Op.gte]: hoy } } }]
    });

    const ticketPromedioDia = transaccionesDia > 0 ? ventasDia / transaccionesDia : 0;

    // KPIs del mes
    const ventasMes = await db.Transaccion.sum('total', {
      where: { createdAt: { [Op.gte]: inicioMes } }
    });

    const transaccionesMes = await db.Transaccion.count({
      where: { createdAt: { [Op.gte]: inicioMes } }
    });

    const productosVendidosMes = await db.TransaccionDetalle.sum('cantidad', {
      include: [{ model: db.Transaccion, where: { createdAt: { [Op.gte]: inicioMes } } }]
    });

    const ticketPromedioMes = transaccionesMes > 0 ? ventasMes / transaccionesMes : 0;

    // Ranking productos
    const productosMasVendidos = await db.TransaccionDetalle.findAll({
      attributes: [
        'ProductoId',
        [fn('SUM', col('cantidad')), 'total_vendido']
      ],
      include: [db.Producto],
      group: ['ProductoId', 'Producto.id'],
      order: [[literal('total_vendido'), 'DESC']],
      limit: 5
    });

    // Ranking categorías
    const categoriasMasVendidas = await db.TransaccionDetalle.findAll({
      attributes: [
        [literal('"Producto"."CategoriaId"'), 'CategoriaId'],
        [fn('SUM', col('cantidad')), 'total_vendido']
      ],
      include: [
        {
          model: db.Producto,
          include: [db.Categoria]
        }
      ],
      group: ['Producto.CategoriaId', 'Producto.Categoria.id'],
      order: [[literal('total_vendido'), 'DESC']],
      limit: 5
    });

    // Flujo de caja
    const totalIngresos = await db.FlujoCaja.sum('monto', { where: { tipo: 'ingreso' } });
    const totalEgresos = await db.FlujoCaja.sum('monto', { where: { tipo: 'egreso' } });

    // Alertas
    const alertasNoLeidas = await db.Alerta.count({ where: { leida: false } });
    const totalAlertas = await db.Alerta.count();

    return {
      dia: {
        ventas: ventasDia || 0,
        transacciones: transaccionesDia,
        productos_vendidos: productosVendidosDia || 0,
        ticket_promedio: ticketPromedioDia
      },
      mes: {
        ventas: ventasMes || 0,
        transacciones: transaccionesMes,
        productos_vendidos: productosVendidosMes || 0,
        ticket_promedio: ticketPromedioMes
      },
      ranking: {
        productos: productosMasVendidos,
        categorias: categoriasMasVendidas
      },
      flujo: {
        ingresos: totalIngresos || 0,
        egresos: totalEgresos || 0,
        balance: (totalIngresos || 0) - (totalEgresos || 0)
      },
      alertas: {
        no_leidas: alertasNoLeidas,
        total: totalAlertas
      }
    };
  }
};
