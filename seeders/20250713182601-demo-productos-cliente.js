async function main() {
'use strict';
const { v4: uuidv4 } = require('uuid');

function calcularPrecioTotal(unitario, descuento_aplicable = false, porcentaje = 0) {
  return (!descuento_aplicable || porcentaje <= 0)
    ? unitario
    : unitario - (unitario * (porcentaje / 100));
}

module.exports = {
  async up(queryInterface) {
    // Borrar productos previos del usuario cliente
    await queryInterface.bulkDelete('productos', {
      nombre: ['Café Orgánico Premium', 'Auriculares Inalámbricos', 'Zapatillas Urbanas'],
    });

    // Buscar otro usuario como autor
    const usuarios = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE correo = 'admin-token@example.com'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const userId = usuarios[0]?.id;
    if (!userId) throw new Error('Usuario alternativo no encontrado');

    // Buscar categorías
    const categorias = await queryInterface.sequelize.query(
      `SELECT id, nombre FROM categorias_producto`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const categoriaMap = {};
    categorias.forEach(c => categoriaMap[c.nombre] = c.id);

    const productos = [
      {
        id: uuidv4(),
        nombre: 'Café Orgánico Premium',
        descripcion: 'Bolsa de 500g, tueste medio, origen Colombia',
        precio_unitario: 6500,
        descuento_aplicable: true,
        precio_total: calcularPrecioTotal(6500, true, 15),
        stock: 40,
        categoriaId: categoriaMap['Alimentos'],
        userId,
        fecha_vencimiento: '2025-08-20',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        nombre: 'Auriculares Inalámbricos',
        descripcion: 'Bluetooth 5.2, cancelación activa de ruido',
        precio_unitario: 29900,
        descuento_aplicable: false,
        precio_total: 29900,
        stock: 15,
        categoriaId: categoriaMap['Electrónica'],
        userId,
        fecha_vencimiento: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        nombre: 'Zapatillas Urbanas',
        descripcion: 'Color gris, suela flexible, tallas 38-44',
        precio_unitario: 22000,
        descuento_aplicable: true,
        precio_total: calcularPrecioTotal(22000, true, 10),
        stock: 6,
        categoriaId: categoriaMap['Ropa'],
        userId,
        fecha_vencimiento: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('productos', productos);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('productos', {
      nombre: ['Café Orgánico Premium', 'Auriculares Inalámbricos', 'Zapatillas Urbanas'],
    });
  }
};}
main()
