const flujoCajaService = require('../services/flujoCaja.service');

exports.getDiario = async (req, res) => {
  try {
    const { fecha } = req.query;
    const data = await flujoCajaService.getDiario(fecha);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};
