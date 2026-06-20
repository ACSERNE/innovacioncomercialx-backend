const flujoService = require('../services/flujoCaja.service');

module.exports = {
  async registrarIngreso(req, res) {
    try {
      const { monto, descripcion } = req.body;
      const ingreso = await flujoService.registrarIngreso(monto, descripcion);
      res.status(201).json(ingreso);
    } catch (err) {
      res.status(500).json({ error: 'Error registrando ingreso' });
    }
  },

  async registrarEgreso(req, res) {
    try {
      const { monto, descripcion } = req.body;
      const egreso = await flujoService.registrarEgreso(monto, descripcion);
      res.status(201).json(egreso);
    } catch (err) {
      res.status(500).json({ error: 'Error registrando egreso' });
    }
  },

  async obtenerTodos(req, res) {
    try {
      const movimientos = await flujoService.obtenerTodos();
      res.json(movimientos);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo movimientos' });
    }
  },

  async balanceDiario(req, res) {
    try {
      const balance = await flujoService.balanceDiario();
      res.json(balance);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo balance diario' });
    }
  },

  async balanceMensual(req, res) {
    try {
      const balance = await flujoService.balanceMensual();
      res.json(balance);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo balance mensual' });
    }
  }
};
