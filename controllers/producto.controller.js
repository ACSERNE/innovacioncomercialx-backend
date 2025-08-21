async function main() {
const { Producto, CategoriaProducto } = require('../models');

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: { model: CategoriaProducto, as: 'categoria' },
    });
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: { model: CategoriaProducto, as: 'categoria' },
    });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear un nuevo producto con validación de categoriaId
exports.createProducto = async (req, res) => {
  try {
    const { categoriaId } = req.body;

    // Validar que categoria exista
    const categoria = await CategoriaProducto.findByPk(categoriaId);
    if (!categoria) {
      return res.status(400).json({ error: 'Categoría no existe' });
    }

    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: error.message || 'Error al crear producto' });
  }
};

// Actualizar producto
exports.updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    if (req.body.categoriaId) {
      const categoria = await CategoriaProducto.findByPk(req.body.categoriaId);
      if (!categoria) {
        return res.status(400).json({ error: 'Categoría no existe' });
      }
    }

    await producto.update(req.body);
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar producto
exports.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.destroy();
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
}
main()
