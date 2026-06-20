// scripts/verTablas.js
const { sequelize } = require('../models'); // Ajusta la ruta a tu carpeta de modelos

async function verTablasYColumnas() {
  try {
    const tablas = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type='BASE TABLE';
    `, { type: sequelize.QueryTypes.SELECT });

    console.log('📋 Tablas en la base de datos:');
    for (const { table_name } of tablas) {
      console.log(`\n🔹 Tabla: ${table_name}`);

      const columnas = await sequelize.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = '${table_name}';
      `, { type: sequelize.QueryTypes.SELECT });

      columnas.forEach(col => {
        console.log(`   - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? '[NOT NULL]' : ''}`);
      });
    }

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error al obtener tablas/columnas:', error);
  }
}

verTablasYColumnas();
