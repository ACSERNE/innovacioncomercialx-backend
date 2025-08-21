async function main() {
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  },

  async down(queryInterface) {
    // No hacemos nada aquí para evitar errores porque la extensión está en uso
  },
};
}
main()
