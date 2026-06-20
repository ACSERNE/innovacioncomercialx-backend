const bcrypt = require('bcryptjs'); // o bcrypt

exports.loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    const user = await User.findOne({ where: { correo } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar contraseña con bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (!user.activo) {
      return res.status(403).json({ error: 'Usuario suspendido' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, correo: user.correo, role: user.role },
      process.env.JWT_SECRET || 'supersecreto123',
      { expiresIn: '2h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
