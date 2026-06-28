const router = require("express").Router();
const db = require("../models");
const checkAdminRole = require("../middleware/checkAdminRole");

router.get("/", checkAdminRole, async (req, res) => {
  try {

    const totalProveedores = await db.Provider.count();
    const totalTiendas = await db.Store.count();
    const totalProductos = await db.Product.count();
    const totalVentas = await db.Venta.count();

    const stockGlobal = await db.Product.sum("stock");
    const productosSinStock = await db.Product.count({ where: { stock: 0 } });

    const ultimosProveedores = await db.Provider.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]]
    });

    const ultimasTiendas = await db.Store.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]]
    });

    const ultimosProductos = await db.Product.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]]
    });

    const ultimosMovimientos = await db.InventoryLog.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [{ model: db.Product }]
    });

    res.json({
      ok: true,
      data: {
        totalProveedores,
        totalTiendas,
        totalProductos,
        totalVentas,
        stockGlobal,
        productosSinStock,
        ultimosProveedores,
        ultimasTiendas,
        ultimosProductos,
        ultimosMovimientos
      }
    });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
