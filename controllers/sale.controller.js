const { Sale } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const ventas = await Sale.findAll();
    res.json(ventas);
  } catch (error) {
    console.error("Error getAll ventas:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.getById = async (req, res) => {
  try {
    const venta = await Sale.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(venta);
  } catch (error) {
    console.error("Error getById venta:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.create = async (req, res) => {
  try {
    const venta = await Sale.create(req.body);
    res.json(venta);
  } catch (error) {
    console.error("Error create venta:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.update = async (req, res) => {
  try {
    const venta = await Sale.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    await venta.update(req.body);
    res.json(venta);
  } catch (error) {
    console.error("Error update venta:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.remove = async (req, res) => {
  try {
    const venta = await Sale.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    await venta.destroy();
    res.json({ message: "Venta eliminada" });
  } catch (error) {
    console.error("Error remove venta:", error);
    res.status(500).json({ error: "Error interno" });
  }
};








