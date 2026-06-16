const { Transaccion } = require('../models');

exports.getAll = async () => {
  return await Transaccion.findAll({ order: [['createdAt', 'DESC']] });
};

exports.getById = async (id) => {
  return await Transaccion.findByPk(id);
};

exports.create = async (data) => {
  return await Transaccion.create(data);
};
