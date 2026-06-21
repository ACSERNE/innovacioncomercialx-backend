const express = require("express");
const router = express.Router();
const db = require("../models");
const CodigoVerificacion = db.CodigoVerificacion;

router.post("/validar", async (req, res) => {
  try {
    const { correo, codigo } = req.body;

    if (!correo || !codigo) {
      return res.status(400).json({ ok: false, message: "Datos incompletos" });
    }

    const registro = await CodigoVerificacion.findOne({ where: { correo } });

    if (!registro) {
      return res.status(400).json({ ok: false, message: "Código no encontrado" });
    }

    if (registro.codigo !== codigo) {
      return res.status(400).json({ ok: false, message: "Código incorrecto" });
    }

    if (new Date() > registro.expiracion) {
      return res.status(400).json({ ok: false, message: "Código expirado" });
    }

    await CodigoVerificacion.destroy({ where: { correo } });

    return res.json({ ok: true, message: "Código validado" });

  } catch (error) {
    console.error("❌ Error en /validar:", error);
    return res.status(500).json({ ok: false, message: "Error validando código" });
  }
});

module.exports = router;
