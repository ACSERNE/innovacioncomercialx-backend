module.exports = (sequelize, DataTypes) => {
  const Transaccion = sequelize.define('Transaccion', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.ENUM('venta', 'compra'),
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Transacciones'
  });

  Transaccion.associate = (models) => {
    Transaccion.hasMany(models.TransaccionDetalle, {
      as: 'detalles',
      foreignKey: 'transaccionId',
      onDelete: 'CASCADE'
    });
  };

  return Transaccion;
};

