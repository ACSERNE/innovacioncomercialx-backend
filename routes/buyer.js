const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/buyerController");

router.get("/orders", auth, controller.getOrders);
router.get("/orders/:id", auth, controller.getOrder);
router.get("/orders/:id/tracking", auth, controller.getTracking);

module.exports = router;
