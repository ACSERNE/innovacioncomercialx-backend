'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {
      Sale.belongsTo(models.SellerProduct, {
        foreignKey: 'sellerProductId',
        as: 'product',
      });
    }
  }

  Sale.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sellerProductId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comision_valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    monto_vendedor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Sale',
  });

  return Sale;
};
