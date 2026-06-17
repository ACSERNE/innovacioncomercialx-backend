const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // 100 requests por minuto
  message: {
    error: "Demasiadas solicitudes, intenta nuevamente en un minuto."
  }
});
