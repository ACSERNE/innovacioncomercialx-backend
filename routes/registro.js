const express = require("express");
const router = express.Router();
const db = require("../models");
const Usuario = db.Usuario;
const CodigoVerificacion = db.CodigoVerificacion;
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    const { nombre, correo, password, telefono } = req.body;

    if (!nombre || !correo || !password || !telefono) {
      return res.status(400).json({ ok: false, message: "Datos incompletos" });
    }

    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ ok: false, message: "El correo ya está registrado" });
    }

    const codigoPendiente = await CodigoVerificacion.findOne({ where: { correo } });
    if (codigoPendiente) {
      return res.status(400).json({ ok: false, message: "Debes validar el código enviado al correo" });
    }

    const hash = bcrypt.hashSync(password, 10);

    const nuevo = await Usuario.create({
      nombre,
      correo,
      telefono,
      password: hash,
      correoVerificado: true
    });

    return res.json({ ok: true, usuario: nuevo });

  } catch (error) {
    console.error("❌ Error registrando usuario:", error);
    return res.status(500).json({ ok: false, message: "Error registrando usuario" });
  }
});

module.exports = router;
