'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SellerProduct extends Model {
    static associate(models) {
      SellerProduct.belongsTo(models.User, {
        foreignKey: 'vendedorId',
        as: 'vendedor'
      });
    }
  }

  SellerProduct.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendedorId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'SellerProduct',
    tableName: 'SellerProducts',
  });

  return SellerProduct;
};
