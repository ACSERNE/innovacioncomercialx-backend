const productService = require("../services/productService");

module.exports = {
  async create(req, res) {
    try {
      const product = await productService.create(req.body.store_id, req.body);
      res.json({ ok: true, product });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const product = await productService.getById(req.params.id);
      res.json({ ok: true, product });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async getByStore(req, res) {
    try {
      const products = await productService.getByStore(req.params.store_id);
      res.json({ ok: true, products });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.json({ ok: true, product });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await productService.delete(req.params.id);
      res.json({ ok: true, message: "Producto eliminado" });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async addStock(req, res) {
    try {
      const product = await productService.addStock(
        req.params.id,
        req.body.cantidad,
        req.body.motivo
      );
      res.json({ ok: true, product });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async removeStock(req, res) {
    try {
      const product = await productService.removeStock(
        req.params.id,
        req.body.cantidad,
        req.body.motivo
      );
      res.json({ ok: true, product });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  }
};
