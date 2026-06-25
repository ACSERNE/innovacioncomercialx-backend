const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "super_secret_key";

function generarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre
    },
    SECRET,
    { expiresIn: "7d" }
  );
}

function verificarToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generarToken, verificarToken };
