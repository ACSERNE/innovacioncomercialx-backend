module.exports = (sequelize, DataTypes) => {
  const Transaccion = sequelize.define('Transaccion', {
    total: DataTypes.FLOAT
  });

  Transaccion.associate = (models) => {
    Transaccion.belongsTo(models.Usuario);
    Transaccion.hasMany(models.TransaccionDetalle);
  };

  return Transaccion;
};
