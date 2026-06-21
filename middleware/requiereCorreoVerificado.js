module.exports = function(req, res, next) {
  try {
    if (!req.usuario) {
      return res.status(401).json({ ok: false, message: "Token requerido" });
    }

    if (!req.usuario.correoVerificado && req.usuario.correoVerificado !== true) {
      return res.status(403).json({
        ok: false,
        message: "Debes verificar tu correo para realizar esta acción"
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Error validando verificación de correo" });
  }
};
