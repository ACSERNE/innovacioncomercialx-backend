async function main() {
const express = require('express');
const router = express.Router();
const { Transaccion, Producto } = require('../models');

// GET todas las transacciones (protegido en app.js)
router.get('/', async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      include: [{ model: Producto, as: 'producto', attributes: ['nombre'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(transacciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
});

// POST crear una transacción (protegido en app.js)
router.post('/', async (req, res) => {
  try {
    const { tipo, cantidad, productoId, precio_unitario, observacion, metodo_pago } = req.body;
    const userId = req.user.id; // req.user viene del middleware authenticate

    if (!tipo || !cantidad || !productoId || !precio_unitario || !metodo_pago) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const tiposPermitidos = ['venta', 'compra', 'entrada', 'salida'];
    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).json({ error: `Tipo inválido: ${tipo}` });
    }

    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (tipo === 'venta' || tipo === 'salida') {
      if (producto.stock < cantidad) {
        return res.status(400).json({ error: 'Stock insuficiente para esta transacción' });
      }
      producto.stock -= cantidad;
    } else if (tipo === 'compra' || tipo === 'entrada') {
      producto.stock += cantidad;
    }

    await producto.save();

    const total = cantidad * precio_unitario;

    const nuevaTransaccion = await Transaccion.create({
      tipo,
      cantidad,
      productoId,
      precio_unitario,
      total,
      observacion,
      metodo_pago,
      userId,
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
}
main()
