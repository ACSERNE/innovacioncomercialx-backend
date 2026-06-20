'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transacciones', [
      {
        id: 'd3f0a001-1a11-4e95-b001-111111111111',
        tipo: 'entrada',
        cantidad: 20,
        precio_unitario: 1000, // Precio unitario para la compra inicial
        productoId: 'c3d4e5f6-aaaa-bbbb-cccc-ddddeeeeffff', // UUID producto Arroz 1kg
        observacion: 'Compra inicial de stock',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'd3f0a002-1a11-4e95-b001-111111111112',
        tipo: 'salida',
        cantidad: 5,
        precio_unitario: 1200, // Precio unitario para la venta
        productoId: 'd4e5f6a7-bbbb-cccc-dddd-eeeeffff0000', // UUID producto Jugo Natural 1L
        observacion: 'Venta de producto',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transacciones', {
      id: ['d3f0a001-1a11-4e95-b001-111111111111', 'd3f0a002-1a11-4e95-b001-111111111112']
    });
  }
};
