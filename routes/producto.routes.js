const express = require('express');
const router = express.Router();

const productoController = require('../controllers/producto.controller'); 
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, productoController.crearProducto);
router.get('/', authenticate, productoController.obtenerProductos);
router.get('/:id', authenticate, productoController.obtenerProducto);
router.put('/:id', authenticate, productoController.actualizarProducto);
router.delete('/:id', authenticate, productoController.eliminarProducto);

module.exports = router;

