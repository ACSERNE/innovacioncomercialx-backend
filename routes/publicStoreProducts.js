const router = require("express").Router();
const db = require("../models");

router.get("/:slug/products", async (req, res) => {
  try {
    const store = await db.Store.findOne({ where: { slug: req.params.slug } });

    if (!store) return res.json({ ok: false, error: "Tienda no encontrada" });

    const products = await db.Product.findAll({
      where: { store_id: store.id },
      include: [db.ProductImage]
    });

    res.json({ ok: true, store, products });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
