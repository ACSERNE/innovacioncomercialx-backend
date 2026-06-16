const express = require('express');
const router = express.Router();
const flujoCajaController = require('../controllers/flujoCaja.controller');

router.get('/diario', flujoCajaController.getDiario);

module.exports = router;
