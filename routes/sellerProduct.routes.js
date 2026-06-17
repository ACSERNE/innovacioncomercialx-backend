const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerProduct.controller');

// Asignar producto a vendedor
router.post('/asignar', sellerController.asignar);

// Obtener productos de un vendedor
router.get('/vendedor/:id', sellerController.productosDeVendedor);

// Obtener vendedores de un producto
router.get('/producto/:id', sellerController.vendedoresDeProducto);

// Eliminar asignación
router.delete('/', sellerController.eliminar);

module.exports = router;
