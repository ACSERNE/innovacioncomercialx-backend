module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return UserRole;
};
