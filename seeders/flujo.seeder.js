const db = require('../models');

module.exports = async () => {
  const movimientos = [
    { tipo: 'ingreso', monto: 15000, descripcion: 'Venta inicial' },
    { tipo: 'egreso', monto: 5000, descripcion: 'Compra de insumos' },
    { tipo: 'ingreso', monto: 8000, descripcion: 'Servicio express' }
  ];

  for (const m of movimientos) {
    await db.FlujoCaja.create(m);
  }

  console.log('✅ Seeders: flujo de caja creado');
};
