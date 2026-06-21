const express = require('express');
const router = express.Router();
const ventaService = require('../services/venta.service');
const { verificarToken } = require('../middleware/auth');
const requiereCorreoVerificado = require('../middleware/requiereCorreoVerificado');

// LISTAR
router.get('/', verificarToken, requiereCorreoVerificado, async (req, res) => {
  try {
    const ventas = await ventaService.listar();
    res.json(ventas);
  } catch (error) {
    console.error("Error en GET /ventas:", error);
    res.status(500).json({ error: "Error obteniendo ventas" });
  }
});

// OBTENER POR ID
router.get('/:id', verificarToken, requiereCorreoVerificado, async (req, res) => {
  try {
    const venta = await ventaService.obtener(req.params.id);
    res.json(venta);
  } catch (error) {
    console.error("Error en GET /ventas/:id:", error);
    res.status(500).json({ error: "Error obteniendo venta" });
  }
});

// CREAR
router.post('/', verificarToken, requiereCorreoVerificado, async (req, res) => {
  try {
    const data = {
      usuarioId: req.usuario.id,
      items: req.body.items
    };

    const venta = await ventaService.crear(data);
    res.json(venta);
  } catch (error) {
    console.error("Error en POST /ventas:", error);
    res.status(500).json({ ok: false, message: "Error creando venta" });
  }
});

// ELIMINAR
router.delete('/:id', verificarToken, requiereCorreoVerificado, async (req, res) => {
  try {
    const venta = await ventaService.obtener(req.params.id);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    await venta.destroy();
    res.json({ ok: true, message: "Venta eliminada" });
  } catch (error) {
    console.error("Error en DELETE /ventas/:id:", error);
    res.status(500).json({ error: "Error eliminando venta" });
  }
});

module.exports = router;
