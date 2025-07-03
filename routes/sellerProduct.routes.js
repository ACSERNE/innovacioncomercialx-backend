const express = require('express');
const router = express.Router();
const sellerProductController = require('../controllers/sellerProduct.controller');
const { authenticate } = require('../middleware/auth.middleware');

// Todas las rutas protegidas: solo vendedores autenticados
router.use(authenticate);

router.post('/', sellerProductController.createSellerProduct);
router.get('/', sellerProductController.getSellerProducts);

module.exports = router;
