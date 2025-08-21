async function main() {
// Middleware para verificar si el usuario autenticado es el autor del recurso o admin
module.exports = function authorizeOwnerOrAdmin(getResourceById) {
  return async (req, res, next) => {
    const { id } = req.params; // ID del recurso
    const requester = req.user;

    if (!requester) {
      return res.status(401).json({ error: 'No autenticado. Token inválido o no proporcionado' });
    }

    try {
      const resource = await getResourceById(id);
      if (!resource) {
        return res.status(404).json({ error: 'Recurso no encontrado' });
      }

      // Si es admin o el dueño del recurso (por userId), permitir
      if (requester.role === 'admin' || resource.userId === requester.id) {
        return next();
      }

      return res.status(403).json({ error: 'Acceso denegado: solo el autor o admin puede realizar esta acción' });
    } catch (error) {
      console.error('Error en authorizeOwnerOrAdmin:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
};
}
main()
