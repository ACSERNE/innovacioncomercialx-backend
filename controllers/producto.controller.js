const productoService = require('../services/producto.service');

module.exports = {
  async crear(req, res) {
    try {
      const producto = await productoService.crearProducto(req.body);
      res.status(201).json(producto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creando producto' });
    }
  },

  async obtenerTodos(req, res) {
    try {
      const productos = await productoService.obtenerProductos();
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo productos' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const producto = await productoService.obtenerProductoPorId(req.params.id);
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(producto);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo producto' });
    }
  },

  async actualizar(req, res) {
    try {
      await productoService.actualizarProducto(req.params.id, req.body);
      res.json({ mensaje: 'Producto actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Error actualizando producto' });
    }
  },

  async eliminar(req, res) {
    try {
      await productoService.eliminarProducto(req.params.id);
      res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error eliminando producto' });
    }
  },

  async stockBajo(req, res) {
    try {
      const threshold = req.query.threshold ? Number(req.query.threshold) : 5;
      const productos = await productoService.productosStockBajo(threshold);
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo productos con stock bajo' });
    }
  },

  async masVendidos(req, res) {
    try {
      const productos = await productoService.productosMasVendidos();
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo productos más vendidos' });
    }
  }
};
