const db = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async flujoDiario() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return db.FlujoCaja.findAll({
      where: {
        createdAt: { [Op.gte]: hoy }
      }
    });
  },

  async flujoMensual() {
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    return db.FlujoCaja.findAll({
      where: {
        createdAt: { [Op.gte]: inicioMes }
      }
    });
  },

  async resumenGeneral() {
    const ingresos = await db.FlujoCaja.sum('monto', { where: { tipo: 'ingreso' } });
    const egresos = await db.FlujoCaja.sum('monto', { where: { tipo: 'egreso' } });

    return {
      total_ingresos: ingresos || 0,
      total_egresos: egresos || 0,
      balance: (ingresos || 0) - (egresos || 0)
    };
  }
};
