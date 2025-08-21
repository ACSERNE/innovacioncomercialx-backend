const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    host: 'postgres',
    user: 'postgres',
    password: 'valdez98/224',
    database: 'innovacion_db',
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Conectado a Postgres');
  } catch (e) {
    console.error('Error conectando:', e);
  } finally {
    await client.end();
  }
}

testConnection();

