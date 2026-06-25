const service = require('../services/transaccionService');

class TransaccionController {
  async crear(req, res) {
    try {
      const transaccion = await service.crearTransaccion(req.body);
      res.status(201).json(transaccion);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear transacción', detalle: error.message });
    }
  }

  async listar(req, res) {
    try {
      const transacciones = await service.obtenerTransacciones();
      res.json(transacciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener transacciones' });
    }
  }

  async obtener(req, res) {
    try {
      const transaccion = await service.obtenerTransaccionPorId(req.params.id);
      if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
      res.json(transaccion);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener transacción' });
    }
  }

  async actualizar(req, res) {
    try {
      const transaccion = await service.actualizarTransaccion(req.params.id, req.body);
      if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
      res.json(transaccion);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar transacción' });
    }
  }

  async eliminar(req, res) {
    try {
      const ok = await service.eliminarTransaccion(req.params.id);
      if (!ok) return res.status(404).json({ error: 'Transacción no encontrada' });
      res.json({ mensaje: 'Transacción eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar transacción' });
    }
  }
}

module.exports = new TransaccionController();

// Emitir venta en vivo
const emitter = require('../socket/emitter');
emitter.emitirVenta(nuevaTransaccion);

