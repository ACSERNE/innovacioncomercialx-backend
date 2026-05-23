const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth');
const userController = require('../controllers/user.controller');

// Rutas CRUD de usuarios
router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.post('/', authenticate, userController.createUser);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

// Ruta adicional: información del usuario autenticado
router.get('/me/info', authenticate, async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const user = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { id: true, nombre: true, correo: true, rol: true }
    });

    res.json(user);
  } catch (error) {
    console.error("Error en /me/info:", error);
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
});

module.exports = router;

