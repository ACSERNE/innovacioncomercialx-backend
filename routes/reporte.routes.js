const express = require('express');
const router = express.Router();

const reporteController = require('../controllers/reporte.controller');

router.get('/diario', reporteController.reporteDiario);

module.exports = router;
