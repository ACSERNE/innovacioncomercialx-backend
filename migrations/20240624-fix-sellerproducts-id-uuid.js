'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Crear columna temporal UUID
    await queryInterface.addColumn('SellerProducts', 'id_uuid', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false
    });

    // 2. Eliminar PK vieja
    await queryInterface.removeConstraint('SellerProducts', 'SellerProducts_pkey');

    // 3. Eliminar columna vieja
    await queryInterface.removeColumn('SellerProducts', 'id');

    // 4. Renombrar columna nueva
    await queryInterface.renameColumn('SellerProducts', 'id_uuid', 'id');

    // 5. Crear nueva PK
    await queryInterface.addConstraint('SellerProducts', {
      fields: ['id'],
      type: 'primary key',
      name: 'SellerProducts_pkey'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('SellerProducts', 'id_int', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false
    });

    await queryInterface.removeConstraint('SellerProducts', 'SellerProducts_pkey');
    await queryInterface.removeColumn('SellerProducts', 'id');
    await queryInterface.renameColumn('SellerProducts', 'id_int', 'id');

    await queryInterface.addConstraint('SellerProducts', {
      fields: ['id'],
      type: 'primary key',
      name: 'SellerProducts_pkey'
    });
  }
};
