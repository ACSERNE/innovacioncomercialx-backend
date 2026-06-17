module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    CategoriaId: DataTypes.INTEGER
  });

  Producto.associate = (models) => {
    Producto.belongsTo(models.Categoria);
  };

  return Producto;
};
