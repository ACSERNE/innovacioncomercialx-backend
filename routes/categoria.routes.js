const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

// Obtener todas las categorías
router.get('/', categoriaController.getAllCategorias);

// Crear nueva categoría
router.post('/', categoriaController.createCategoria);

// Actualizar categoría por ID
router.put('/:id', categoriaController.updateCategoria);

// Eliminar categoría por ID
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;
