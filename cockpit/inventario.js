const fs = require('fs');
const path = require('path');

function verInventario(email = 'innovacioncomercialx@gmail.com', role = 'admin') {
  const productos = [
    { nombre: 'Producto A', stock: 12, categoria: 'Electrónica' },
    { nombre: 'Producto B', stock: 0, categoria: 'Ropa' },
    { nombre: 'Producto C', stock: 5, categoria: 'Electrónica' },
    { nombre: 'Producto D', stock: 20, categoria: 'Hogar' }
  ];

  console.log('\n📦 Inventario actual:\n');
  productos.forEach(p => {
    const estado = p.stock > 0 ? '✅ Disponible' : '❌ Sin stock';
    console.log(`- ${p.nombre} (${p.categoria}) — Stock: ${p.stock} — ${estado}`);
  });

  const total = productos.reduce((acc, p) => acc + p.stock, 0);
  console.log(`\n📊 Total unidades en stock: ${total}\n`);

  // Registro en log cockpitizado
  const logPath = path.resolve('./cockpit/logs/actions-log.csv');
  const timestamp = new Date().toISOString();
  const action = 'Consulta de inventario';
  const line = `${timestamp},${email},${role},"${action}"\n`;
  const dir = path.dirname(logPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, 'timestamp,email,role,action\n');
  }
  fs.appendFileSync(logPath, line);
}

module.exports = verInventario;
