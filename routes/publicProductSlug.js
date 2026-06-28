const router = require("express").Router();
const db = require("../models");

router.get("/:slug", async (req, res) => {
  try {
    const product = await db.Product.findOne({
      where: { slug: req.params.slug },
      include: [
        db.ProductImage,
        { model: db.Store, attributes: ["nombre", "slug"] }
      ]
    });

    res.json({ ok: true, product });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
