require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  },
  docker: {
    // opcional si querés separar entorno docker explícitamente
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'postgres', // si usás docker-compose con nombre de servicio
    port: 5432,
    dialect: 'postgres',
    logging: false,
  }
};