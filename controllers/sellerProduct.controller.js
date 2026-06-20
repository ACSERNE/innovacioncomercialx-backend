const sellerService = require('../services/sellerProduct.service');

module.exports = {
  async asignar(req, res) {
    try {
      const { usuarioId, productoId } = req.body;
      const resultado = await sellerService.asignarProducto(usuarioId, productoId);
      if (!resultado) return res.status(404).json({ error: 'Usuario o producto no encontrado' });
      res.json(resultado);
    } catch (err) {
      res.status(500).json({ error: 'Error asignando producto al vendedor' });
    }
  },

  async productosDeVendedor(req, res) {
    try {
      const data = await sellerService.obtenerProductosDeVendedor(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo productos del vendedor' });
    }
  },

  async vendedoresDeProducto(req, res) {
    try {
      const data = await sellerService.obtenerVendedoresDeProducto(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo vendedores del producto' });
    }
  },

  async eliminar(req, res) {
    try {
      const { usuarioId, productoId } = req.body;
      await sellerService.eliminarAsignacion(usuarioId, productoId);
      res.json({ mensaje: 'Asignación eliminada' });
    } catch (err) {
      res.status(500).json({ error: 'Error eliminando asignación' });
    }
  }
};
