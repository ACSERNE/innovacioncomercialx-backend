async function main() {
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: 'Token no proporcionado' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecreto123');

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
    if (!user.activo) return res.status(403).json({ error: 'Usuario suspendido' });

    req.user = user.toJSON();
    next();
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
  }
  next();
};

exports.hasRole = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
};

exports.refreshTokenIfNeeded = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();

    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) return next();

    const exp = decoded.payload.exp;
    const now = Math.floor(Date.now() / 1000);

    if (exp - now < 600) {
      const newToken = jwt.sign(
        { id: decoded.payload.id, correo: decoded.payload.correo, role: decoded.payload.role },
        process.env.JWT_SECRET || 'supersecreto123',
        { expiresIn: '2h' }
      );
      res.setHeader('x-refresh-token', newToken);
    }

    next();
  } catch {
    next();
  }
};
}
main()
