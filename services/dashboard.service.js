const db = require('../models');
const { Op, fn, col } = require('sequelize');

module.exports = {
  async obtenerDashboard() {
    console.log("DEBUG: obtenerDashboard() llamado");

    const hoy = new Date();
    const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));

    // 1) Transacciones del día
    const transaccionesDia = await db.Transaccion.findAll({
      where: { createdAt: { [Op.gte]: inicioDia } },
      attributes: ['id', 'total']
    });

    const cantidadTransaccionesDia = transaccionesDia.length;

    const totalVentasDia = transaccionesDia.reduce(
      (acc, t) => acc + Number(t.total || 0),
      0
    );

    // Ticket promedio corregido
    const ticketPromedioDia =
      cantidadTransaccionesDia > 0
        ? Number((totalVentasDia / cantidadTransaccionesDia).toFixed(2))
        : 0;

    // 2) Productos vendidos del día
    const idsTransaccionesDia = transaccionesDia.map(t => t.id);

    const productosVendidosDia = idsTransaccionesDia.length
      ? await db.TransaccionDetalle.sum('cantidad', {
          where: { TransaccionId: idsTransaccionesDia }
        })
      : 0;

    // 3) Top productos del día
    const topProductosDia = idsTransaccionesDia.length
      ? await db.TransaccionDetalle.findAll({
          where: { TransaccionId: idsTransaccionesDia },
          attributes: [
            'ProductoId',
            [fn('sum', col('cantidad')), 'cantidadVendida']
          ],
          include: [
            { model: db.Producto, as: 'Producto' }
          ],
          group: ['ProductoId', 'Producto.id'],
          order: [[fn('sum', col('cantidad')), 'DESC']],
          limit: 5
        })
      : [];

    // 4) Top categorías del día
    const topCategoriasDia = idsTransaccionesDia.length
      ? await db.TransaccionDetalle.findAll({
          where: { TransaccionId: idsTransaccionesDia },
          attributes: [
            'CategoriaId',
            [fn('sum', col('cantidad')), 'cantidadVendida']
          ],
          include: [
            { model: db.Categoria, as: 'Categoria' }
          ],
          group: ['CategoriaId', 'Categoria.id'],
          order: [[fn('sum', col('cantidad')), 'DESC']],
          limit: 5
        })
      : [];

    return {
      productosVendidosDia: Number(productosVendidosDia || 0),
      totalVentasDia: Number(totalVentasDia || 0),
      ticketPromedioDia: Number(ticketPromedioDia || 0),
      cantidadTransaccionesDia,
      topProductosDia,
      topCategoriasDia
    };
  }
};
