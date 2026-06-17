const categoriaService = require('../services/categoria.service');

module.exports = {
  async crear(req, res) {
    try {
      const categoria = await categoriaService.crearCategoria(req.body);
      res.status(201).json(categoria);
    } catch (err) {
      res.status(500).json({ error: 'Error creando categoría' });
    }
  },

  async obtenerTodos(req, res) {
    try {
      const categorias = await categoriaService.obtenerCategorias();
      res.json(categorias);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo categorías' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const categoria = await categoriaService.obtenerCategoriaPorId(req.params.id);
      if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json(categoria);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo categoría' });
    }
  },

  async actualizar(req, res) {
    try {
      await categoriaService.actualizarCategoria(req.params.id, req.body);
      res.json({ mensaje: 'Categoría actualizada' });
    } catch (err) {
      res.status(500).json({ error: 'Error actualizando categoría' });
    }
  },

  async eliminar(req, res) {
    try {
      await categoriaService.eliminarCategoria(req.params.id);
      res.json({ mensaje: 'Categoría eliminada' });
    } catch (err) {
      res.status(500).json({ error: 'Error eliminando categoría' });
    }
  },

  async asignarProducto(req, res) {
    try {
      const { categoriaId, productoId } = req.body;
      const resultado = await categoriaService.asignarProducto(categoriaId, productoId);
      if (!resultado) return res.status(404).json({ error: 'Categoría o producto no encontrado' });
      res.json(resultado);
    } catch (err) {
      res.status(500).json({ error: 'Error asignando producto a categoría' });
    }
  },

  async productosPorCategoria(req, res) {
    try {
      const productos = await categoriaService.productosPorCategoria(req.params.id);
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo productos por categoría' });
    }
  }
};
