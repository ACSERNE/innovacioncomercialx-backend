const { Sale, Producto } = require('../models');

exports.reporteVentas = async (req, res) => {
  try {
    const ventas = await Sale.findAll();
    res.json({ total: ventas.length, ventas });
  } catch (error) {
    console.error("Error reporteVentas:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.reporteProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json({ total: productos.length, productos });
  } catch (error) {
    console.error("Error reporteProductos:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
