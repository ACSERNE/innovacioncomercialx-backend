const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  res.json(await db.Alerta.findAll({ include: db.Producto }));
});

router.get('/no-leidas', async (req, res) => {
  res.json(await db.Alerta.findAll({ where: { leida: false } }));
});

router.put('/:id/leida', async (req, res) => {
  const alerta = await db.Alerta.findByPk(req.params.id);
  if (!alerta) return res.status(404).json({ error: 'No encontrada' });

  alerta.leida = true;
  await alerta.save();

  res.json({ mensaje: 'Alerta marcada como leída' });
});

router.delete('/:id', async (req, res) => {
  await db.Alerta.destroy({ where: { id: req.params.id } });
  res.json({ mensaje: 'Alerta eliminada' });
});

module.exports = router;
