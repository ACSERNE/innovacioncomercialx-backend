// middlewares/checkUserActive.js
module.exports = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  if (!req.user.activo) {
    return res.status(403).json({ error: 'Usuario suspendido. Contacta al administrador.' });
  }

  next();
};
