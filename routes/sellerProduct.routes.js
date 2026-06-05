const express = require('express');
const router = express.Router();
const controller = require('../controllers/sellerProduct.controller');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, controller.getAll);
router.post('/', authenticate, controller.create);

module.exports = router;
