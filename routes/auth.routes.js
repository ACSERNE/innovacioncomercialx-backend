const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');

// Registro de usuario (abierto)
router.post('/register', authController.register);

// Login inicial (genera código 2FA)
router.post('/login', authController.loginUser);

// Verificar código 2FA y obtener token JWT final
router.post('/verify-2fa', authController.verify2FA);

// Reset de contraseña (solo admin)
router.post('/reset-password', authenticate, isAdmin, authController.resetPassword);

module.exports = router;
