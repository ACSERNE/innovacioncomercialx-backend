// controllers/producto.controller.js
const { Producto, Categoria } = require('../models');

exports.crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio_unitario, stock, categoriaId } = req.body;

    // Validar categoría
    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Crear producto
    const producto = await Producto.create({
      nombre,
      descripcion,
      precio_unitario,
      precio_total: precio_unitario * stock,
      stock,
      categoriaId
    });

    res.status(201).json(producto);

  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [{ model: Categoria, as: 'categoria' }]
    });
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [{ model: Categoria, as: 'categoria' }]
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);

  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { precio_unitario, stock } = req.body;

    await producto.update({
      ...req.body,
      precio_unitario: precio_unitario ?? producto.precio_unitario,
      precio_total: (precio_unitario ?? producto.precio_unitario) * (stock ?? producto.stock)
    });

    res.json(producto);

  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado' });

  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

