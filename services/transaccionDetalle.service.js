const db = require('../models');

module.exports = {
  async obtenerDetalles() {
    return db.TransaccionDetalle.findAll({
      include: [db.Producto, db.Transaccion]
    });
  },

  async obtenerPorId(id) {
    return db.TransaccionDetalle.findByPk(id, {
      include: [db.Producto, db.Transaccion]
    });
  },

  async obtenerPorTransaccion(transaccionId) {
    return db.TransaccionDetalle.findAll({
      where: { TransaccionId: transaccionId },
      include: [db.Producto]
    });
  },

  async obtenerPorProducto(productoId) {
    return db.TransaccionDetalle.findAll({
      where: { ProductoId: productoId },
      include: [
        db.Producto,
        { model: db.Transaccion, include: [db.Usuario] }
      ]
    });
  },

  async eliminar(id) {
    return db.TransaccionDetalle.destroy({ where: { id } });
  }
};
