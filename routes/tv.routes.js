const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tv.controller');

router.get('/', tvController.obtenerTV);

module.exports = router;
