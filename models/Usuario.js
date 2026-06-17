module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    correo: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    rol: { type: DataTypes.STRING, defaultValue: 'user' }
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Transaccion);
  };

  return Usuario;
};
