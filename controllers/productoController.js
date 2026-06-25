const service = require('../services/productoService');

class ProductoController {
  async crear(req, res) {
    try {
      const producto = await service.crearProducto(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear producto', detalle: error.message });
    }
  }

  async listar(req, res) {
    try {
      const productos = await service.obtenerProductos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  async obtener(req, res) {
    try {
      const producto = await service.obtenerProductoPorId(req.params.id);
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  }

  async actualizar(req, res) {
    try {
      const producto = await service.actualizarProducto(req.params.id, req.body);
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  }

  async eliminar(req, res) {
    try {
      const ok = await service.eliminarProducto(req.params.id);
      if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
}

module.exports = new ProductoController();
