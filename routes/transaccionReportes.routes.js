const express = require('express');
const router = express.Router();
const reportes = require('../services/transaccionReportes.service');

router.get('/rango', async (req, res) => {
  const { inicio, fin } = req.query;
  res.json(await reportes.ventasEntreFechas(inicio, fin));
});

router.get('/por-producto', async (req, res) => {
  res.json(await reportes.totalPorProducto());
});

router.get('/por-usuario', async (req, res) => {
  res.json(await reportes.totalPorUsuario());
});

router.get('/ticket-promedio', async (req, res) => {
  res.json({ ticket_promedio: await reportes.ticketPromedio() });
});

router.get('/por-hora', async (req, res) => {
  res.json(await reportes.ventasPorHora());
});

module.exports = router;
