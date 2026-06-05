const { Op, fn, col, literal } = require('sequelize');
const { 
  Transaccion, 
  TransaccionDetalle, 
  Producto, 
  Categoria, 
  Alerta 
} = require('../models');

exports.getDashboard = async (req, res) => {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    // ============================
    // 1. TRANSACCIONES DEL DÍA
    // ============================
    const transaccionesHoy = await Transaccion.findAll({
      where: {
        createdAt: { [Op.gte]: hoy, [Op.lt]: mañana }
      },
      include: [
        {
          model: TransaccionDetalle,
          as: 'detalles',
          include: [{ model: Producto, as: 'producto' }]
        }
      ]
    });

    let totalVentas = 0;
    let totalCompras = 0;
    let totalItems = 0;
    const ventasPorHora = {};
    const rankingProductos = {};
    const rankingCategorias = {};

    for (const t of transaccionesHoy) {
      if (t.tipo === 'venta') totalVentas += t.total;
      if (t.tipo === 'compra') totalCompras += t.total;

      const hora = new Date(t.createdAt).getHours();
      ventasPorHora[hora] = (ventasPorHora[hora] || 0) + t.total;

      for (const d of t.detalles) {
        totalItems += d.cantidad;

        const nombre = d.producto.nombre;
        rankingProductos[nombre] = (rankingProductos[nombre] || 0) + d.cantidad;

        const categoria = d.producto.categoriaId;
        rankingCategorias[categoria] = (rankingCategorias[categoria] || 0) + d.cantidad;
      }
    }

    const balance = totalVentas - totalCompras;
    const ticketPromedio = transaccionesHoy.length > 0
      ? Math.round(totalVentas / transaccionesHoy.length)
      : 0;

    // ============================
    // 2. VENTAS ÚLTIMOS 7 DÍAS
    // ============================
    const hace7Dias = new Date();
    hace7Dias.setDate(hace7Dias.getDate() - 6);
    hace7Dias.setHours(0, 0, 0, 0);

    const ventas7dias = await Transaccion.findAll({
      where: {
        tipo: 'venta',
        createdAt: { [Op.gte]: hace7Dias }
      },
      attributes: [
        [fn('DATE', col('createdAt')), 'fecha'],
        [fn('SUM', col('total')), 'total']
      ],
      group: [literal('DATE("createdAt")')],
      order: [[literal('DATE("createdAt")'), 'ASC']]
    });

    // ============================
    // 3. INVENTARIO CRÍTICO
    // ============================
    const productosBajoStock = await Producto.findAll({
      where: { stock: { [Op.lte]: 3 } }
    });

    // ============================
    // 4. ALERTAS NO LEÍDAS
    // ============================
    const alertas = await Alerta.findAll({
      where: { leida: false }
    });

    // ============================
    // RESPUESTA FINAL
    // ============================
    res.json({
      fecha: hoy.toISOString().split('T')[0],

      kpis: {
        totalVentas,
        totalCompras,
        balance,
        ticketPromedio,
        totalItems,
        cantidadTransacciones: transaccionesHoy.length
      },

      ventasPorHora,
      rankingProductos,
      rankingCategorias,
      ventas7dias,

      inventario: {
        productosBajoStock
      },

      alertas
    });

  } catch (error) {
    console.error("Error en dashboard:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

