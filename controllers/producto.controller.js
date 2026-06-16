const productoService = require('../services/producto.service');

exports.getAll = async (req, res) => {
  try {
    const productos = await productoService.getAll();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.getById = async (req, res) => {
  try {
    const producto = await productoService.getById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.create = async (req, res) => {
  try {
    const producto = await productoService.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.update = async (req, res) => {
  try {
    const producto = await productoService.update(req.params.id, req.body);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.remove = async (req, res) => {
  try {
    const ok = await productoService.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};
