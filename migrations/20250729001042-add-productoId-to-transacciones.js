async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = 'transacciones';
    const columnName = 'productoId';

    // ⚠️ Eliminar si ya existe (por errores previos)
    const table = await queryInterface.describeTable(tableName);
    if (table[columnName]) {
      console.log(`⚠️ La columna "${columnName}" ya existe. Será eliminada para recrearla correctamente.`);
      await queryInterface.removeColumn(tableName, columnName);
    }

    // ➕ Volver a agregar como UUID con clave foránea
    console.log(`➕ Agregando columna "${columnName}" como UUID con referencia a "productos(id)"...`);
    await queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    console.log(`✅ Columna "${columnName}" agregada correctamente.`);
  },

  async down(queryInterface) {
    console.log(`🗑️ Eliminando columna "productoId" de la tabla "transacciones"...`);
    await queryInterface.removeColumn('transacciones', 'productoId');
  }
};
}
main()
