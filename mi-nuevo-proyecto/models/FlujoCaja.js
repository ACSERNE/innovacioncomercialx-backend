'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class FlujoCaja extends Model {}

  FlujoCaja.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.ENUM('INGRESO', 'EGRESO'),
      allowNull: false
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    },
    fecha: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'FlujoCaja',
    tableName: 'flujos_caja',
    freezeTableName: true
  });

  return FlujoCaja;
};
