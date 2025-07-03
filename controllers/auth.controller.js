const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const jwtSecret = process.env.JWT_SECRET || 'supersecreto123';
const jwtExpiresIn = '1d'; // duración del token

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // Validar campos básicos
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Verificar si ya existe el correo
    const existingUser = await User.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Crear usuario (el hook de Sequelize hará el hash)
    const user = await User.create({ nombre, correo, password });

    // Generar token
    const token = jwt.sign({ id: user.id, correo: user.correo, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });

    res.status(201).json({ user: { id: user.id, nombre: user.nombre, correo: user.correo }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    const user = await User.findOne({ where: { correo } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar contraseña
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, correo: user.correo, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });

    res.json({ user: { id: user.id, nombre: user.nombre, correo: user.correo }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el login' });
  }
};
