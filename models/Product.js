module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    store_id: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    descripcion: { type: DataTypes.TEXT, defaultValue: "" },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    sku: { type: DataTypes.STRING, defaultValue: "" },
    categoria_id: { type: DataTypes.INTEGER, allowNull: true },
    estado: { type: DataTypes.STRING, defaultValue: "activo" }
  });

  Product.associate = (models) => {
    Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
    Product.hasMany(models.InventoryLog, { foreignKey: "product_id" });
  };

  return Product;
};
