module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    nombre: DataTypes.STRING
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Producto, {
      foreignKey: 'CategoriaId',
      as: 'productos'
    });

    Categoria.hasMany(models.TransaccionDetalle, {
      foreignKey: 'CategoriaId',
      as: 'detalles'
    });
  };

  return Categoria;
};
