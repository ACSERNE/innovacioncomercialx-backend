'use strict';
const { Sequelize } = require('sequelize');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variables de entorno
const DB_HOST = process.env.DB_HOST || 'postgres';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin123';
const DB_NAME = process.env.DB_NAME || 'innovacion_db';
const PORT = process.env.PORT || 5001;

// Conexión Sequelize con retry
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
  retry: { max: 10 }
});

async function connectWithRetry(retries = 10, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión a la base de datos exitosa');
      return;
    } catch (err) {
      console.log(`⚠️  Falló conexión a DB, reintentando en ${delay/1000}s... (${i+1}/${retries})`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error('❌ No se pudo conectar a la base de datos después de varios intentos');
  process.exit(1);
}

// Ruta de prueba
app.get('/', (req, res) => res.send('Backend corriendo 🚀'));

(async () => {
  await connectWithRetry();
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
})();
