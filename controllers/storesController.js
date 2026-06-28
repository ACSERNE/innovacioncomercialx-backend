const storeService = require('../services/storeService');

module.exports = {
  async create(req, res) {
    try {
      const store = await storeService.create(req.user.id, req.body);
      res.json({ ok: true, store });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const store = await storeService.getById(req.params.id);
      res.json({ ok: true, store });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async getByProvider(req, res) {
    try {
      const stores = await storeService.getByProvider(req.user.id);
      res.json({ ok: true, stores });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      const store = await storeService.update(req.params.id, req.body);
      res.json({ ok: true, store });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await storeService.delete(req.params.id);
      res.json({ ok: true, message: 'Tienda eliminada' });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  }
};
