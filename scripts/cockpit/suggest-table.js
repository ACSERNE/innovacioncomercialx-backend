async function main() {
const { Pool } = require('pg');
const [tableName] = process.argv.slice(2);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = $1
      )
    `, [tableName]);

    const exists = result.rows[0].exists;
    if (exists) {
      console.log(`✅ La tabla "${tableName}" ya existe.`);
    } else {
      console.log(`❌ La tabla "${tableName}" NO existe.`);
      console.log(`➡️ Ejecutá: node scripts/cockpit/create-table.js ${tableName}`);
    }
    await pool.end();
  } catch (err) {
    console.error('⛔ Error verificando la tabla:', err.message);
  }
})();
}
main()
