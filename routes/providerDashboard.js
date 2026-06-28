const router = require("express").Router();
const authProvider = require("../middleware/authProvider");
const db = require("../models");

router.get("/", authProvider, async (req, res) => {
  try {
    const provider_id = req.user.id;

    const totalTiendas = await db.Store.count({ where: { provider_id } });

    const totalProductos = await db.Product.count({
      include: [{ model: db.Store, where: { provider_id } }]
    });

    const stockTotal = await db.Product.sum("stock", {
      include: [{ model: db.Store, where: { provider_id } }]
    });

    const sinStock = await db.Product.count({
      where: { stock: 0 },
      include: [{ model: db.Store, where: { provider_id } }]
    });

    const ultimosMovimientos = await db.InventoryLog.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [{ model: db.Product }]
    });

    res.json({
      ok: true,
      data: {
        totalTiendas,
        totalProductos,
        stockTotal,
        sinStock,
        ultimosMovimientos
      }
    });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
