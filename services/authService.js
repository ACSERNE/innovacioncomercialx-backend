const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Role } = require('../models');

class AuthService {

  async login(email, password) {
    const usuario = await Usuario.findOne({
      where: { email },
      include: [{ model: Role, as: 'roles' }]
    });

    if (!usuario) return null;

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return null;

    const roles = usuario.roles.map(r => r.nombre);

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        roles
      },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '8h' }
    );

    return { token, usuario, roles };
  }

  async asignarRol(usuarioId, roleId) {
    const usuario = await Usuario.findByPk(usuarioId);
    const role = await Role.findByPk(roleId);

    if (!usuario || !role) return null;

    await usuario.addRole(role);
    return true;
  }
}

module.exports = new AuthService();
