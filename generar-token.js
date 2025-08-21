const jwt = require('jsonwebtoken');

// Cambia esto por el `id` del usuario o cualquier dato que quieras codificar
const payload = {
  id: '26152256-k', // puede ser también un UUID u otro identificador único
  role: 'admin' // opcional
};

// Clave secreta (debe coincidir con la de tu archivo `.env`)
const secret = 'supersecreto123'; // o process.env.JWT_SECRET si estás usando dotenv

// Opciones del token
const options = {
  expiresIn: '2h',
};

// Generar el token
const token = jwt.sign(payload, secret, options);

// Mostrar token por consola
console.log('✅ Token generado:\n');
console.log(token);

