const jwt = require("jsonwebtoken");

module.exports = {
  verificarToken: (req, res, next) => {
    try {
      const token = req.headers["authorization"];

      if (!token) {
        return res.status(401).json({ ok: false, message: "Token requerido" });
      }

      const tokenLimpio = token.replace("Bearer ", "");

      const decoded = jwt.verify(
        tokenLimpio,
        process.env.JWT_SECRET || "supersecreto"
      );

      req.usuario = decoded;
      next();

    } catch (error) {
      return res.status(401).json({ ok: false, message: "Token inválido o expirado" });
    }
  },

  soloComprador: (req, res, next) => {
    if (req.usuario.tipo !== "comprador") {
      return res.status(403).json({ ok: false, message: "Acceso solo para compradores" });
    }
    next();
  },

  soloProveedor: (req, res, next) => {
    if (req.usuario.tipo !== "proveedor") {
      return res.status(403).json({ ok: false, message: "Acceso solo para proveedores" });
    }
    next();
  },

  soloAdmin: (req, res, next) => {
    if (req.usuario.tipo !== "admin") {
      return res.status(403).json({ ok: false, message: "Acceso solo para administradores" });
    }
    next();
  }
};
