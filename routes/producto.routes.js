const express = require('express');
const router = express.Router();
const controller = require('../controllers/productoController');
const { validarCrearProducto } = require('../middleware/validators/productoValidator');
const { validationResult } = require('express-validator');

router.post('/', validarCrearProducto, (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });
  next();
}, controller.crear);

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;

// ⚠ RUTA INTERNA
// Clientes y proveedores NO necesitan token público.
// Esta ruta NO debe usarse desde integraciones externas.


/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos (API interna)
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
