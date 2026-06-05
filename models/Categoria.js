// models/Categoria.js
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'categorias_producto',   // ← tabla real
    timestamps: true                   // ← tu migración usa createdAt/updatedAt
  });

  // ASOCIACIÓN CORRECTA
  Categoria.associate = (models) => {
    Categoria.hasMany(models.Producto, {
      foreignKey: 'categoriaId',
      as: 'productos'
    });
  };

  return Categoria;
};

