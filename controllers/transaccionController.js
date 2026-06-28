const { Transaccion, TransaccionDetalle, Producto } = require("../models");
const ventaEmitter = require("../utils/ventaEmitter");

// Crear transacción
exports.crear = async (req, res) => {
  try {
    const { tipo, detalles } = req.body;

    const transaccion = await Transaccion.create({
      tipo,
      total: 0
    });

    let total = 0;

    for (const d of detalles) {
      const producto = await Producto.findByPk(d.productoId);
      if (!producto) continue;

      const subtotal = producto.precio * d.cantidad;
      total += subtotal;

      await TransaccionDetalle.create({
        transaccionId: transaccion.id,
        productoId: producto.id,
        cantidad: d.cantidad,
        precioUnitario: producto.precio,
        subtotal
      });
    }

    transaccion.total = total;
    await transaccion.save();

    // Emitir venta
    ventaEmitter.emitirVenta(transaccion);

    res.status(201).json(transaccion);
  } catch (error) {
    console.error("❌ Error creando transacción:", error);
    res.status(500).json({ error: "Error creando transacción" });
  }
};

// Listar transacciones
exports.listar = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      order: [["createdAt", "DESC"]],
      include: [TransaccionDetalle]
    });

    res.json(transacciones);
  } catch (error) {
    console.error("❌ Error obteniendo transacciones:", error);
    res.status(500).json({ error: "Error obteniendo transacciones" });
  }
};
