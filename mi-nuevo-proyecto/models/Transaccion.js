'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Transaccion extends Model {
    static associate(models) {
      Transaccion.belongsTo(models.Producto, {
        foreignKey: 'productoId',
        as: 'producto',
      });

      Transaccion.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'usuario',
      });
    }
  }

  Transaccion.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('venta', 'compra', 'entrada', 'salida'),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Transaccion',
    tableName: 'transacciones',
    timestamps: true
  });

  return Transaccion;
};
