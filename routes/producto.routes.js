const express = require('express');
const router = express.Router();
const { Producto, Categoria } = require('../models');
const { verificarToken } = require('../middleware/auth');
const requiereCorreoVerificado = require('../middleware/requiereCorreoVerificado');

// ===============================
// GET /api/productos
// ===============================
router.get('/', verificarToken, requiereCorreoVerificado, async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [{ model: Categoria, as: 'Categoria' }]
    });

    res.json(productos);
  } catch (error) {
    console.error('ERROR EN GET /api/productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// ===============================
// GET /api/productos/:id
// ===============================
router.get('/:id', verificarToken, requiereCorreoVerificado, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [{ model: Categoria, as: 'Categoria' }]
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('ERROR EN GET /api/productos/:id:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// ===============================
// POST /api/productos
// ===============================
router.post('/', verificarToken, requiereCorreoVerificado, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, CategoriaId } = req.body;

    if (!CategoriaId) {
      return res.status(400).json({ error: 'CategoriaId es obligatorio' });
    }

    const categoria = await Categoria.findByPk(CategoriaId);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      CategoriaId
    });

    res.json(nuevoProducto);
  } catch (error) {
    console.error('ERROR EN POST /api/productos:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

module.exports = router;
