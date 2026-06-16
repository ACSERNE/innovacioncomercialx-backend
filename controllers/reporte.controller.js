const reporteService = require('../services/reporte.service');

exports.getAll = async (req, res) => {
  try {
    const reportes = await reporteService.getAll();
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.getById = async (req, res) => {
  try {
    const reporte = await reporteService.getById(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json(reporte);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.create = async (req, res) => {
  try {
    const reporte = await reporteService.create(req.body);
    res.status(201).json(reporte);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};
