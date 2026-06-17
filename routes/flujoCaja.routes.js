const express = require('express');
const router = express.Router();
const flujoController = require('../controllers/flujoCaja.controller');

// Registrar movimientos
router.post('/ingreso', flujoController.registrarIngreso);
router.post('/egreso', flujoController.registrarEgreso);

// Obtener movimientos
router.get('/', flujoController.obtenerTodos);

// Reportes
router.get('/balance/dia', flujoController.balanceDiario);
router.get('/balance/mes', flujoController.balanceMensual);

module.exports = router;
