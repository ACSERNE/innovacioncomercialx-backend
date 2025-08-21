async function main() {
const express = require('express');
const router = express.Router();
const { Producto, CategoriaProducto } = require('../models');

// Obtener todos los productos con su categoría asociada
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [{
        model: CategoriaProducto,
        as: 'categoria',
        attributes: ['id', 'nombre', 'descripcion'],
      }],
    });
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    // Aquí podrías validar req.body antes de crear
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Obtener producto por ID con su categoría
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [{
        model: CategoriaProducto,
        as: 'categoria',
        attributes: ['id', 'nombre', 'descripcion'],
      }],
    });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Actualizar producto por ID
router.put('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await producto.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
}
main()
