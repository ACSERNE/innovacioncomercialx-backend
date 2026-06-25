const express = require('express');
const router = express.Router();
const controller = require('../controllers/tvController');

router.get('/', controller.estado);

module.exports = router;
