const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccion.controller');

// Registrar venta
router.post('/', transaccionController.registrar);

// Obtener todas
router.get('/', transaccionController.obtenerTodas);

// Reportes
router.get('/reportes/dia', transaccionController.ventasDelDia);
router.get('/reportes/mes', transaccionController.ventasDelMes);
router.get('/usuario/:id', transaccionController.ventasPorUsuario);
router.get('/producto/:id', transaccionController.ventasPorProducto);

module.exports = router;
