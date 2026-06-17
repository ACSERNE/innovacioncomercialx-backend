const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  const result = await authService.login(correo, password);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json(result);
});

module.exports = router;
