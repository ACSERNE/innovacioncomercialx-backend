const express = require("express");
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const userController = require("../controllers/user.controller");

// Rutas correctas
router.get("/", authenticate, userController.getAll);
router.get("/:id", authenticate, userController.getById);

module.exports = router;

