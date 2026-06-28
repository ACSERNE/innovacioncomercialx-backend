const providerService = require('../services/providerService');

module.exports = {
  async register(req, res) {
    try {
      const provider = await providerService.register(req.body);
      res.json({ ok: true, provider });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async login(req, res) {
    try {
      const token = await providerService.login(req.body.email);
      if (!token) return res.status(404).json({ ok: false, error: 'Proveedor no encontrado' });
      res.json({ ok: true, token });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async me(req, res) {
    try {
      const provider = await providerService.getMe(req.user.id);
      res.json({ ok: true, provider });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      const provider = await providerService.update(req.user.id, req.body);
      res.json({ ok: true, provider });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async verifyEmail(req, res) {
    try {
      const provider = await providerService.verifyEmail(req.user.id);
      res.json({ ok: true, provider });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async verifyPhone(req, res) {
    try {
      const provider = await providerService.verifyPhone(req.user.id);
      res.json({ ok: true, provider });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  },

  async verifyIdentity(req, res) {
    try {
      const provider = await providerService.verifyIdentity(req.user.id);
      res.json({ ok: true, provider });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  }
};
