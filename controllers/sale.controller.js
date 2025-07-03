const { Sale, SellerProduct } = require('../models');
const { Op } = require('sequelize');

// 👉 Crear una nueva venta (se cobra automáticamente el 2.5% de comisión)
exports.createSale = async (req, res) => {
  try {
    const { sellerProductId, cantidad } = req.body;

    if (!sellerProductId || !cantidad || cantidad <= 0) {
      return res.status(400).json({ error: 'Datos inválidos para la venta' });
    }

    // Buscar producto del vendedor
    const product = await SellerProduct.findByPk(sellerProductId);

    if (!product || !product.activo) {
      return res.status(404).json({ error: 'Producto no encontrado o inactivo' });
    }

    // Calcular total y comisión
    const precioTotal = product.precio_unitario * cantidad;
    const comisionValor = +(precioTotal * 0.025).toFixed(2); // 2.5%
    const montoVendedor = +(precioTotal - comisionValor).toFixed(2);

    // Crear venta
    const venta = await Sale.create({
      sellerProductId,
      cantidad,
      precio_total: precioTotal,
      comision_valor: comisionValor,
      monto_vendedor: montoVendedor,
      fecha_venta: new Date(),
    });

    res.status(201).json({
      message: 'Venta registrada exitosamente',
      venta,
    });
  } catch (error) {
    console.error('❌ Error al registrar venta:', error);
    res.status(500).json({ error: 'Error interno al registrar venta' });
  }
};

// 👉 Obtener ventas por vendedor autenticado (con paginación y filtro de fechas)
exports.getSalesBySeller = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { page = 1, limit = 10, from, to } = req.query;

    const sellerProducts = await SellerProduct.findAll({
      where: { vendedorId: sellerId, activo: true },
      attributes: ['id'],
    });

    const productIds = sellerProducts.map(p => p.id);

    if (productIds.length === 0) {
      return res.status(200).json({ sales: [], totalComision: 0 });
    }

    const dateFilter = {};
    if (from) dateFilter[Op.gte] = new Date(from);
    if (to) dateFilter[Op.lte] = new Date(to);

    const { rows: sales, count } = await Sale.findAndCountAll({
      where: {
        sellerProductId: productIds,
        ...(from || to ? { fecha_venta: dateFilter } : {}),
      },
      order: [['fecha_venta', 'DESC']],
      offset: (page - 1) * limit,
      limit: +limit,
      include: [{
        model: SellerProduct,
        as: 'product',
        attributes: ['nombre', 'precio_unitario'],
      }],
    });

    const totalComisionResult = await Sale.sum('comision_valor', {
      where: {
        sellerProductId: productIds,
        ...(from || to ? { fecha_venta: dateFilter } : {}),
      },
    });

    res.status(200).json({
      sales,
      totalComision: parseFloat(totalComisionResult) || 0,
      page: +page,
      totalVentas: count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('❌ Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error interno al obtener ventas' });
  }
};
