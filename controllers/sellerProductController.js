const service = require('../services/sellerProductService');

class SellerProductController {
  async crear(req, res) {
    try {
      const asignacion = await service.asignarProducto(req.body);
      res.status(201).json(asignacion);
    } catch (error) {
      res.status(500).json({ error: 'Error al asignar producto a vendedor', detalle: error.message });
    }
  }

  async listar(req, res) {
    try {
      const asignaciones = await service.obtenerAsignaciones();
      res.json(asignaciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener asignaciones' });
    }
  }

  async obtener(req, res) {
    try {
      const asignacion = await service.obtenerAsignacionPorId(req.params.id);
      if (!asignacion) return res.status(404).json({ error: 'Asignación no encontrada' });
      res.json(asignacion);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener asignación' });
    }
  }

  async actualizar(req, res) {
    try {
      const asignacion = await service.actualizarAsignacion(req.params.id, req.body);
      if (!asignacion) return res.status(404).json({ error: 'Asignación no encontrada' });
      res.json(asignacion);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar asignación' });
    }
  }

  async eliminar(req, res) {
    try {
      const ok = await service.eliminarAsignacion(req.params.id);
      if (!ok) return res.status(404).json({ error: 'Asignación no encontrada' });
      res.json({ mensaje: 'Asignación eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar asignación' });
    }
  }
}

module.exports = new SellerProductController();
