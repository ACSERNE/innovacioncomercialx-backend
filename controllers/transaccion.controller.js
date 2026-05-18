const { Transaccion } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.json(transacciones);
  } catch (error) {
    console.error("Error getAll transacciones:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.create = async (req, res) => {
  try {
    const transaccion = await Transaccion.create(req.body);
    res.json(transaccion);
  } catch (error) {
    console.error("Error create transaccion:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
