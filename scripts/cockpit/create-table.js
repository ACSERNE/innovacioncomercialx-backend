async function main() {
require('dotenv').config(); // ✅ Carga las variables de entorno desde .env
const { Pool } = require('pg');
const [tableName] = process.argv.slice(2);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "${tableName}" (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log(`🛠️ Tabla "${tableName}" creada con estructura base cockpit.`);
    await pool.end();
  } catch (err) {
    console.error('⛔ Error creando la tabla:', err.message);
  }
})();
}
main()
