const dashboardService = require('../services/dashboardService');

class DashboardController {
  async obtener(req, res) {
    try {
      const data = await dashboardService.obtenerDashboard();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener dashboard', detalle: error.message });
    }
  }
}

module.exports = new DashboardController();
