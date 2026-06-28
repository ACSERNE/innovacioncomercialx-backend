const router = require("express").Router();
const db = require("../models");

router.get("/", async (req, res) => {
  try {
    const products = await db.Product.findAll({
      attributes: ["id", "nombre", "slug", "precio", "stock"],
      include: [
        { model: db.ProductImage, attributes: ["url"] },
        { model: db.Store, attributes: ["nombre", "slug"] }
      ]
    });

    res.json({ ok: true, products });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
