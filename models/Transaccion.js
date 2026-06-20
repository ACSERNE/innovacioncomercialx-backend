module.exports = (sequelize, DataTypes) => {
  const Transaccion = sequelize.define('Transaccion', {
    total: DataTypes.FLOAT
  });

  Transaccion.associate = (models) => {
    Transaccion.belongsTo(models.Usuario, {
      foreignKey: 'UsuarioId'
    });

    Transaccion.hasMany(models.TransaccionDetalle, {
      foreignKey: 'TransaccionId',
      as: 'detalles'
    });
  };

  return Transaccion;
};
