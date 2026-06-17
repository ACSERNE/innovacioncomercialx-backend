const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// CRUD
router.post('/', productoController.crear);
router.get('/', productoController.obtenerTodos);
router.get('/:id', productoController.obtenerPorId);
router.put('/:id', productoController.actualizar);
router.delete('/:id', productoController.eliminar);

// Especiales
router.get('/reportes/stock-bajo', productoController.stockBajo);
router.get('/reportes/mas-vendidos', productoController.masVendidos);

module.exports = router;
