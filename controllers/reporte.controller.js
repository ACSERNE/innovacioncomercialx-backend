const { Transaccion, TransaccionDetalle, Producto, Categoria } = require('../models');
const { Op } = require('sequelize');

// ===============================
// REPORTE DIARIO AVANZADO
// ===============================
exports.reporteDiario = async (req, res) => {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    // Obtener transacciones del día con detalles y productos
    const transacciones = await Transaccion.findAll({
      where: {
        createdAt: {
          [Op.gte]: hoy,
          [Op.lt]: mañana
        }
      },
      include: [
        {
          model: TransaccionDetalle,
          as: 'detalles',
          include: [
            { model: Producto, as: 'producto' }
          ]
        }
      ]
    });

    // Totales
    let totalVentas = 0;
    let totalItems = 0;

    // Ranking productos
    const rankingProductos = {};

    // Ranking categorías
    const rankingCategorias = {};

    // Ventas por hora
    const ventasPorHora = {};

    for (const t of transacciones) {
      if (t.tipo !== 'venta') continue;

      totalVentas += t.total;

      const hora = new Date(t.createdAt).getHours();
      ventasPorHora[hora] = (ventasPorHora[hora] || 0) + t.total;

      for (const d of t.detalles) {
        totalItems += d.cantidad;

        // Ranking productos
        const nombre = d.producto.nombre;
        rankingProductos[nombre] = (rankingProductos[nombre] || 0) + d.cantidad;

        // Ranking categorías
        const categoria = d.producto.categoriaId;
        rankingCategorias[categoria] = (rankingCategorias[categoria] || 0) + d.cantidad;
      }
    }

    const ticketPromedio = transacciones.length > 0
      ? Math.round(totalVentas / transacciones.length)
      : 0;

    res.json({
      fecha: hoy.toISOString().split('T')[0],
      totalVentas,
      totalItems,
      ticketPromedio,
      cantidadTransacciones: transacciones.length,
      ventasPorHora,
      rankingProductos,
      rankingCategorias,
      transacciones
    });

  } catch (error) {
    console.error("Error en reporte diario:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

