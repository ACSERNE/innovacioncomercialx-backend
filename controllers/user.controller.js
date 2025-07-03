const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('user.controller.js cargado');

// Obtener todos los usuarios (sin password)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener usuario por ID (sin password)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear usuario (hash de password)
exports.createUser = async (req, res) => {
  try {
    const { nombre, correo, password, role } = req.body;
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ nombre, correo, password: hashedPassword, role });

    const userData = { ...user.toJSON() };
    delete userData.password;

    res.status(201).json(userData);
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { nombre, correo, password, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const updatedFields = { nombre, correo, role };
    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    await user.update(updatedFields);

    const updatedUser = user.toJSON();
    delete updatedUser.password;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Suspender o reactivar usuario (solo admin)
exports.toggleUserStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para suspender/reactivar usuarios' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'No puedes suspender/reactivar tu propia cuenta' });
    }

    user.activo = !user.activo;
    await user.save();

    res.status(200).json({
      message: `Usuario ${user.activo ? 'reactivado' : 'suspendido'} correctamente`,
      user: { id: user.id, nombre: user.nombre, correo: user.correo, activo: user.activo }
    });
  } catch (error) {
    console.error('❌ Error al suspender/reactivar usuario:', error);
    res.status(500).json({ error: 'Error en la operación' });
  }
};

// Eliminar usuario (solo admin)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para eliminar usuarios' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'No puedes eliminar tu propia cuenta' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

// Login usuario con bcrypt y JWT
exports.loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    const user = await User.findOne({ where: { correo } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar password con bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (user.activo === false) {
      return res.status(403).json({ error: 'Usuario suspendido, no puede iniciar sesión' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, correo: user.correo, role: user.role },
      process.env.JWT_SECRET || 'supersecreto123',
      { expiresIn: '2h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
