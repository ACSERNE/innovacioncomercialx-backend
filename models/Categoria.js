module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    nombre: DataTypes.STRING
  });

  Categoria.associate = (models) => {
    Categoria.belongsToMany(models.Producto, { through: models.CategoriaProducto });
  };

  return Categoria;
};
