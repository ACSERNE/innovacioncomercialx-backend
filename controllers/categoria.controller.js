async function main() {
const { CategoriaProducto } = require('../models');

// Obtener todas las categorías
exports.getAllCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaProducto.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

// Crear categoría
exports.createCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaProducto.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

// Actualizar categoría
exports.updateCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaProducto.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

    await categoria.update(req.body);
    res.json(categoria);
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error al actualizar categoría' });
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
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};
}
main()
