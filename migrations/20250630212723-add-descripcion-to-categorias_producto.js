async function main() {
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name='categorias_producto' AND column_name='descripcion'
        ) THEN
          ALTER TABLE categorias_producto ADD COLUMN descripcion VARCHAR;
        END IF;
      END
      $$;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('categorias_producto', 'descripcion');
  }
};

}
main()
