const express = require('express');
const router = express.Router();
const controller = require('../controllers/reporteController');

// Reporte de ventas
router.get('/ventas/excel', controller.ventasExcel);
router.get('/ventas/pdf', controller.ventasPDF);

// Reporte de flujo de caja
router.get('/flujo-caja/excel', controller.flujoCajaExcel);

// Reporte de productos
router.get('/productos/excel', controller.productosExcel);

module.exports = router;
