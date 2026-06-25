const bcrypt = require("bcrypt");
const db = require("../models");
const { generarToken } = require("../utils/jwt");

const UsuarioAuth = db.UsuarioAuth;

exports.registro = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    const existe = await UsuarioAuth.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const usuario = await UsuarioAuth.create({
      nombre,
      correo,
      password: hashed
    });

    return res.json({
      mensaje: "Usuario registrado",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await UsuarioAuth.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const token = generarToken(usuario);

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.me = async (req, res) => {
  return res.json({ usuario: req.user });
};
