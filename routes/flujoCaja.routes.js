const express = require('express');
const router = express.Router();
const flujoCajaController = require('../controllers/flujoCaja.controller');

router.get('/', flujoCajaController.getAllFlujos);
router.post('/', flujoCajaController.createFlujo);
router.delete('/:id', flujoCajaController.deleteFlujo);

module.exports = router;
