const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Datos del usuario para el payload del token
const userPayload = {
  id:'a2b3c4d5-e6f7-48ab-bcde-123456789abc', // Cambia por un id real de usuario si quieres
  correo: 'innovacioncomercialx@gmail.com',
  role: 'admin', // o 'user'
};

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto123';

// Opciones del token
const options = {
  expiresIn: '2h', // Expira en 2 horas
};

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, options);
}

function main() {
  const token = generateToken(userPayload);
  console.log('Token JWT generado:');
  console.log(token);
}

main();
