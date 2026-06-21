const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');
const { verificarToken } = require('../middleware/auth');
const requiereCorreoVerificado = require('../middleware/requiereCorreoVerificado');

// CRUD protegido
router.post('/', verificarToken, requiereCorreoVerificado, categoriaController.crear);
router.get('/', verificarToken, requiereCorreoVerificado, categoriaController.obtenerTodos);
router.get('/:id', verificarToken, requiereCorreoVerificado, categoriaController.obtenerPorId);
router.put('/:id', verificarToken, requiereCorreoVerificado, categoriaController.actualizar);
router.delete('/:id', verificarToken, requiereCorreoVerificado, categoriaController.eliminar);

// Especiales
router.post('/asignar-producto', verificarToken, requiereCorreoVerificado, categoriaController.asignarProducto);
router.get('/:id/productos', verificarToken, requiereCorreoVerificado, categoriaController.productosPorCategoria);

module.exports = router;
