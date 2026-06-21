const express = require("express");
const router = express.Router();
const db = require("../models");
const Usuario = db.Usuario;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ ok: false, message: "Datos incompletos" });
    }

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ ok: false, message: "Credenciales inválidas" });
    }

    const valido = bcrypt.compareSync(password, usuario.password);
    if (!valido) {
      return res.status(400).json({ ok: false, message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo,
        tipo: usuario.tipo,
        correoVerificado: usuario.correoVerificado
      },
      process.env.JWT_SECRET || "supersecreto",
      { expiresIn: "7d" }
    );

    return res.json({
      ok: true,
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        tipo: usuario.tipo,
        correoVerificado: usuario.correoVerificado
      }
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ ok: false, message: "Error en login" });
  }
});

module.exports = router;
