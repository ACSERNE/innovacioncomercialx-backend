'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Alerta extends Model {
    static associate(models) {
      Alerta.belongsTo(models.Producto, {
        foreignKey: 'productoId',
        as: 'producto',
      });
    }
  }

  Alerta.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('stock_bajo', 'vencimiento'),
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Alerta',
    tableName: 'alertas',
  });

  return Alerta;
};
