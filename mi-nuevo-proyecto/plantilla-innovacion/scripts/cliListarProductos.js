const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const { parse } = require('json2csv');

// 🔐 Autenticación (opcional con archivo .auth.json)
let token = null;
try {
  const auth = JSON.parse(fs.readFileSync('.auth.json', 'utf8'));
  token = auth.token;
} catch {
  console.log(chalk.yellow('🔒 No se encontró .auth.json, usando modo público'));
}

const baseURL = 'http://localhost:5002/api/productos';
const headers = token ? { Authorization: `Bearer ${token}` } : {};

axios.get(baseURL, { headers })
  .then((res) => {
    const productos = res.data;
    if (!productos.length) {
      console.log(chalk.yellow('\n⚠️ No se encontraron productos.\n'));
      return;
    }

    console.log(chalk.green(`\n📊 Dashboard Inventario - Total: ${productos.length}\n`));

    const resumen = {};
    const bajoStock = [];
    const vencimientos = [];
    const hoy = new Date();
    const csvRows = [];

    productos.forEach((p, index) => {
      const cat = p.categoria?.nombre || 'Sin categoría';
      resumen[cat] = (resumen[cat] || 0) + 1;

      const venc = p.fecha_vencimiento ? new Date(p.fecha_vencimiento) : null;
      const dias = venc ? Math.ceil((venc - hoy) / (1000 * 60 * 60 * 24)) : null;
      const vencCritico = venc && dias <= 30;

      if (p.stock < 5) bajoStock.push(p);
      if (vencCritico) vencimientos.push(p);

      console.log(chalk.bold(`#${index + 1}`));
      console.log(`🧾 ${p.nombre}`);
      console.log(`💲 ${p.precio_unitario} | 🏷️ Stock: ${p.stock} ${p.stock < 5 ? chalk.red('(Bajo)') : ''}`);
      if (vencCritico) console.log(chalk.red(`⏳ Vence en ${dias} días`));
      console.log(`📁 Categoría: ${cat}`);
      console.log(`🧑 Autor: ${p.userId}\n`);

      csvRows.push({
        Nombre: p.nombre,
        Precio: p.precio_unitario,
        Stock: p.stock,
        Categoria: cat,
        Autor: p.userId,
        Vencimiento: p.fecha_vencimiento || 'N/A'
      });
    });

    // 🧾 Exportar a CSV
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `productos-${timestamp}.csv`;
    fs.writeFileSync(fileName, parse(csvRows));
    console.log(chalk.cyan(`\n✅ Exportado a CSV: ${fileName}`));

    // 🔢 Totales
    console.log(chalk.magenta('\n📦 Productos por categoría:'));
    for (const cat in resumen) {
      console.log(`📁 ${cat}: ${resumen[cat]} productos`);
    }

    // 🚨 Bajo stock
    if (bajoStock.length) {
      console.log(chalk.red(`\n⚠️ Productos con bajo stock: ${bajoStock.length}`));
      bajoStock.forEach(p => console.log(`🔴 ${p.nombre} (${p.stock})`));
    }

    // ⏳ Vencimientos cercanos
    if (vencimientos.length) {
      console.log(chalk.yellow(`\n⏳ Productos con vencimiento próximo: ${vencimientos.length}`));
      vencimientos.forEach(p => console.log(`🟡 ${p.nombre} → ${p.fecha_vencimiento}`));
    }

  })
  .catch((err) => {
    console.error(chalk.red('❌ Error al obtener productos:'), err.message);
  });