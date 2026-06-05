module.exports = (sequelize, DataTypes) => {
  const TransaccionDetalle = sequelize.define('TransaccionDetalle', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    productoId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    transaccionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'TransaccionDetalles'
  });

  TransaccionDetalle.associate = (models) => {
    TransaccionDetalle.belongsTo(models.Transaccion, {
      as: 'transaccion',
      foreignKey: 'transaccionId',
      onDelete: 'CASCADE'
    });

    TransaccionDetalle.belongsTo(models.Producto, {
      as: 'producto',
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });
  };

  return TransaccionDetalle;
};

