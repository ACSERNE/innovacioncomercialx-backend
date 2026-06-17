const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productoService = require('../services/producto.service');

router.get('/', auth, async (req, res) => {
  res.json(await productoService.listar());
});

router.get('/critico', auth, async (req, res) => {
  res.json(await productoService.stockCritico());
});

router.get('/:id', auth, async (req, res) => {
  res.json(await productoService.obtener(req.params.id));
});

router.post('/', auth, async (req, res) => {
  res.json(await productoService.crear(req.body));
});

router.put('/:id', auth, async (req, res) => {
  res.json(await productoService.actualizar(req.params.id, req.body));
});

router.delete('/:id', auth, async (req, res) => {
  res.json(await productoService.eliminar(req.params.id));
});

module.exports = router;
