const { Transaccion, Usuario } = require('../models');

class TransaccionService {
  async crearTransaccion(data) {
    return await Transaccion.create(data);
  }

  async obtenerTransacciones() {
    return await Transaccion.findAll({
      include: [{ model: Usuario, as: 'usuario' }],
      order: [['fecha', 'DESC']]
    });
  }

  async obtenerTransaccionPorId(id) {
    return await Transaccion.findByPk(id, {
      include: [{ model: Usuario, as: 'usuario' }]
    });
  }

  async actualizarTransaccion(id, data) {
    const transaccion = await Transaccion.findByPk(id);
    if (!transaccion) return null;
    await transaccion.update(data);
    return transaccion;
  }

  async eliminarTransaccion(id) {
    const transaccion = await Transaccion.findByPk(id);
    if (!transaccion) return null;
    await transaccion.destroy();
    return true;
  }
}

module.exports = new TransaccionService();
