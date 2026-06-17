const db = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async productosSinVentas() {
    return db.Producto.findAll({
      include: [{
        model: db.TransaccionDetalle,
        required: false
      }],
      where: {
        '$TransaccionDetalles.id$': null
      }
    });
  },

  async productosPorVencer() {
    const limite = new Date();
    limite.setDate(limite.getDate() + 7);

    return db.Producto.findAll({
      where: {
        fecha_vencimiento: { [Op.lte]: limite }
      }
    });
  },

  async productosRotacionLenta() {
    return db.Producto.findAll({
      include: [{
        model: db.TransaccionDetalle,
        attributes: []
      }],
      attributes: [
        'id',
        'nombre',
        [db.Sequelize.fn('COUNT', db.Sequelize.col('TransaccionDetalles.id')), 'ventas']
      ],
      group: ['Producto.id'],
      order: [[db.Sequelize.literal('ventas'), 'ASC']]
    });
  }
};
