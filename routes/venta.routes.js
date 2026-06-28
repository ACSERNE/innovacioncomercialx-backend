const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");

// Crear venta
router.post("/", ventaController.crear);

// Listar ventas
router.get("/", ventaController.listar);

module.exports = router;
