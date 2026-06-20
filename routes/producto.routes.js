const express = require('express');
const router = express.Router();
const { Producto, Categoria } = require('../models');

// ===============================
// GET /api/productos
// ===============================
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        {
          model: Categoria,
          as: 'Categoria'   // ← ALIAS CORRECTO (OBLIGATORIO)
        }
      ]
    });

    res.json(productos);
  } catch (error) {
    console.error('ERROR EN GET /api/productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// ===============================
// POST /api/productos
// ===============================
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, CategoriaId } = req.body;

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
