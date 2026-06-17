module.exports = (sequelize, DataTypes) => {
  const FlujoCaja = sequelize.define('FlujoCaja', {
    tipo: DataTypes.STRING,
    monto: DataTypes.FLOAT
  });

  return FlujoCaja;
};
