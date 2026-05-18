const express = require('express');
const router = express.Router();
const controller = require('../controllers/reporte.controller');
const authenticate = require('../middleware/auth');

router.get('/ventas', authenticate, controller.reporteVentas);
router.get('/productos', authenticate, controller.reporteProductos);

module.exports = router;
