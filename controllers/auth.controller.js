async function main() {
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, LogActividad } = require('../models');
const { sendAlertaBloqueo } = require('../utils/emailSender');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'supersecreto123';
const jwtExpiresIn = '2h';

// 🟢 Registro
exports.register = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const existingUser = await User.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const user = await User.create({ nombre, correo, password, role: 'user', activo: true });

    await sendAlertaBloqueo(
      user.correo,
      `Hola ${user.nombre}, bienvenido a Innovacion ComercialX! Gracias por registrarte.`
    );

    const token = jwt.sign(
      { id: user.id, correo: user.correo, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: { id: user.id, nombre: user.nombre, correo: user.correo },
      token
    });
  } catch (error) {
    console.error('❌ Error en register:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// 🔐 Login con generación de código 2FA
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

    const ahora = new Date();
    if (user.bloqueadoHasta && ahora < user.bloqueadoHasta) {
      const minutosRestantes = Math.ceil((user.bloqueadoHasta - ahora) / 60000);
      return res.status(403).json({
        error: `Cuenta bloqueada. Intenta nuevamente en ${minutosRestantes} minutos.`,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      user.intentosFallidos += 1;

      await LogActividad.create({
        correo: user.correo,
        tipo: 'login-fallido',
        mensaje: `Intento ${user.intentosFallidos} fallido`,
      });

      if (user.intentosFallidos === 3) {
        await sendAlertaBloqueo(user.correo, '⚠️ Tres intentos fallidos de inicio de sesión.');
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

    if (!user.activo) {
      return res.status(403).json({ error: 'Usuario suspendido' });
    }

    user.intentosFallidos = 0;
    user.bloqueadoHasta = null;

    // 🔢 Generar código 2FA
    const codigo2FA = Math.floor(100000 + Math.random() * 900000).toString();
    const expiracion = new Date(Date.now() + 10 * 60 * 1000);

    user.codigo2FA = codigo2FA;
    user.codigo2FAExpira = expiracion;

    await user.save();

    await sendAlertaBloqueo(user.correo, `Tu código de verificación 2FA es: ${codigo2FA} (válido por 10 minutos)`);

    await LogActividad.create({
      correo: user.correo,
      tipo: 'login-exitoso-parcial',
      mensaje: 'Login correcto. Código 2FA enviado.',
    });

    res.status(200).json({
      message: 'Código de verificación enviado al correo. Completa el 2FA.',
      requiere2FA: true
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// ✅ Verificación de código 2FA
exports.verify2FA = async (req, res) => {
  try {
    const { correo, codigo } = req.body;

    if (!correo || !codigo) {
      return res.status(400).json({ error: 'Correo y código son obligatorios' });
    }

    const user = await User.findOne({ where: { correo } });

    if (!user || !user.codigo2FA || !user.codigo2FAExpira) {
      return res.status(400).json({ error: 'Código 2FA no solicitado o expirado' });
    }

    const ahora = new Date();
    if (ahora > user.codigo2FAExpira) {
      user.codigo2FA = null;
      user.codigo2FAExpira = null;
      await user.save();
      return res.status(401).json({ error: 'Código expirado. Inicia sesión nuevamente.' });
    }

    if (codigo !== user.codigo2FA) {
      return res.status(401).json({ error: 'Código incorrecto' });
    }

    user.codigo2FA = null;
    user.codigo2FAExpira = null;
    await user.save();

    const token = jwt.sign(
      { id: user.id, correo: user.correo, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    await LogActividad.create({
      correo: user.correo,
      tipo: '2fa-verificado',
      mensaje: 'Código 2FA verificado correctamente',
    });

    res.status(200).json({ message: '2FA verificado con éxito', token });
  } catch (error) {
    console.error('❌ Error en verify2FA:', error);
    res.status(500).json({ error: 'Error al verificar código 2FA' });
  }
};

// 🔁 Reset de contraseña (solo admin)
exports.resetPassword = async (req, res) => {
  try {
    const { correoObjetivo } = req.body;

    if (!correoObjetivo) {
      return res.status(400).json({ error: 'Debes proporcionar el correo del usuario a resetear' });
    }

    const user = await User.findOne({ where: { correo: correoObjetivo } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const nuevaPassword = crypto.randomBytes(8).toString('hex');
    user.password = nuevaPassword;
    user.intentosFallidos = 0;
    user.bloqueadoHasta = null;
    await user.save();

    await LogActividad.create({
      correo: user.correo,
      tipo: 'reset-password-admin',
      mensaje: `Contraseña reseteada por admin ${req.user.correo}`,
    });

    await sendAlertaBloqueo(
      user.correo,
      `Tu contraseña ha sido restablecida por un administrador.\nNueva clave: ${nuevaPassword}`
    );

    res.status(200).json({
      mensaje: 'Contraseña reseteada exitosamente',
      nuevaPassword // ⚠️ Mostrar solo en desarrollo
    });
  } catch (error) {
    console.error('❌ Error al resetear contraseña:', error);
    res.status(500).json({ error: 'Error al resetear contraseña del usuario' });
  }
};
}
main()
