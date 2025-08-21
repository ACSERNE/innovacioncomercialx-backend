#!/bin/bash

FILENAME="migrations/$(date +%Y%m%d%H%M%S)-reset-productoId-column.js"

cat > $FILENAME <<EOF
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('transacciones', 'productoId');

    await queryInterface.addColumn('transacciones', 'productoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    console.log('✅ Columna productoId eliminada y recreada como INTEGER nullable');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('transacciones', 'productoId');

    await queryInterface.addColumn('transacciones', 'productoId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    console.log('↩️ Migración revertida: productoId restablecida');
  }
};
EOF

echo "Archivo de migración creado: $FILENAME"
