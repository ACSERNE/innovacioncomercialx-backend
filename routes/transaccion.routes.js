const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaccion.controller');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, controller.getAll);
router.post('/', authenticate, controller.create);

module.exports = router;
