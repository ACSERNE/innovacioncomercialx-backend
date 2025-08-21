'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CategoriaProducto extends Model {
    static associate(models) {
      CategoriaProducto.hasMany(models.Producto, {
        foreignKey: 'categoriaId',
        as: 'productos',
      });
    }
  }

  CategoriaProducto.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'CategoriaProducto',
    tableName: 'categorias_producto',
  });

  return CategoriaProducto;
};
