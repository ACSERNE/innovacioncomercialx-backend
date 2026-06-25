const service = require('../services/categoriasProductoService');

class CategoriasProductoController {
  async crear(req, res) {
    try {
      const categoria = await service.crearCategoria(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear categoría', detalle: error.message });
    }
  }

  async listar(req, res) {
    try {
      const categorias = await service.obtenerCategorias();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  }

  async obtener(req, res) {
    try {
      const categoria = await service.obtenerCategoriaPorId(req.params.id);
      if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categoría' });
    }
  }

  async actualizar(req, res) {
    try {
      const categoria = await service.actualizarCategoria(req.params.id, req.body);
      if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar categoría' });
    }
  }

  async eliminar(req, res) {
    try {
      const ok = await service.eliminarCategoria(req.params.id);
      if (!ok) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json({ mensaje: 'Categoría eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar categoría' });
    }
  }
}

module.exports = new CategoriasProductoController();
