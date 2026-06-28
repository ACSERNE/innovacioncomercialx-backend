const router = require("express").Router();
const controller = require("../controllers/productsController");
const authProvider = require("../middleware/authProvider");

router.post("/", authProvider, controller.create);
router.get("/:id", controller.getById);
router.get("/store/:store_id", controller.getByStore);
router.put("/:id", authProvider, controller.update);
router.delete("/:id", authProvider, controller.delete);

// INVENTARIO
router.post("/:id/add-stock", authProvider, controller.addStock);
router.post("/:id/remove-stock", authProvider, controller.removeStock);

module.exports = router;
