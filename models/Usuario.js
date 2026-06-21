module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM("proveedor", "comprador"),
      allowNull: false,
      defaultValue: "comprador"
    },
    correoVerificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    telefonoVerificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    identidadValidada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    run: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Usuario;
};
