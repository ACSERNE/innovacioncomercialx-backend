const db = require('../models');

module.exports = {
  async crearProducto(data) {
    return db.Producto.create(data);
  },

  async obtenerProductos() {
    return db.Producto.findAll({ include: [db.Categoria] });
  },

  async obtenerProductoPorId(id) {
    return db.Producto.findByPk(id, { include: [db.Categoria] });
  },

  async actualizarProducto(id, data) {
    return db.Producto.update(data, { where: { id } });
  },

  async eliminarProducto(id) {
    return db.Producto.destroy({ where: { id } });
  },

  async productosStockBajo(threshold = 5) {
    return db.Producto.findAll({ where: { stock: { [db.Sequelize.Op.lt]: threshold } } });
  },

  async productosMasVendidos() {
    return db.Producto.findAll({
      include: [{
        model: db.TransaccionDetalle,
        attributes: []
      }],
      attributes: [
        'id',
        'nombre',
        [db.Sequelize.fn('SUM', db.Sequelize.col('TransaccionDetalles.cantidad')), 'total_vendido']
      ],
      group: ['Producto.id'],
      order: [[db.Sequelize.literal('total_vendido'), 'DESC']]
    });
  }
};
