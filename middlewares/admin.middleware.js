async function main() {
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware para validar token y verificar que el usuario sea administrador
exports.requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: 'Token no proporcionado' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecreto123');

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!user.activo) {
      return res.status(403).json({ error: 'Usuario suspendido o inactivo' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
    }

    req.user = user; // Guardamos el usuario en la request
    next();
  } catch (error) {
    console.error('Error en requireAdmin:', error);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
}
main()
