const router = require('express').Router();
const controller = require('../controllers/providersController');
const authProvider = require('../middleware/authProvider');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', authProvider, controller.me);
router.put('/update', authProvider, controller.update);
router.post('/verify-email', authProvider, controller.verifyEmail);
router.post('/verify-phone', authProvider, controller.verifyPhone);
router.post('/verify-identity', authProvider, controller.verifyIdentity);

module.exports = router;
