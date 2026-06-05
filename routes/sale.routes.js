const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authMiddleware');
const controller = require('../controllers/sale.controller');

// Rutas CRUD de ventas
router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

module.exports = router;

