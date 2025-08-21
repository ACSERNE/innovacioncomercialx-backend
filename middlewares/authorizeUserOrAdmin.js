// Permite acceso solo si el usuario autenticado es admin o el propietario del recurso
module.exports = function authorizeUserOrAdmin(req, res, next) {
  const userIdParam = req.params.id;
  const requester = req.user;

  // Verificar si el token ya ha sido validado y el usuario está en req.user
  if (!requester) {
    return res.status(401).json({ error: 'No autenticado. Token inválido o no proporcionado' });
  }

  // Permitir si es admin
  if (requester.role === 'admin') {
    return next();
  }

  // Permitir si es el mismo usuario accediendo a su recurso
  if (requester.id === userIdParam) {
    return next();
  }

  // En cualquier otro caso, denegar
  return res.status(403).json({
    error: 'Acceso denegado: solo el propietario o un administrador puede realizar esta acción',
  });
};
