// middlewares/authorizeUserOrAdmin.js
module.exports = function (req, res, next) {
  const userId = req.params.id;
  const requester = req.user;

  if (!requester) {
    return res.status(401).json({ error: 'Token inválido o no proporcionado' });
  }

  if (requester.role === 'admin' || requester.id === userId) {
    return next();
  }

  return res.status(403).json({ error: 'Acceso denegado: solo el propietario o admin puede realizar esta acción' });
};
