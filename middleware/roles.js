module.exports = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario || !usuario.roles)
      return res.status(403).json({ error: 'Acceso denegado' });

    const tieneRol = usuario.roles.some(r => rolesPermitidos.includes(r));

    if (!tieneRol)
      return res.status(403).json({ error: 'No tienes permisos' });

    next();
  };
};
