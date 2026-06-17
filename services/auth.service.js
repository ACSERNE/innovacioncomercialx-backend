const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async login(correo, password) {
    const usuario = await db.Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return { error: "Usuario no encontrado" };
    }

    const valido = await bcrypt.compare(password, usuario.password);

    if (!valido) {
      return { error: "Contraseña incorrecta" };
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return { token, usuario };
  }
};
