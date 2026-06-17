const db = require('../models');

module.exports = {
  listar() {
    return db.Producto.findAll({ include: [db.Categoria] });
  },

  obtener(id) {
    return db.Producto.findByPk(id, { include: [db.Categoria] });
  },

  crear(data) {
    return db.Producto.create(data);
  },

  actualizar(id, data) {
    return db.Producto.update(data, { where: { id } });
  },

  eliminar(id) {
    return db.Producto.destroy({ where: { id } });
  },

  stockCritico() {
    return db.Producto.findAll({
      where: { stock: { [db.Sequelize.Op.lte]: 5 } }
    });
  }
};
