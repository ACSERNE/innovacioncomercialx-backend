const { Producto } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error("Error getAll productos:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.getById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    console.error("Error getById producto:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.create = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.json(producto);
  } catch (error) {
    console.error("Error create producto:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.update = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    console.error("Error update producto:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.remove = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    await producto.destroy();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error remove producto:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
