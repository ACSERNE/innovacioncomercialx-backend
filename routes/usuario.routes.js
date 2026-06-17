const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// CRUD
router.post('/', usuarioController.crear);
router.get('/', usuarioController.obtenerTodos);
router.get('/:id', usuarioController.obtenerPorId);
router.put('/:id', usuarioController.actualizar);
router.delete('/:id', usuarioController.eliminar);

// Auth
router.post('/login', usuarioController.login);

// Ventas por usuario
router.get('/:id/ventas', usuarioController.ventasPorUsuario);

module.exports = router;
