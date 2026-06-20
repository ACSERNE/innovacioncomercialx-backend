const { Producto, Transaccion, TransaccionDetalle, Usuario } = require('../models');

module.exports = {
  registrarVenta: async (usuarioId, productos) => {

    // Validación correcta del array
    if (!Array.isArray(productos) || productos.length === 0) {
      throw new Error("El campo 'productos' debe ser un array");
    }

    // Validar usuario
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    let total = 0;

    // Validar productos y calcular total
    for (const item of productos) {
      const producto = await Producto.findByPk(item.id);

      if (!producto) {
        throw new Error("Producto no encontrado");
      }

      if (producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${producto.nombre}`);
      }

      total += producto.precio * item.cantidad;
    }

    // Crear transacción
    const transaccion = await Transaccion.create({
      UsuarioId: usuarioId,
      total
    });

    // Crear detalles y actualizar stock
    for (const item of productos) {
      const producto = await Producto.findByPk(item.id);

      await TransaccionDetalle.create({
        TransaccionId: transaccion.id,
        ProductoId: producto.id,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
        subtotal: producto.precio * item.cantidad
      });

      // Actualizar stock
      producto.stock -= item.cantidad;
      await producto.save();
    }

    return transaccion;
  }
};
