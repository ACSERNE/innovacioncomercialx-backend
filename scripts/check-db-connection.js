async function main() {
require('dotenv').config(); // asegurate de tener .env bien configurado
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida correctamente con la base de datos');
  } catch (error) {
    console.error('⛔ Falló la conexión con PostgreSQL:');
    console.error(error.message);
  } finally {
    await sequelize.close();
  }
})();
}
main()
