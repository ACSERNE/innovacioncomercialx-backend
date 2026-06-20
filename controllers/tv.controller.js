const tvService = require('../services/tv.service');

module.exports = {
  async obtenerTV(req, res) {
    try {
      const data = await tvService.obtenerTV();
      res.json(data);
    } catch (error) {
      console.error("ERROR TV MODE:", error);
      res.status(500).json({ error: "Error interno en TV Mode" });
    }
  }
};
