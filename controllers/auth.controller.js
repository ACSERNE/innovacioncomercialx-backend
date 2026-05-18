const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const valid = await user.validPassword(password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id, correo: user.correo, role: user.role },
      process.env.JWT_SECRET || 'supersecreto123',
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
