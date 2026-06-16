const { Producto } = require('../models');

exports.getAll = async () => {
  return await Producto.findAll({ order: [['createdAt', 'DESC']] });
};

exports.getById = async (id) => {
  return await Producto.findByPk(id);
};

exports.create = async (data) => {
  return await Producto.create(data);
};

exports.update = async (id, data) => {
  const producto = await Producto.findByPk(id);
  if (!producto) return null;
  await producto.update(data);
  return producto;
};

exports.remove = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) return null;
  await producto.destroy();
  return true;
};
