async function main() {
'use strict';

module.exports = {
  async up(queryInterface) {
    // Comprobar si la columna existe no es trivial, aquí un workaround básico:
    const tableDesc = await queryInterface.describeTable('productos');
    if (!tableDesc.userId) {
      await queryInterface.addColumn('productos', 'userId', {
        type: 'UUID',
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('productos', 'userId');
  }
};
}
main()
