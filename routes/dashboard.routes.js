const express = require('express');
const router = express.Router();
const dashboard = require('../services/dashboard.service');

router.get('/', async (req, res) => {
  res.json(await dashboard.obtenerDashboard());
});

module.exports = router;
