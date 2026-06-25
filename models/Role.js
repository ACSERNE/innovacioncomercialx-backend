module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.Usuario, {
      through: 'UserRole',
      foreignKey: 'roleId',
      as: 'usuarios'
    });
  };

  return Role;
};
