const router = require("express").Router();
const db = require("../models");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const notifs = await db.Notification.findAll({
    where: { user_id: req.user.id },
    order: [["createdAt", "DESC"]]
  });

  res.json({ ok: true, notifs });
});

router.post("/mark-read/:id", auth, async (req, res) => {
  await db.Notification.update(
    { leido: true },
    { where: { id: req.params.id, user_id: req.user.id } }
  );

  res.json({ ok: true });
});

module.exports = router;
