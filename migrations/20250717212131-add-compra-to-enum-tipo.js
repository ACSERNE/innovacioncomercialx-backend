'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_enum
          WHERE enumlabel = 'compra'
          AND enumtypid = (
            SELECT oid FROM pg_type WHERE typname = 'enum_transacciones_tipo'
          )
        ) THEN
          ALTER TYPE "enum_transacciones_tipo" ADD VALUE 'compra';
        END IF;
      END
      $$;
    `);
  },

  async down(queryInterface, Sequelize) {
    // PostgreSQL no permite eliminar valores de ENUM directamente
    return Promise.resolve();
  }
};
