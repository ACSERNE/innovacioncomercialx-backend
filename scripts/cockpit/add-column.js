async function main() {
const { Pool } = require('pg');
require('dotenv').config();

const [table, column, type, defaultValueRaw] = process.argv.slice(2);

if (!table || !column || !type) {
  console.error('❌ Uso: node add-column.js <tabla> <columna> <tipo> [valor_por_defecto]');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  try {
    // Verificar si la columna ya existe
    const check = await pool.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND column_name = $2`,
      [table, column]
    );

    if (check.rows.length > 0) {
      console.log(`⚠️ La columna "${column}" ya existe en la tabla "${table}".`);
      await pool.end();
      return;
    }

    // Construir cláusula DEFAULT si existe
    let defaultClause = '';
    if (defaultValueRaw !== undefined) {
      // Tipos que requieren comillas en el valor por defecto
      const needsQuotes = ['text', 'varchar', 'char', 'date', 'uuid'].some(t =>
        type.toLowerCase().includes(t)
      );
      const defaultValue = needsQuotes ? `'${defaultValueRaw}'` : defaultValueRaw;
      defaultClause = `DEFAULT ${defaultValue}`;
    }

    // Construir la consulta ALTER TABLE para agregar columna
    const query = `ALTER TABLE ${table} ADD COLUMN ${column} ${type} ${defaultClause};`;

    await pool.query(query);
    console.log(`✅ Columna "${column}" agregada correctamente con tipo ${type}.`);
    await pool.end();
  } catch (err) {
    console.error('❌ Error al agregar columna:', err.message);
    await pool.end();
  }
})();
}
main()
