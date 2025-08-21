const fs = require('fs');
const path = require('path');

function generarReporteInventario(email = 'innovacioncomercialx@gmail.com', role = 'admin') {
  const productos = [
    { nombre: 'Producto A', stock: 12, categoria: 'Electrónica' },
    { nombre: 'Producto B', stock: 0, categoria: 'Ropa' },
    { nombre: 'Producto C', stock: 5, categoria: 'Electrónica' },
    { nombre: 'Producto D', stock: 20, categoria: 'Hogar' }
  ];

  const timestamp = new Date().toISOString();
  const mdPath = path.resolve('./cockpit/inventario.md');

  let markdown = `# 📦 Reporte de Inventario — ${timestamp}\n\n`;
  productos.forEach(p => {
    const estado = p.stock > 0 ? '✅ Disponible' : '❌ Sin stock';
    markdown += `- ${p.nombre} (${p.categoria}) — Stock: ${p.stock} — ${estado}\n`;
  });

  const total = productos.reduce((acc, p) => acc + p.stock, 0);
  markdown += `\n📊 Total unidades en stock: ${total}\n`;
  markdown += `\n---\n📝 Generado automáticamente por \`reporte-inventario.js\`\n`;

  fs.writeFileSync(mdPath, markdown);
  console.log('✅ Reporte exportado a cockpit/inventario.md');

  // Registro en log cockpitizado
  const logPath = path.resolve('./cockpit/logs/actions-log.csv');
  const action = 'Exportación de reporte de inventario';
  const line = `${timestamp},${email},${role},"${action}"\n`;
  const dir = path.dirname(logPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, 'timestamp,email,role,action\n');
  }
  fs.appendFileSync(logPath, line);
}

module.exports = generarReporteInventario;
