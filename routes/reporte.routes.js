const express = require('express');
const router = express.Router();

const reporteController = require('../controllers/reporte.controller');

// Generar reportes PDF y Excel para productos
router.get('/productos', reporteController.reporteProductos);

// Descargar archivo PDF o Excel
router.get('/descargar/:tipo', reporteController.descargarArchivo);

module.exports = router;
