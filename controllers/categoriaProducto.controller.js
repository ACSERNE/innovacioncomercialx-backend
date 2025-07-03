const { CategoriaProducto } = require('../models');

// Obtener todas las categorías
exports.getAllCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaProducto.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('❌ Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

// Crear nueva categoría
exports.createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nueva = await CategoriaProducto.create({ nombre });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('❌ Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

// Eliminar categoría
exports.deleteCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaProducto.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

    await categoria.destroy();
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};
