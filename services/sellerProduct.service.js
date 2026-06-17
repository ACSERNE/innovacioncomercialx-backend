const db = require('../models');

module.exports = {
  async asignarProducto(usuarioId, productoId) {
    const usuario = await db.Usuario.findByPk(usuarioId);
    const producto = await db.Producto.findByPk(productoId);

    if (!usuario || !producto) return null;

    await usuario.addProducto(producto);
    return { mensaje: 'Producto asignado al vendedor' };
  },

  async obtenerProductosDeVendedor(usuarioId) {
    return db.Usuario.findByPk(usuarioId, {
      include: [db.Producto]
    });
  },

  async obtenerVendedoresDeProducto(productoId) {
    return db.Producto.findByPk(productoId, {
      include: [db.Usuario]
    });
  },

  async eliminarAsignacion(usuarioId, productoId) {
    return db.SellerProduct.destroy({
      where: { UsuarioId: usuarioId, ProductoId: productoId }
    });
  }
};
