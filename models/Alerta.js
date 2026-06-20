module.exports = (sequelize, DataTypes) => {
  const Alerta = sequelize.define('Alerta', {
    mensaje: DataTypes.STRING,
    tipo: DataTypes.STRING
  });

  return Alerta;
};
