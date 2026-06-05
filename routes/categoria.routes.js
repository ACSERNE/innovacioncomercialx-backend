const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const controller = require('../controllers/categoria.controller');

router.get('/', authenticate, controller.getAll);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

module.exports = router;

