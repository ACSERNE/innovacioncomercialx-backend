const db = require('../models');
const { Op, fn, col, literal } = require('sequelize');

module.exports = {
  async ventasEntreFechas(inicio, fin) {
    return db.Transaccion.findAll({
      where: {
        createdAt: { [Op.between]: [inicio, fin] }
      },
      include: [db.Usuario, { model: db.TransaccionDetalle, include: [db.Producto] }]
    });
  },

  async totalPorProducto() {
    return db.TransaccionDetalle.findAll({
      attributes: [
        'ProductoId',
        [fn('SUM', col('cantidad')), 'total_vendido']
      ],
      include: [db.Producto],
      group: ['ProductoId', 'Producto.id'],
      order: [[literal('total_vendido'), 'DESC']]
    });
  },

  async totalPorUsuario() {
    return db.Transaccion.findAll({
      attributes: [
        'UsuarioId',
        [fn('SUM', col('total')), 'total_vendido']
      ],
      include: [db.Usuario],
      group: ['UsuarioId', 'Usuario.id'],
      order: [[literal('total_vendido'), 'DESC']]
    });
  },

  async ticketPromedio() {
    const ventas = await db.Transaccion.findAll();
    const total = ventas.reduce((acc, v) => acc + v.total, 0);
    return ventas.length ? total / ventas.length : 0;
  },

  async ventasPorHora() {
    return db.Transaccion.findAll({
      attributes: [
        [fn('DATE_PART', 'hour', col('createdAt')), 'hora'],
        [fn('COUNT', '*'), 'cantidad']
      ],
      group: [literal('hora')],
      order: [[literal('cantidad'), 'DESC']]
    });
  }
};
