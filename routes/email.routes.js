const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

router.post('/test', async (req, res) => {
  try {
    await emailService.enviarCorreo(
      process.env.EMAIL_ADMIN,
      "Correo de prueba",
      "<h1>Funciona correctamente</h1>"
    );
    res.json({ mensaje: "Correo enviado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
