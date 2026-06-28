const { Venta, VentaDetalle, Producto } = require("../models");

// Crear venta
exports.crear = async (req, res) => {
  try {
    const { detalles } = req.body;

    const venta = await Venta.create({ total: 0 });

    let total = 0;

    for (const d of detalles) {
      const producto = await Producto.findByPk(d.productoId);
      if (!producto) continue;

      const subtotal = producto.precio * d.cantidad;
      total += subtotal;

      await VentaDetalle.create({
        ventaId: venta.id,
        productoId: producto.id,
        cantidad: d.cantidad,
        precioUnitario: producto.precio,
        subtotal
      });
    }

    venta.total = total;
    await venta.save();

    res.status(201).json(venta);
  } catch (error) {
    console.error("❌ Error creando venta:", error);
    res.status(500).json({ error: "Error creando venta" });
  }
};

// Listar ventas
exports.listar = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      order: [["createdAt", "DESC"]],
      include: [VentaDetalle]
    });

    res.json(ventas);
  } catch (error) {
    console.error("❌ Error obteniendo ventas:", error);
    res.status(500).json({ error: "Error obteniendo ventas" });
  }
};
