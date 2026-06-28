const router = require("express").Router();
const db = require("../models");

router.get("/", async (req, res) => {
  try {
    const stores = await db.Store.findAll({
      attributes: ["id", "nombre", "slug", "pais", "descripcion", "logo_url"]
    });

    res.json({ ok: true, stores });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
