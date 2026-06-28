const router = require('express').Router();
const controller = require('../controllers/storesController');
const authProvider = require('../middleware/authProvider');

router.post('/', authProvider, controller.create);
router.get('/:id', controller.getById);
router.get('/provider/all', authProvider, controller.getByProvider);
router.put('/:id', authProvider, controller.update);
router.delete('/:id', authProvider, controller.delete);

module.exports = router;
