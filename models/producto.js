module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define("Producto", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio_unitario: DataTypes.DOUBLE,
    precio_total: DataTypes.DOUBLE,
    descuento_aplicable: DataTypes.BOOLEAN,
    stock: DataTypes.INTEGER,
    categoriaId: DataTypes.UUID,
    fecha_vencimiento: DataTypes.DATE
  }, {
    tableName: 'productos',
    freezeTableName: true,
    timestamps: true
  });

  return Producto;
};
