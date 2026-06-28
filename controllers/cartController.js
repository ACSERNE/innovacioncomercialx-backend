const cartService = require("../services/cartService");
const db = require("../models");

module.exports = {
  async getCart(req, res) {
    const user_id = req.user?.id || null;
    const session_id = req.headers["x-session-id"];

    const cart = await cartService.getOrCreateCart(user_id, session_id);
    res.json({ ok: true, cart });
  },

  async addItem(req, res) {
    const { product_id, cantidad } = req.body;
    const user_id = req.user?.id || null;
    const session_id = req.headers["x-session-id"];

    const cart = await cartService.getOrCreateCart(user_id, session_id);

    await cartService.addItem(cart.id, product_id, cantidad);

    res.json({ ok: true, message: "Producto agregado al carrito" });
  },

  async removeItem(req, res) {
    const { product_id } = req.body;
    const user_id = req.user?.id || null;
    const session_id = req.headers["x-session-id"];

    const cart = await cartService.getOrCreateCart(user_id, session_id);

    await cartService.removeItem(cart.id, product_id);

    res.json({ ok: true, message: "Producto eliminado" });
  }
};
