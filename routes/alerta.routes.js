const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alerta.controller');

// CRUD
router.post('/', alertaController.crear);
router.get('/', alertaController.obtener);
router.get('/activas', alertaController.obtenerActivas);
router.put('/:id/leida', alertaController.marcarLeida);

// Generadores automáticos
router.post('/generar/stock', alertaController.generarStock);
router.post('/generar/vencimiento', alertaController.generarVencimiento);
router.post('/generar/ventas-dia', alertaController.generarVentasDia);

module.exports = router;
