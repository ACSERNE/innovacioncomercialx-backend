const { Alerta, Producto } = require('../models');
const { Op } = require('sequelize');

class AlertaService {
  async crearAlerta(tipo, mensaje, ProductoId = null) {
    return await Alerta.create({ tipo, mensaje, ProductoId });
  }

  async existeAlertaActiva(tipo, ProductoId) {
    return await Alerta.findOne({
      where: {
        tipo,
        ProductoId,
        createdAt: {
          [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    });
  }

  async limpiarAlertasViejas() {
    return await Alerta.destroy({
      where: {
        createdAt: {
          [Op.lt]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    });
  }

  async obtenerAlertas() {
    return await Alerta.findAll({
      include: [{ model: Producto, as: 'producto' }],
      order: [['createdAt', 'DESC']]
    });
  }

  async eliminarAlerta(id) {
    const alerta = await Alerta.findByPk(id);
    if (!alerta) return null;
    await alerta.destroy();
    return true;
  }

  async eliminarTodas() {
    return await Alerta.destroy({ where: {} });
  }
}

module.exports = new AlertaService();

// Emitir alerta en vivo
const emitter = require('../socket/emitter');
emitter.emitirAlerta(nuevaAlerta);


// Enviar alerta crítica por correo
const emailService = require('./emailService');
if (nuevaAlerta.tipo === 'critica') {
  emailService.enviarAlertaCritica(nuevaAlerta);
}

