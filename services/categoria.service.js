const db = require('../models');

module.exports = {
  async crearCategoria(data) {
    return db.Categoria.create(data);
  },

  async obtenerCategorias() {
    return db.Categoria.findAll({
      include: [{ model: db.Producto }]
    });
  },

  async obtenerCategoriaPorId(id) {
    return db.Categoria.findByPk(id, {
      include: [{ model: db.Producto }]
    });
  },

  async actualizarCategoria(id, data) {
    return db.Categoria.update(data, { where: { id } });
  },

  async eliminarCategoria(id) {
    return db.Categoria.destroy({ where: { id } });
  },

  async asignarProducto(categoriaId, productoId) {
    const categoria = await db.Categoria.findByPk(categoriaId);
    const producto = await db.Producto.findByPk(productoId);

    if (!categoria || !producto) return null;

    await categoria.addProducto(producto);
    return { mensaje: 'Producto asignado a categoría' };
  },

  async productosPorCategoria(id) {
    return db.Producto.findAll({
      include: [{
        model: db.Categoria,
        where: { id }
      }]
    });
  }
};
