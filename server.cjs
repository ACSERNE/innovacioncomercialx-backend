'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { Sequelize } = require('sequelize');

// Inicializar Sequelize con variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa');
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

// Levantar servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
