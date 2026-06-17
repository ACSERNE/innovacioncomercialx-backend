const reporteService = require('../services/reporte.service');

exports.reporteDiario = async (req, res) => {
  try {
    const data = await reporteService.generarReporteDiario();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generando reporte diario' });
  }
};
