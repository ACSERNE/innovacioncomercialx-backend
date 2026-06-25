const tvService = require('../services/tvService');

class TvController {
  async estado(req, res) {
    try {
      const data = await tvService.obtenerEstadoTV();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener estado TV', detalle: error.message });
    }
  }
}

module.exports = new TvController();
