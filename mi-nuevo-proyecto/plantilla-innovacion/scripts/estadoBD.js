const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function reporteBD() {
  try {
    const tablas = await sequelize.query(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = 'public'
       AND table_type = 'BASE TABLE'`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const nombres = tablas.map(t => t.table_name).filter(Boolean);
    const filas = [];

    for (const tabla of nombres) {
      const [{ total }] = await sequelize.query(
        `SELECT COUNT(*) AS total FROM "${tabla}"`,
        { type: sequelize.QueryTypes.SELECT }
      );

      const [{ size }] = await sequelize.query(
        `SELECT pg_size_pretty(pg_total_relation_size('"${tabla}"')) AS size`,
        { type: sequelize.QueryTypes.SELECT }
      );

      const columnas = await sequelize.query(
        `SELECT column_name
         FROM information_schema.columns
         WHERE table_name = :tabla
         AND table_schema = 'public'`,
        {
          replacements: { tabla },
          type: sequelize.QueryTypes.SELECT
        }
      );

      const vacias = [];

      for (const col of columnas) {
        const [{ count }] = await sequelize.query(
          `SELECT COUNT(*) AS count FROM "${tabla}" WHERE "${col.column_name}" IS NOT NULL`,
          { type: sequelize.QueryTypes.SELECT }
        );

        if (parseInt(count) === 0) vacias.push(col.column_name);
      }

      filas.push(`
        <tr>
          <td>${tabla}</td>
          <td>${total}</td>
          <td>${size}</td>
          <td>${vacias.join(', ') || '—'}</td>
        </tr>
      `);
    }

    const html = `
    <html>
      <head>
        <title>Auditoría de Base de Datos</title>
        <style>
          body { font-family: Arial; margin: 2em; background: #f9f9f9; }
          table { border-collapse: collapse; width: 100%; background: #fff; margin-top: 2em; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #007acc; color: white; }
          tr:nth-child(even) { background: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>📄 Informe Técnico: Auditoría de Tablas</h2>
        <table>
          <tr>
            <th>Tabla</th>
            <th>Registros</th>
            <th>Tamaño estimado</th>
            <th>Campos totalmente vacíos</th>
          </tr>
          ${filas.join('')}
        </table>
      </body>
    </html>
    `;

    const fecha = new Date().toISOString().replace(/[:.]/g, '-');
    const ruta = path.join(__dirname, `../logs/reporte-auditoriaBD-${fecha}.html`);
    fs.writeFileSync(ruta, html);

    console.log(`📁 Reporte HTML exportado en: ${ruta}`);
  } catch (err) {
    console.error('❌ Error al generar reporte técnico:', err.message);
  }
}

reporteBD();