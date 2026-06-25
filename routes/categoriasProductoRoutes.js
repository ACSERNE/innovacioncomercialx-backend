const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriasProductoController');
const { validarCrearCategoria } = require('../middleware/validators/categoriasProductoValidator');
const { validationResult } = require('express-validator');

router.post('/', validarCrearCategoria, (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });
  next();
}, controller.crear);

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
