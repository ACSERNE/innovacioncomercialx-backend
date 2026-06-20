const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/registroController");

router.post("/registro", ctrl.registro);
router.post("/verificar-correo", ctrl.verificarCorreo);
router.post("/verificar-telefono", ctrl.verificarTelefono);
router.post("/validar-identidad", ctrl.validarIdentidad);

module.exports = router;
