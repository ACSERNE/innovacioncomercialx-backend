const db = require('../models');
const { Op } = require('sequelize');

module.exports = {
  listar() {
    return db.Transaccion.findAll({
      include: [db.Usuario],
      order: [['createdAt', 'DESC']]
    });
  },

  obtener(id) {
    return db.Transaccion.findByPk(id, {
      include: [
        db.Usuario,
        {
          model: db.TransaccionDetalle,
          include: [db.Producto]
        }
      ]
    });
  },

  async crear(data) {
    const { usuarioId, items } = data;

    let total = 0;

    // Calcular total
    for (const item of items) {
      const producto = await db.Producto.findByPk(item.productoId);
      total += producto.precio * item.cantidad;
    }

    // Crear transacción
    const venta = await db.Transaccion.create({
      UsuarioId: usuarioId,
      total
    });

    // Crear detalles + descontar stock
    for (const item of items) {
      const producto = await db.Producto.findByPk(item.productoId);

      await db.TransaccionDetalle.create({
        TransaccionId: venta.id,
        ProductoId: producto.id,
        cantidad: item.cantidad,
        precio_unitario: producto.precio
      });

      await producto.update({
        stock: producto.stock - item.cantidad
      });
    }

    return this.obtener(venta.id);
  }
};
