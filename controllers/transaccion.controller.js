const { Transaccion, TransaccionDetalle, Producto } = require('../models');

//
// ======================================================
//  CREAR TRANSACCIÓN (VENTA / COMPRA)
// ======================================================
//
exports.crearTransaccion = async (req, res) => {
  try {
    const { tipo, observaciones, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Debe incluir al menos un producto" });
    }

    // Validar stock y calcular total
    let total = 0;
    const detalles = [];

    for (const item of items) {
      const producto = await Producto.findByPk(item.productoId);

      if (!producto) {
        return res.status(404).json({ error: `Producto no encontrado: ${item.productoId}` });
      }

      if (tipo === "venta" && producto.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${producto.nombre}` });
      }

      const subtotal = producto.precio_unitario * item.cantidad;
      total += subtotal;

      detalles.push({
        productoId: producto.id,
        cantidad: item.cantidad,
        precio_unitario: producto.precio_unitario,
        subtotal
      });
    }

    // Crear transacción
    const transaccion = await Transaccion.create({
      tipo,
      total,
      observaciones
    });

    // Crear detalles y actualizar stock
    for (const det of detalles) {
      await TransaccionDetalle.create({
        ...det,
        transaccionId: transaccion.id
      });

      const producto = await Producto.findByPk(det.productoId);
      await producto.update({
        stock: producto.stock - det.cantidad
      });
    }

    // Obtener transacción completa con detalles
    const transaccionCompleta = await Transaccion.findByPk(transaccion.id, {
      include: [
        {
          model: TransaccionDetalle,
          as: "detalles",
          include: [
            {
              model: Producto,
              as: "producto"
            }
          ]
        }
      ]
    });

    res.json(transaccionCompleta);

  } catch (error) {
    console.error("Error al crear transacción:", error);
    res.status(500).json({ error: "Error interno" });
  }
};


//
// ======================================================
//  LISTAR TRANSACCIONES (CON DETALLES Y PRODUCTOS)
// ======================================================
//
exports.listarTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      include: [
        {
          model: TransaccionDetalle,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto'
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(transacciones);

  } catch (error) {
    console.error('Error al listar transacciones:', error);
    res.status(500).json({ error: 'Error interno' });
  }
};

