const express = require('express');
const router = express.Router();
const { Transaccion, Producto } = require('../models');

// Middleware opcional: autenticar (si tienes JWT, lo pones aquí)

// GET todas las transacciones
router.get('/', async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      include: [{ model: Producto, attributes: ['nombre'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(transacciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
});

// POST crear una transacción
router.post('/', async (req, res) => {
  try {
    const { tipo, cantidad, productoId, precio_unitario, observacion } = req.body;

    if (!tipo || !cantidad || !productoId || !precio_unitario) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const total = cantidad * precio_unitario;

    const nuevaTransaccion = await Transaccion.create({
      tipo,
      cantidad,
      productoId,
      precio_unitario,
      total,
      observacion,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear transacción' });
  }
});

module.exports = router;
