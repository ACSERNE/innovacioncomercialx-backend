const express = require('express');
const router = express.Router();
const reportes = require('../services/flujoReportes.service');

router.get('/diario', async (req, res) => {
  res.json(await reportes.flujoDiario());
});

router.get('/mensual', async (req, res) => {
  res.json(await reportes.flujoMensual());
});

router.get('/resumen', async (req, res) => {
  res.json(await reportes.resumenGeneral());
});

module.exports = router;
