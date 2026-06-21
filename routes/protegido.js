const express = require("express");
const router = express.Router();
const { verificarToken, soloComprador, soloProveedor, soloAdmin } = require("../middleware/auth");

router.get("/general", verificarToken, (req, res) => {
  res.json({ ok: true, message: "Acceso general permitido", usuario: req.usuario });
});

router.get("/comprador", verificarToken, soloComprador, (req, res) => {
  res.json({ ok: true, message: "Acceso exclusivo para compradores" });
});

router.get("/proveedor", verificarToken, soloProveedor, (req, res) => {
  res.json({ ok: true, message: "Acceso exclusivo para proveedores" });
});

router.get("/admin", verificarToken, soloAdmin, (req, res) => {
  res.json({ ok: true, message: "Acceso exclusivo para administradores" });
});

module.exports = router;
