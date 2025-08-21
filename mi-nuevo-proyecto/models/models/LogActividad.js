'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class LogActividad extends Model {}

  LogActividad.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING, // Ej.: 'login-fallido', 'cuenta-bloqueada'
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'LogActividad',
    tableName: 'log_actividad',
    timestamps: false,
  });

  return LogActividad;
};