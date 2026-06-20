module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    CategoriaId: DataTypes.INTEGER
  });

  Producto.associate = (models) => {
    Producto.belongsTo(models.Categoria, {
      foreignKey: 'CategoriaId',
      as: 'Categoria'
    });

    Producto.hasMany(models.TransaccionDetalle, {
      foreignKey: 'ProductoId',
      as: 'detalles'
    });
  };

  return Producto;
};
