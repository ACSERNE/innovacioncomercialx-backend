// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken'); // 👈 ESTE ES EL CORRECTO
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ===============================
// RUTAS CRUD
// ===============================
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// ===============================
// RUTA PROTEGIDA: USUARIO AUTENTICADO
// ===============================
router.get('/me/info', verifyToken, async (req, res) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true // 👈 cambia a "role" si tu modelo usa ese nombre
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);

  } catch (error) {
    console.error("Error en /me/info:", error);
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
});

module.exports = router;

