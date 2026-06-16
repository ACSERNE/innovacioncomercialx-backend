const { Transaccion } = require('../models');
const { DateTime } = require('luxon');
const { Op } = require('sequelize');

exports.getDiario = async (fechaStr) => {
  const fecha = fechaStr || DateTime.now().toISODate();

  const transacciones = await Transaccion.findAll({
    where: {
      createdAt: {
        [Op.gte]: fecha
      }
    }
  });

  const totalVentas = transacciones
    .filter(t => t.tipo === 'venta')
    .reduce((acc, t) => acc + t.total, 0);

  const totalCompras = transacciones
    .filter(t => t.tipo === 'compra')
    .reduce((acc, t) => acc + t.total, 0);

  return {
    fecha,
    totalVentas,
    totalCompras,
    balance: totalVentas - totalCompras
  };
};
