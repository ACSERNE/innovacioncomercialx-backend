const db = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async registrarVenta({ usuarioId, productos }) {
    let total = 0;

    // Calcular total
    for (const p of productos) {
      const prod = await db.Producto.findByPk(p.id);
      if (!prod) throw new Error(`Producto ${p.id} no existe`);
      if (prod.stock < p.cantidad) throw new Error(`Stock insuficiente para ${prod.nombre}`);

      total += prod.precio * p.cantidad;
    }

    // Crear transacción
    const venta = await db.Transaccion.create({
      UsuarioId: usuarioId,
      total
    });

    // Crear detalles y descontar stock
    for (const p of productos) {
      const prod = await db.Producto.findByPk(p.id);

      await db.TransaccionDetalle.create({
        TransaccionId: venta.id,
        ProductoId: prod.id,
        cantidad: p.cantidad,
        precio: prod.precio
      });

      await prod.update({ stock: prod.stock - p.cantidad });
    }

    return venta;
  },

  async ventasDelDia() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return db.Transaccion.findAll({
      where: { createdAt: { [Op.gte]: hoy } },
      include: [{ model: db.Usuario }]
    });
  },

  async ventasDelMes() {
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    return db.Transaccion.findAll({
      where: { createdAt: { [Op.gte]: inicioMes } },
      include: [{ model: db.Usuario }]
    });
  },

  async ventasPorUsuario(usuarioId) {
    return db.Transaccion.findAll({
      where: { UsuarioId: usuarioId },
      include: [{ model: db.TransaccionDetalle, include: [db.Producto] }]
    });
  },

  async ventasPorProducto(productoId) {
    return db.TransaccionDetalle.findAll({
      where: { ProductoId: productoId },
      include: [
        db.Producto,
        { model: db.Transaccion, include: [db.Usuario] }
      ]
    });
  },

  async obtenerTodas() {
    return db.Transaccion.findAll({
      include: [
        db.Usuario,
        { model: db.TransaccionDetalle, include: [db.Producto] }
      ]
    });
  }
};
