const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token mal formado' });

  jwt.verify(token, process.env.JWT_SECRET || 'supersecreto123', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido o expirado' });

    req.user = decoded; // agregar info del usuario al request
    next();
  });
};

// Middleware para verificar rol
exports.hasRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: 'No tienes permiso' });
  }
  next();
};

// Middleware para refrescar token (opcional, según implementación)
exports.refreshTokenIfNeeded = (req, res, next) => {
  // Aquí puedes agregar lógica para refrescar token si está próximo a expirar
  next();
};
