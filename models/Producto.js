'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsTo(models.CategoriaProducto, {
        foreignKey: 'categoriaId',
        as: 'categoria',
      });
    }
  }

  Producto.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precio_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descuento_aplicable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoriaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
  });

  return Producto;
};
