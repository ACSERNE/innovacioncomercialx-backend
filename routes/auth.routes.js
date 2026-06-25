const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Login
router.post('/login', controller.login);

// Asignar rol (solo admin)
router.post('/asignar-rol', auth, roles(['admin']), controller.asignarRol);

module.exports = router;
