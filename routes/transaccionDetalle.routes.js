const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/transaccionDetalle.controller');

// CRUD básico
router.get('/', detalleController.obtenerTodos);
router.get('/:id', detalleController.obtenerPorId);
router.delete('/:id', detalleController.eliminar);

// Especiales
router.get('/transaccion/:id', detalleController.obtenerPorTransaccion);
router.get('/producto/:id', detalleController.obtenerPorProducto);

module.exports = router;
