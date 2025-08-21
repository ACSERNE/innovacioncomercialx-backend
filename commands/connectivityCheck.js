const { Client } = require("pg");
require("dotenv").config();

module.exports = async function connectivityCheck() {
  console.log("📡 Testeando conexión a PostgreSQL...");
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    console.log("✅ Conexión exitosa.");
    const res = await client.query("SELECT uuid_generate_v4();");
    console.log("🧬 uuid_generate_v4:", res.rows[0]);
  } catch (err) {
    throw new Error(`❌ Fallo de conexión: ${err.message}`);
  } finally {
    await client.end();
  }
};