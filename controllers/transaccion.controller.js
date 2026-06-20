const transaccionService = require('../services/transaccion.service');

module.exports = {
  async registrar(req, res) {
    try {
      const venta = await transaccionService.registrarVenta(req.body);
      res.status(201).json(venta);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  async obtenerTodas(req, res) {
    try {
      const ventas = await transaccionService.obtenerTodas();
      res.json(ventas);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo ventas' });
    }
  },

  async ventasDelDia(req, res) {
    try {
      const ventas = await transaccionService.ventasDelDia();
      res.json(ventas);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo ventas del día' });
    }
  },

  async ventasDelMes(req, res) {
    try {
      const ventas = await transaccionService.ventasDelMes();
      res.json(ventas);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo ventas del mes' });
    }
  },

  async ventasPorUsuario(req, res) {
    try {
      const ventas = await transaccionService.ventasPorUsuario(req.params.id);
      res.json(ventas);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo ventas del usuario' });
    }
  },

  async ventasPorProducto(req, res) {
    try {
      const ventas = await transaccionService.ventasPorProducto(req.params.id);
      res.json(ventas);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo ventas del producto' });
    }
  }
};
