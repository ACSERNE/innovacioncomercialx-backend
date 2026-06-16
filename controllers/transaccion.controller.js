const transaccionService = require('../services/transaccion.service');

exports.getAll = async (req, res) => {
  try {
    const transacciones = await transaccionService.getAll();
    res.json(transacciones);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.getById = async (req, res) => {
  try {
    const transaccion = await transaccionService.getById(req.params.id);
    if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
    res.json(transaccion);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.create = async (req, res) => {
  try {
    const transaccion = await transaccionService.create(req.body);
    res.status(201).json(transaccion);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};
