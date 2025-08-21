'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'enum_transacciones_tipo'
        ) THEN
          CREATE TYPE "enum_transacciones_tipo" AS ENUM ('venta');
        ELSIF NOT EXISTS (
          SELECT 1 FROM pg_enum
          WHERE enumlabel = 'venta'
          AND enumtypid = (
            SELECT oid FROM pg_type WHERE typname = 'enum_transacciones_tipo'
          )
        ) THEN
          ALTER TYPE "enum_transacciones_tipo" ADD VALUE 'venta';
        END IF;
      END
      $$;
    `);
  },

  async down(queryInterface, Sequelize) {
    // PostgreSQL no permite eliminar valores ENUM directamente
    return Promise.resolve();
  }
};
