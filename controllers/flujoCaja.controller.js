const { FlujoCaja } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const registros = await FlujoCaja.findAll();
    res.json(registros);
  } catch (error) {
    console.error("Error getAll flujoCaja:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.create = async (req, res) => {
  try {
    const registro = await FlujoCaja.create(req.body);
    res.json(registro);
  } catch (error) {
    console.error("Error create flujoCaja:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
