module.exports = (sequelize, DataTypes) => {
  const TransaccionDetalle = sequelize.define('TransaccionDetalle', {
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.FLOAT
  });

  TransaccionDetalle.associate = (models) => {
    TransaccionDetalle.belongsTo(models.Producto, {
      foreignKey: 'ProductoId',
      as: 'Producto'
    });

    TransaccionDetalle.belongsTo(models.Transaccion, {
      foreignKey: 'TransaccionId',
      as: 'transaccion'
    });
  };

  return TransaccionDetalle;
};
