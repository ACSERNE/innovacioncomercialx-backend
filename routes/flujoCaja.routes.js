const express = require('express');
const router = express.Router();
const controller = require('../controllers/flujoCajaController');
const { validarMovimientoCaja } = require('../middleware/validators/flujoCajaValidator');
const { validationResult } = require('express-validator');

router.post('/', validarMovimientoCaja, (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });
  next();
}, controller.crear);

router.get('/', controller.listar);
router.get('/resumen', controller.resumen);
router.get('/:id', controller.obtener);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
