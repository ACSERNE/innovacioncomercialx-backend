const express = require("express");
const router = express.Router();
const db = require("../models");
const CodigoVerificacion = db.CodigoVerificacion;
const { sendVerificationEmail } = require("../services/emailService");
const crypto = require("crypto");

router.post("/correo", async (req, res) => {
  try {
    const { correo } = req.body;

    if (!correo) {
      return res.status(400).json({ ok: false, message: "Correo requerido" });
    }

    const codigo = crypto.randomInt(100000, 999999).toString();

    await CodigoVerificacion.destroy({ where: { correo } });

    await CodigoVerificacion.create({
      correo,
      codigo,
      expiracion: new Date(Date.now() + 10 * 60 * 1000)
    });

    await sendVerificationEmail(correo, codigo);

    return res.json({
      ok: true,
      message: "Código enviado",
      correo
    });

  } catch (error) {
    console.error("❌ Error en /correo:", error);
    return res.status(500).json({ ok: false, message: "Error enviando código" });
  }
});

module.exports = router;
