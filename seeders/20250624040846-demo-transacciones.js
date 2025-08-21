async function main() {
'use strict';

const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = path.join(logDir, `seed-log-${new Date().toISOString().replace(/[:.]/g, '-')}.txt`);

const log = (msg) => {
  fs.appendFileSync(logFile, msg + '\n');
  console.log(msg);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    log('🚀 Iniciando inserción de transacciones demo...');

    try {
      // Verificamos columnas de productos
      const [colsProductos] = await queryInterface.sequelize.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'productos';
      `);

      // Elegimos el nombre correcto para el precio
      const precioCol = colsProductos.some(c => c.column_name === 'precio_venta_unitario')
        ? 'precio_venta_unitario'
        : (colsProductos.some(c => c.column_name === 'precio_venta') ? 'precio_venta' : null);

      if (!precioCol) {
        log('❌ No se encontró columna de precio válida en productos.');
        return;
      }

      // Obtener primer usuario
      const [users] = await queryInterface.sequelize.query(`SELECT id FROM users LIMIT 1;`);
      if (!users.length) {
        log('❌ No se encontró ningún usuario en users.');
        return;
      }

      // Obtener productos (mínimo 2)
      const [productos] = await queryInterface.sequelize.query(`SELECT id, ${precioCol} FROM productos LIMIT 2;`);
      if (productos.length < 2) {
        log('❌ No se encontraron al menos dos productos.');
        return;
      }

      const userId = users[0].id;
      const productoA = productos[0];
      const productoB = productos[1];

      const transacciones = [
        {
          id: uuidv4(),
          userId,                         // O user_id si tu tabla usa snake_case
          productoId: productoA.id,       // O producto_id según el modelo
          cantidad: 1,
          total: productoA[precioCol] * 1,
          descripcion: 'Venta producto A',
          tipo: 'ingreso',
          fecha: dayjs().format('YYYY-MM-DD'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          userId,
          productoId: productoB.id,
          cantidad: 2,
          total: productoB[precioCol] * 2,
          descripcion: 'Venta producto B (x2)',
          tipo: 'ingreso',
          fecha: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          userId,
          productoId: productoA.id,
          cantidad: 1,
          total: productoA[precioCol] * 1,
          descripcion: 'Compra insumo para producto A',
          tipo: 'egreso',
          fecha: dayjs().subtract(2, 'days').format('YYYY-MM-DD'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert('transacciones', transacciones);
      log(`✅ Transacciones demo insertadas: ${transacciones.length}`);

    } catch (error) {
      log(`❌ Error en inserción de transacciones: ${error.message}`);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transacciones', {
      descripcion: {
        [Op.in]: ['Venta producto A', 'Venta producto B (x2)', 'Compra insumo para producto A']
      }
    });
    log('↩️ Transacciones demo eliminadas.');
  }
};
}
main()
