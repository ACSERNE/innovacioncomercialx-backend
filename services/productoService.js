const { Producto, CategoriaProducto } = require('../models');

class ProductoService {
  async crearProducto(data) {
    return await Producto.create(data);
  }

  async obtenerProductos() {
    return await Producto.findAll({
      include: [{ model: CategoriaProducto, as: 'categoria' }],
      order: [['nombre', 'ASC']]
    });
  }

  async obtenerProductoPorId(id) {
    return await Producto.findByPk(id, {
      include: [{ model: CategoriaProducto, as: 'categoria' }]
    });
  }

  async actualizarProducto(id, data) {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
    await producto.update(data);
    return producto;
  }

  async eliminarProducto(id) {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
    await producto.destroy();
    return true;
  }
}

module.exports = new ProductoService();
