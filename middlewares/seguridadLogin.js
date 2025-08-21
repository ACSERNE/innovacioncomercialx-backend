const redis = require('../utils/redisClient');
const { LogActividad } = require('../models');
const { sendAlertaBloqueo } = require('../utils/emailSender');

const MAX_INTENTOS_IP = 5;
const NOTIFICAR_IP_EN = 3;

module.exports = async function seguridadLogin(req, res, next) {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'desconocida';
    const keyIP = `login-ip:${ip}`;

    // Incrementar contador de IP en Redis
    const intentosIP = await redis.incr(keyIP);

    if (intentosIP === 1) {
      await redis.expire(keyIP, 600); // 10 minutos
    }

    // Registrar actividad
    await LogActividad.create({
      correo: req.body.correo || 'desconocido',
      tipo: 'intento-login-ip',
      mensaje: `Intento número ${intentosIP} desde IP ${ip}`,
    });

    // Notificar por correo si llega a cierto umbral
    if (intentosIP === NOTIFICAR_IP_EN && req.body.correo) {
      await sendAlertaBloqueo(req.body.correo);
    }

    // Bloqueo temporal por IP
    if (intentosIP >= MAX_INTENTOS_IP) {
      return res.status(429).json({
        error: 'Demasiados intentos desde esta IP. Intenta nuevamente más tarde.',
      });
    }

    next(); // Continuar con el login
  } catch (error) {
    console.error('❌ Error en seguridadLogin middleware:', error);
    res.status(500).json({ error: 'Error en verificación de seguridad' });
  }
};