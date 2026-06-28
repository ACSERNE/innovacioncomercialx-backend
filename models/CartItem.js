module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cart_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, defaultValue: 1 }
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return CartItem;
};
