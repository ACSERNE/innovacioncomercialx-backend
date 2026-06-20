const express = require('express');
const router = express.Router();
const reportes = require('../services/productoReportes.service');

router.get('/sin-ventas', async (req, res) => {
  res.json(await reportes.productosSinVentas());
});

router.get('/por-vencer', async (req, res) => {
  res.json(await reportes.productosPorVencer());
});

router.get('/rotacion-lenta', async (req, res) => {
  res.json(await reportes.productosRotacionLenta());
});

module.exports = router;
