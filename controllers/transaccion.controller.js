const { Transaccion } = require('../models');

exports.createTransaccion = async (req, res) => {
  try {
    const nuevaTransaccion = await Transaccion.create(req.body);
    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    console.error('Error creando transacción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.listarTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.json(transacciones);
  } catch (error) {
    console.error('Error listando transacciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.obtenerTransaccionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const transaccion = await Transaccion.findByPk(id);
    if (!transaccion) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    res.json(transaccion);
  } catch (error) {
    console.error('Error obteniendo transacción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.actualizarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Transaccion.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    const transaccionActualizada = await Transaccion.findByPk(id);
    res.json(transaccionActualizada);
  } catch (error) {
    console.error('Error actualizando transacción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.eliminarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaccion.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error eliminando transacción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
