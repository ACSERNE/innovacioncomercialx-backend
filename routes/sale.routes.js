const express = require('express');
const router = express.Router();
const saleController = require('../controllers/sale.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/', authenticate, saleController.createSale);
router.get('/', authenticate, saleController.getSalesBySeller);

module.exports = router;
