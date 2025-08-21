async function main() {
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('users', {
      id: [
        'd8db2f10-d778-41c7-b427-5734499240bc',
        '7b91b15c-bbd8-4273-8c18-080997ead3e6',
        'a2b3c4d5-e6f7-48ab-bcde-123456789abc'
      ],
    });
    console.log('Usuarios eliminados para permitir nueva inserción.');
  },

  async down() {
    // No revertir esta acción
  }
};
}
main()
