const express = require('express');
const router = express.Router();
const tv = require('../services/tv.service');

router.get('/', async (req, res) => {
  res.json(await tv.obtenerTV());
});

module.exports = router;
