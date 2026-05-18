const { Alerta } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const alertas = await Alerta.findAll();
    res.json(alertas);
  } catch (error) {
    console.error("Error getAll alertas:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
