'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // sin .js

const Transaccion = sequelize.define('Transaccion', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  productoId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'productos',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia', 'otro'),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('venta', 'compra'),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'transacciones',
  timestamps: true,
});

module.exports = Transaccion;
