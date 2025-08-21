'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SeedLog extends Model {
    static associate(models) {
      // Puedes definir asociaciones aquí si es necesario
    }
  }

  SeedLog.init({
    ejecutadoPor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resultado: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    creadoEn: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'SeedLog',
    tableName: 'SeedLogs',
    timestamps: false // Usas `creadoEn` manualmente
  });

  return SeedLog;
};
