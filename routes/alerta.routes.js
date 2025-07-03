const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alerta.controller');

// Obtener productos con stock bajo
router.get('/stock-bajo', alertaController.productosStockBajo);

// Obtener productos próximos a vencer
router.get('/proximos-vencer', alertaController.productosProximosAVencer);

// Exportar alertas (pdf o excel) con query param ?tipo=pdf o ?tipo=excel
router.get('/exportar', alertaController.exportarAlertas);

module.exports = router;
