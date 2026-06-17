const db = require('../models');
const { fn, col, literal } = require('sequelize');

module.exports = {
  async totalVendidoPorProducto() {
    return db.TransaccionDetalle.findAll({
      attributes: [
        'ProductoId',
        [fn('SUM', col('cantidad')), 'total_cantidad'],
        [fn('SUM', literal('cantidad * precio')), 'total_ingresos']
      ],
      include: [db.Producto],
      group: ['ProductoId', 'Producto.id'],
      order: [[literal('total_ingresos'), 'DESC']]
    });
  },

  async totalVendidoPorUsuario() {
    return db.TransaccionDetalle.findAll({
      attributes: [
        [literal('"Transaccion"."UsuarioId"'), 'UsuarioId'],
        [fn('SUM', col('cantidad')), 'total_cantidad'],
        [fn('SUM', literal('cantidad * precio')), 'total_ingresos']
      ],
      include: [
        {
          model: db.Transaccion,
          attributes: [],
          include: [db.Usuario]
        }
      ],
      group: ['Transaccion.UsuarioId'],
      order: [[literal('total_ingresos'), 'DESC']]
    });
  }
};
