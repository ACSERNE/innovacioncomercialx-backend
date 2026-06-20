const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async crearUsuario(data) {
    const hashed = await bcrypt.hash(data.password, 10);
    return db.Usuario.create({ ...data, password: hashed });
  },

  async obtenerUsuarios() {
    return db.Usuario.findAll();
  },

  async obtenerUsuarioPorId(id) {
    return db.Usuario.findByPk(id);
  },

  async actualizarUsuario(id, data) {
    return db.Usuario.update(data, { where: { id } });
  },

  async eliminarUsuario(id) {
    return db.Usuario.destroy({ where: { id } });
  },

  async login(correo, password) {
    const usuario = await db.Usuario.findOne({ where: { correo } });
    if (!usuario) return null;

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return null;

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { usuario, token };
  },

  async ventasPorUsuario(id) {
    return db.Transaccion.findAll({
      where: { UsuarioId: id },
      include: [{ model: db.TransaccionDetalle, include: [db.Producto] }]
    });
  }
};
