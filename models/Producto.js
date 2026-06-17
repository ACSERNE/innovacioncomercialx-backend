module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    fecha_vencimiento: DataTypes.DATE // NUEVO
  });

  Producto.associate = (models) => {
    Producto.belongsToMany(models.Categoria, { through: models.CategoriaProducto });
    Producto.belongsToMany(models.Usuario, { through: models.SellerProduct });
    Producto.hasMany(models.TransaccionDetalle);
  };

  return Producto;
};
