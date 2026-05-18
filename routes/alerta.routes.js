const express = require('express');
const router = express.Router();
const controller = require('../controllers/alerta.controller');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, controller.getAll);

module.exports = router;
