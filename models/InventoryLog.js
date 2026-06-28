module.exports = (sequelize, DataTypes) => {
  const InventoryLog = sequelize.define("InventoryLog", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    cambio: { type: DataTypes.INTEGER, allowNull: false },
    motivo: { type: DataTypes.STRING, allowNull: false }
  });

  return InventoryLog;
};
