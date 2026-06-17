const alertaService = require('../services/alerta.service');

module.exports = {
  async crear(req, res) {
    try {
      const { tipo, mensaje } = req.body;
      const alerta = await alertaService.crearAlerta(tipo, mensaje);
      res.status(201).json(alerta);
    } catch (err) {
      res.status(500).json({ error: 'Error creando alerta' });
    }
  },

  async obtener(req, res) {
    try {
      const alertas = await alertaService.obtenerAlertas();
      res.json(alertas);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo alertas' });
    }
  },

  async obtenerActivas(req, res) {
    try {
      const alertas = await alertaService.obtenerAlertasActivas();
      res.json(alertas);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo alertas activas' });
    }
  },

  async marcarLeida(req, res) {
    try {
      await alertaService.marcarLeida(req.params.id);
      res.json({ mensaje: 'Alerta marcada como leída' });
    } catch (err) {
      res.status(500).json({ error: 'Error marcando alerta' });
    }
  },

  async generarStock(req, res) {
    try {
      await alertaService.generarAlertasStockBajo();
      res.json({ mensaje: 'Alertas de stock bajo generadas' });
    } catch (err) {
      res.status(500).json({ error: 'Error generando alertas' });
    }
  },

  async generarVencimiento(req, res) {
    try {
      await alertaService.generarAlertasVencimiento();
      res.json({ mensaje: 'Alertas de vencimiento generadas' });
    } catch (err) {
      res.status(500).json({ error: 'Error generando alertas' });
    }
  },

  async generarVentasDia(req, res) {
    try {
      await alertaService.generarAlertasVentasDia();
      res.json({ mensaje: 'Alertas de ventas del día generadas' });
    } catch (err) {
      res.status(500).json({ error: 'Error generando alertas' });
    }
  }
};
