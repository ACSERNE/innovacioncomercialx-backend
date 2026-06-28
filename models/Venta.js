module.exports = (sequelize, DataTypes) => {
  const Venta = sequelize.define("Venta", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.FLOAT, allowNull: false },
    estado: { type: DataTypes.STRING, defaultValue: "pendiente" },
    tracking: { type: DataTypes.STRING, allowNull: true }
  });

  Venta.associate = (models) => {
    Venta.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return Venta;
};
