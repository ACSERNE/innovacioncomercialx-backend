const { Usuario } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ===============================
// REGISTRO
// ===============================
exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!correo) {
      return res.status(400).json({ error: "Falta el correo" });
    }

    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      correo,
      password: hash
    });

    res.status(201).json({ mensaje: "Usuario registrado", usuario });
  } catch (error) {
    console.error("❌ Error registrando usuario:", error);
    res.status(500).json({ error: "Error registrando usuario" });
  }
};

// ===============================
// LOGIN
// ===============================
exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo) {
      return res.status(400).json({ error: "Falta el correo" });
    }

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "7d" }
    );

    res.json({ mensaje: "Login correcto", token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};
