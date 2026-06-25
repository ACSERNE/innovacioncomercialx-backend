const { FlujoCaja, Transaccion } = require('../models');

class FlujoCajaService {
  async crearMovimiento(data) {
    return await FlujoCaja.create(data);
  }

  async obtenerMovimientos() {
    return await FlujoCaja.findAll({
      include: [{ model: Transaccion, as: 'transaccion' }],
      order: [['fecha', 'DESC']]
    });
  }

  async obtenerMovimientoPorId(id) {
    return await FlujoCaja.findByPk(id, {
      include: [{ model: Transaccion, as: 'transaccion' }]
    });
  }

  async actualizarMovimiento(id, data) {
    const movimiento = await FlujoCaja.findByPk(id);
    if (!movimiento) return null;
    await movimiento.update(data);
    return movimiento;
  }

  async eliminarMovimiento(id) {
    const movimiento = await FlujoCaja.findByPk(id);
    if (!movimiento) return null;
    await movimiento.destroy();
    return true;
  }

  async obtenerResumen() {
    const ingresos = await FlujoCaja.sum('monto', { where: { tipo: 'ingreso' } });
    const egresos = await FlujoCaja.sum('monto', { where: { tipo: 'egreso' } });
    const saldo = (ingresos || 0) - (egresos || 0);
    return { ingresos: ingresos || 0, egresos: egresos || 0, saldo };
  }
}

module.exports = new FlujoCajaService();
