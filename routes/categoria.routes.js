const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

// CRUD
router.post('/', categoriaController.crear);
router.get('/', categoriaController.obtenerTodos);
router.get('/:id', categoriaController.obtenerPorId);
router.put('/:id', categoriaController.actualizar);
router.delete('/:id', categoriaController.eliminar);

// Especiales
router.post('/asignar-producto', categoriaController.asignarProducto);
router.get('/:id/productos', categoriaController.productosPorCategoria);

module.exports = router;
