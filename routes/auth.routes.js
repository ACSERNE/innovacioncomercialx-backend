// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  try {
    const user = await User.create({
      nombre,
      correo,
      password,   // SIN HASH — el hook del modelo lo hace
      role: rol || 'admin',
      activo: true
    });

    res.status(201).json({ message: 'Usuario creado', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el registro' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'supersecreto',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
