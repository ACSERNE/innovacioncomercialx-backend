const express = require('express');
const router = express.Router();
const alertaService = require('../services/alerta.service');

router.get('/', async (req, res) => {
  const alertas = await alertaService.obtenerAlertas();
  res.json(alertas);
});

router.delete('/:id', async (req, res) => {
  const ok = await alertaService.eliminarAlerta(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Alerta no encontrada' });
  res.json({ mensaje: 'Alerta eliminada' });
});

router.delete('/', async (req, res) => {
  await alertaService.eliminarTodas();
  res.json({ mensaje: 'Todas las alertas eliminadas' });
});

module.exports = router;
