const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authMiddleware');
const flujoCajaController = require('../controllers/flujoCaja.controller');

router.get('/diario', authenticate, flujoCajaController.flujoCajaDiario);

module.exports = router;

