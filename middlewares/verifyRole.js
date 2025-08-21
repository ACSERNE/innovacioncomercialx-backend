module.exports = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(401).json({ error: 'No autenticado o sin rol asignado' });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ error: `Permiso denegado. Se requiere rol: ${requiredRole}` });
    }

    next(); // Tiene el rol correcto, puede continuar
  };
};