const db = require('../models');

module.exports = {
  async registrarVenta({ productos, UsuarioId }) {

    if (!Array.isArray(productos)) {
      throw new Error("El campo 'productos' debe ser un array");
    }

    let total = 0;

    for (const p of productos) {
      const producto = await db.Producto.findByPk(p.ProductoId);
      if (!producto) throw new Error("Producto no encontrado");

      total += producto.precio * p.cantidad;

      await db.TransaccionDetalle.create({
        ProductoId: p.ProductoId,
        CategoriaId: producto.CategoriaId,
        cantidad: p.cantidad,
        precio: producto.precio
      });
    }

    const transaccion = await db.Transaccion.create({
      UsuarioId,
      total
    });

    return transaccion;
  }
};
