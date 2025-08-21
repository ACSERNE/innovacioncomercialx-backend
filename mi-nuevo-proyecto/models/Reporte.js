'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Reporte extends Model {}

  Reporte.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    tipo: {
      type: DataTypes.ENUM('diario', 'semanal', 'mensual', 'promedio'),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    resumen: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Reporte',
    tableName: 'reportes'
  });

  return Reporte;
};
