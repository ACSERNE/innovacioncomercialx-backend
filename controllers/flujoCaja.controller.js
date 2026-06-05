const { Transaccion } = require('../models');
const { Op } = require('sequelize');

// ===============================
// FLUJO DE CAJA DIARIO
// ===============================
exports.flujoCajaDiario = async (req, res) => {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    // Obtener todas las transacciones del día
    const transacciones = await Transaccion.findAll({
      where: {
        createdAt: {
          [Op.gte]: hoy,
          [Op.lt]: mañana
        }
      }
    });

    let totalVentas = 0;
    let totalCompras = 0;

    for (const t of transacciones) {
      if (t.tipo === 'venta') totalVentas += t.total;
      if (t.tipo === 'compra') totalCompras += t.total;
    }

    const balance = totalVentas - totalCompras;

    res.json({
      fecha: hoy.toISOString().split('T')[0],
      totalVentas,
      totalCompras,
      balance,
      cantidadTransacciones: transacciones.length,
      transacciones
    });

  } catch (error) {
    console.error("Error en flujo de caja diario:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

