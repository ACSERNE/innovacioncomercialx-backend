const { createClient } = require('redis');

// Crear instancia del cliente
const redis = createClient();

// Manejar eventos de conexión
redis.on('error', (err) => {
  console.error('❌ Error en la conexión a Redis:', err);
});

redis.on('connect', () => {
  console.log('✅ Conexión a Redis establecida');
});

// Conectar al servidor Redis
redis.connect().catch(console.error);

module.exports = redis;