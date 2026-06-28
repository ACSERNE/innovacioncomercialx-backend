const buyerService = require("../services/buyerService");
const axios = require("axios");

module.exports = {
  async getOrders(req, res) {
    const user_id = req.user.id;
    const orders = await buyerService.getOrders(user_id);
    res.json({ ok: true, orders });
  },

  async getOrder(req, res) {
    const user_id = req.user.id;
    const order = await buyerService.getOrder(req.params.id, user_id);
    res.json({ ok: true, order });
  },

  async getTracking(req, res) {
    try {
      const codigo = req.params.id;

      const response = await axios.get(
        "https://testservices.wschilexpress.com/transport-orders/api/v1.0/transport-orders/" + codigo,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.CHILEXPRESS_API_KEY
          }
        }
      );

      res.json({ ok: true, data: response.data.data });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  }
};
