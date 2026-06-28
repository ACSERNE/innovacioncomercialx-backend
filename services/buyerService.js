const db = require("../models");

module.exports = {
  async getOrders(user_id) {
    return db.Venta.findAll({
      where: { user_id },
      include: [db.Product]
    });
  },

  async getOrder(id, user_id) {
    return db.Venta.findOne({
      where: { id, user_id },
      include: [db.Product]
    });
  }
};
