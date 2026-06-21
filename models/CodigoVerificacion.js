module.exports = (sequelize, DataTypes) => {
  const CodigoVerificacion = sequelize.define("CodigoVerificacion", {
    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiracion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return CodigoVerificacion;
};
