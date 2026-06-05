const express = require('express');
const router = express.Router();

const transaccionController = require('../controllers/transaccion.controller');
const { authenticate } = require('../middleware/authMiddleware');

// Crear transacción
router.post('/', authenticate, transaccionController.crearTransaccion);

// Listar transacciones
router.get('/', authenticate, transaccionController.listarTransacciones);

module.exports = router;

