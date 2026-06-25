const { CategoriaProducto } = require('../models');

class CategoriasProductoService {
  async crearCategoria(data) {
    return await CategoriaProducto.create(data);
  }

  async obtenerCategorias() {
    return await CategoriaProducto.findAll({
      order: [['nombre', 'ASC']]
    });
  }

  async obtenerCategoriaPorId(id) {
    return await CategoriaProducto.findByPk(id);
  }

  async actualizarCategoria(id, data) {
    const categoria = await CategoriaProducto.findByPk(id);
    if (!categoria) return null;
    await categoria.update(data);
    return categoria;
  }

  async eliminarCategoria(id) {
    const categoria = await CategoriaProducto.findByPk(id);
    if (!categoria) return null;
    await categoria.destroy();
    return true;
  }
}

module.exports = new CategoriasProductoService();
