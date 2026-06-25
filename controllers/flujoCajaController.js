const service = require('../services/flujoCajaService');

class FlujoCajaController {
  async crear(req, res) {
    try {
      const movimiento = await service.crearMovimiento(req.body);
      res.status(201).json(movimiento);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear movimiento de caja', detalle: error.message });
    }
  }

  async listar(req, res) {
    try {
      const movimientos = await service.obtenerMovimientos();
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener movimientos de caja' });
    }
  }

  async obtener(req, res) {
    try {
      const movimiento = await service.obtenerMovimientoPorId(req.params.id);
      if (!movimiento) return res.status(404).json({ error: 'Movimiento no encontrado' });
      res.json(movimiento);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener movimiento de caja' });
    }
  }

  async actualizar(req, res) {
    try {
      const movimiento = await service.actualizarMovimiento(req.params.id, req.body);
      if (!movimiento) return res.status(404).json({ error: 'Movimiento no encontrado' });
      res.json(movimiento);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar movimiento de caja' });
    }
  }

  async eliminar(req, res) {
    try {
      const ok = await service.eliminarMovimiento(req.params.id);
      if (!ok) return res.status(404).json({ error: 'Movimiento no encontrado' });
      res.json({ mensaje: 'Movimiento eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar movimiento de caja' });
    }
  }

  async resumen(req, res) {
    try {
      const resumen = await service.obtenerResumen();
      res.json(resumen);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener resumen de caja' });
    }
  }
}

module.exports = new FlujoCajaController();
