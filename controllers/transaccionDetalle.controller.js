const detalleService = require('../services/transaccionDetalle.service');

module.exports = {
  async obtenerTodos(req, res) {
    try {
      const detalles = await detalleService.obtenerDetalles();
      res.json(detalles);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo detalles' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const detalle = await detalleService.obtenerPorId(req.params.id);
      if (!detalle) return res.status(404).json({ error: 'Detalle no encontrado' });
      res.json(detalle);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo detalle' });
    }
  },

  async obtenerPorTransaccion(req, res) {
    try {
      const detalles = await detalleService.obtenerPorTransaccion(req.params.id);
      res.json(detalles);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo detalles de la transacción' });
    }
  },

  async obtenerPorProducto(req, res) {
    try {
      const detalles = await detalleService.obtenerPorProducto(req.params.id);
      res.json(detalles);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo detalles del producto' });
    }
  },

  async eliminar(req, res) {
    try {
      await detalleService.eliminar(req.params.id);
      res.json({ mensaje: 'Detalle eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error eliminando detalle' });
    }
  }
};
