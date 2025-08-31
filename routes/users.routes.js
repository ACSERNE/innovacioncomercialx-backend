const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { nombre, correo, password } = req.body;
  res.json({ id: 1, nombre, correo, mensaje: 'Usuario creado correctamente' });
});

router.post('/login', (req, res) => {
  const { correo, password } = req.body;
  res.json({ token: 'token_simulado_123' });
});

module.exports = router;
