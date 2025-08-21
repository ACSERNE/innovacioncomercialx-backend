async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING(150),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'), // ← Enum para alinearse con el modelo
        allowNull: false,
        defaultValue: 'user',
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      intentosFallidos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bloqueadoHasta: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";'); // ← Limpia el ENUM en rollback
  },
};}
main()
