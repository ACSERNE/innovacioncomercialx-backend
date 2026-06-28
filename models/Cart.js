module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    session_id: { type: DataTypes.STRING, allowNull: true }
  });

  Cart.associate = (models) => {
    Cart.hasMany(models.CartItem, { foreignKey: "cart_id" });
  };

  return Cart;
};
