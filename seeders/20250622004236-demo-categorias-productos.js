async function main() {
'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Eliminamos datos existentes para evitar conflictos
    await queryInterface.bulkDelete('categorias_producto', null, {});

    // Datos a insertar
    const categorias = [
      {
        id: uuidv4(),
        nombre: 'Alimentos',
        descripcion: 'Productos comestibles y bebidas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        nombre: 'Electrónica',
        descripcion: 'Tecnología y dispositivos electrónicos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        nombre: 'Ropa',
        descripcion: 'Vestimenta y accesorios',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('categorias_producto', categorias);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categorias_producto', {
      nombre: ['Alimentos', 'Electrónica', 'Ropa'],
    });
  },
};}
main()
