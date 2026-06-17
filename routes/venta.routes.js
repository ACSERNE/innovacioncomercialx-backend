const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ventaService = require('../services/venta.service');

router.get('/', auth, async (req, res) => {
  res.json(await ventaService.listar());
});

router.get('/:id', auth, async (req, res) => {
  res.json(await ventaService.obtener(req.params.id));
});

router.post('/', auth, async (req, res) => {
  res.json(await ventaService.crear(req.body));
});

module.exports = router;
