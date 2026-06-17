const express = require('express');
const router = express.Router();
const reportes = require('../services/detalleReportes.service');

router.get('/por-producto', async (req, res) => {
  res.json(await reportes.totalVendidoPorProducto());
});

router.get('/por-usuario', async (req, res) => {
  res.json(await reportes.totalVendidoPorUsuario());
});

module.exports = router;
