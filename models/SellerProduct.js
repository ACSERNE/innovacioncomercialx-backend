module.exports = (sequelize, DataTypes) => {
  const SellerProduct = sequelize.define("SellerProduct", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return SellerProduct;
};
