const express = require("express");
const router = express.Router();
const transaccionController = require("../controllers/transaccionController");

// Crear transacción
router.post("/", transaccionController.crear);

// Listar transacciones
router.get("/", transaccionController.listar);

module.exports = router;
