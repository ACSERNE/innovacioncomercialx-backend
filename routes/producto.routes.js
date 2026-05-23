const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth');
const controller = require('../controllers/producto.controller');

// Rutas CRUD de productos
router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

module.exports = router;

