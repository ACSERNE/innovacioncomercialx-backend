const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, nombre: 'Producto demo', precio: 100, stock: 10 }]);
});

router.post('/', (req, res) => {
  const { nombre, precio, stock } = req.body;
  res.json({ id: 2, nombre, precio, stock, mensaje: 'Producto creado' });
});

module.exports = router;
