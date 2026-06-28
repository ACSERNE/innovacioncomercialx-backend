const db = require("../models");

module.exports = {
  async getOrCreateCart(user_id, session_id) {
    let cart = await db.Cart.findOne({
      where: user_id ? { user_id } : { session_id },
      include: [{ model: db.CartItem, include: [db.Product] }]
    });

    if (!cart) {
      cart = await db.Cart.create({ user_id, session_id });
    }

    return cart;
  },

  async addItem(cart_id, product_id, cantidad) {
    const item = await db.CartItem.findOne({ where: { cart_id, product_id } });

    if (item) {
      return item.update({ cantidad: item.cantidad + cantidad });
    }

    return db.CartItem.create({ cart_id, product_id, cantidad });
  },

  async removeItem(cart_id, product_id) {
    return db.CartItem.destroy({ where: { cart_id, product_id } });
  },

  async clear(cart_id) {
    return db.CartItem.destroy({ where: { cart_id } });
  }
};
