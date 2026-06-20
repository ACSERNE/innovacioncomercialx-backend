const db = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async registrarIngreso(monto, descripcion = '') {
    return db.FlujoCaja.create({
      tipo: 'ingreso',
      monto,
      descripcion
    });
  },

  async registrarEgreso(monto, descripcion = '') {
    return db.FlujoCaja.create({
      tipo: 'egreso',
      monto,
      descripcion
    });
  },

  async obtenerTodos() {
    return db.FlujoCaja.findAll();
  },

  async balanceDiario() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const movimientos = await db.FlujoCaja.findAll({
      where: { createdAt: { [Op.gte]: hoy } }
    });

    let ingresos = 0;
    let egresos = 0;

    movimientos.forEach(m => {
      if (m.tipo === 'ingreso') ingresos += m.monto;
      else egresos += m.monto;
    });

    return { ingresos, egresos, balance: ingresos - egresos };
  },

  async balanceMensual() {
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const movimientos = await db.FlujoCaja.findAll({
      where: { createdAt: { [Op.gte]: inicioMes } }
    });

    let ingresos = 0;
    let egresos = 0;

    movimientos.forEach(m => {
      if (m.tipo === 'ingreso') ingresos += m.monto;
      else egresos += m.monto;
    });

    return { ingresos, egresos, balance: ingresos - egresos };
  }
};
