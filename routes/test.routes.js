const express = require('express');
const router = express.Router();
const { authenticate, hasRole, refreshTokenIfNeeded } = require('../middleware/auth');

router.use(refreshTokenIfNeeded);

router.get('/public', (req, res) => {
  res.json({ message: 'Ruta pública sin autenticación' });
});

// Ruta protegida, solo usuarios autenticados
router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Acceso concedido', user: req.user });
});

// Ruta protegida para admin
router.get('/admin-only', authenticate, hasRole('admin'), (req, res) => {
  res.json({ message: 'Solo admins pueden ver esto' });
});

module.exports = router;
