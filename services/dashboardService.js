const { Transaccion, FlujoCaja, Producto, Alerta, Usuario } = require('../models');
const { Op, fn, col } = require('sequelize');

class DashboardService {

  async obtenerDashboard() {
    const hoy = new Date();
    const inicioDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    // -----------------------------
    // VENTAS DEL DÍA
    // -----------------------------
    const ventasHoy = await Transaccion.sum('monto', {
      where: {
        tipo: 'venta',
        fecha: { [Op.gte]: inicioDia }
      }
    }) || 0;

    // -----------------------------
    // VENTAS DEL MES
    // -----------------------------
    const ventasMes = await Transaccion.sum('monto', {
      where: {
        tipo: 'venta',
        fecha: { [Op.gte]: inicioMes }
      }
    }) || 0;

    // -----------------------------
    // TOTAL TRANSACCIONES
    // -----------------------------
    const totalTransacciones = await Transaccion.count();

    // -----------------------------
    // FLUJO DE CAJA HOY
    // -----------------------------
    const ingresosHoy = await FlujoCaja.sum('monto', {
      where: {
        tipo: 'ingreso',
        fecha: { [Op.gte]: inicioDia }
      }
    }) || 0;

    const egresosHoy = await FlujoCaja.sum('monto', {
      where: {
        tipo: 'egreso',
        fecha: { [Op.gte]: inicioDia }
      }
    }) || 0;

    const saldoHoy = ingresosHoy - egresosHoy;

    // -----------------------------
    // STOCK BAJO
    // -----------------------------
    const productos = await Producto.findAll();
    const stockBajo = productos.filter(p => p.stock <= p.stockMinimo).length;

    // -----------------------------
    // PRODUCTOS VENCIDOS
    // -----------------------------
    const vencidos = productos.filter(
      p => p.fechaVencimiento && p.fechaVencimiento < hoy
    ).length;

    // -----------------------------
    // ALERTAS ACTIVAS
    // -----------------------------
    const alertasActivas = await Alerta.count();

    // -----------------------------
    // RANKING DE VENDEDORES
    // -----------------------------
    const ranking = await Transaccion.findAll({
      where: { tipo: 'venta' },
      attributes: [
        'usuarioId',
        [fn('SUM', col('monto')), 'totalVendido']
      ],
      include: [{ model: Usuario, as: 'usuario', attributes: ['nombre'] }],
      group: ['usuarioId', 'usuario.id'],
      order: [[fn('SUM', col('monto')), 'DESC']],
      limit: 5
    });

    return {
      ventasHoy,
      ventasMes,
      totalTransacciones,
      saldoHoy,
      ingresosHoy,
      egresosHoy,
      stockBajo,
      vencidos,
      alertasActivas,
      ranking
    };
  }
}

module.exports = new DashboardService();

const emitter = require('../socket/emitter');
emitter.emitirDashboard({
  ventasHoy,
  ventasMes,
  totalTransacciones,
  saldoHoy,
  ingresosHoy,
  egresosHoy,
  stockBajo,
  vencidos,
  alertasActivas,
  ranking
});

