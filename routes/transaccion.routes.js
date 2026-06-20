const express = require('express');
const router = express.Router();
const transaccionService = require('../services/transaccion.service');

// ===============================
// POST /api/transacciones
// ===============================
router.post('/', async (req, res) => {
  try {
    const { usuarioId, productos } = req.body;

    // Validación inicial
    if (!usuarioId) {
      return res.status(400).json({ error: "usuarioId es obligatorio" });
    }

    if (!Array.isArray(productos)) {
      return res.status(400).json({ error: "El campo 'productos' debe ser un array" });
    }

    const transaccion = await transaccionService.registrarVenta(usuarioId, productos);

    res.json(transaccion);

  } catch (error) {
    console.error("ERROR EN POST /api/transacciones:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
