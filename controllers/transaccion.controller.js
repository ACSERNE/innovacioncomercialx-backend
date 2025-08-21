async function main() {
const { Transaccion } = require('../models');

const isDev = process.env.NODE_ENV !== 'production';

exports.createTransaccion = async (req, res) => {
  try {
    const {
      productoId,     // debe venir con este nombre
      userId,
      tipo,
      cantidad,
      precio_unitario,
      total,
      metodo_pago,
      fecha
    } = req.body;

    // Validaciones básicas
    if (!productoId || !userId || !tipo || !cantidad || !precio_unitario || !total || !metodo_pago) {
      return res.status(400).json({ error: 'Faltan datos obligatorios para crear la transacción' });
    }

    const nuevaTransaccion = await Transaccion.create({
      productoId,
      userId,
      tipo,
      cantidad,
      precio_unitario,
      total,
      metodo_pago,
      fecha: fecha || new Date() // si no se envía fecha, asigna la fecha actual
    });

    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    console.error('Error creando transacción:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      detalles: isDev ? error.message : undefined
    });
  }
};

exports.listarTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.json(transacciones);
  } catch (error) {
    console.error('Error listando transacciones:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      detalles: isDev ? error.message : undefined
    });
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
    res.status(500).json({
      error: 'Error interno del servidor',
      detalles: isDev ? error.message : undefined
    });
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
    res.status(500).json({
      error: 'Error interno del servidor',
      detalles: isDev ? error.message : undefined
    });
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
    res.status(500).json({
      error: 'Error interno del servidor',
      detalles: isDev ? error.message : undefined
    });
  }
};
}
main()
