async function main() {
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, LogActividad } = require('../models');
const { sendAlertaBloqueo } = require('../utils/emailSender');

const jwtSecret = process.env.JWT_SECRET || 'supersecreto123';
const jwtExpiresIn = '2h';

exports.loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    const user = await User.findOne({ where: { correo } });
    if (!user) {
      await LogActividad.create({
        correo,
        tipo: 'login-fallido',
        mensaje: 'Usuario no encontrado',
      });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar si está bloqueado temporalmente
    const ahora = new Date();
    if (user.bloqueadoHasta && ahora < user.bloqueadoHasta) {
      const minutosRestantes = Math.ceil((user.bloqueadoHasta - ahora) / 60000);
      return res.status(403).json({
        error: `Cuenta bloqueada. Intenta nuevamente en ${minutosRestantes} minutos.`,
      });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.intentosFallidos += 1;

      await LogActividad.create({
        correo: user.correo,
        tipo: 'login-fallido',
        mensaje: `Intento ${user.intentosFallidos} fallido`,
      });

      if (user.intentosFallidos === 3) {
        await sendAlertaBloqueo(user.correo);
      }

      if (user.intentosFallidos >= 5) {
        user.bloqueadoHasta = new Date(Date.now() + 15 * 60 * 1000);
        user.intentosFallidos = 0;

        await LogActividad.create({
          correo: user.correo,
          tipo: 'cuenta-bloqueada',
          mensaje: 'Cuenta bloqueada por exceso de intentos fallidos',
        });
      }

      await user.save();
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Usuario inactivo
    if (!user.activo) {
      return res.status(403).json({ error: 'Usuario suspendido' });
    }

    // Acceso exitoso
    user.intentosFallidos = 0;
    user.bloqueadoHasta = null;
    await user.save();

    await LogActividad.create({
      correo: user.correo,
      tipo: 'login-exitoso',
      mensaje: 'Inicio de sesión exitoso',
    });

    const token = jwt.sign(
      { id: user.id, correo: user.correo, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};}
main()
