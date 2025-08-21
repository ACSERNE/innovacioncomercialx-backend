const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const { User, Producto, Categoria, SeedLog } = require('../../models');

// 👉 Resumen dinámico para auditoría
let resumen = {
  usuariosInsertados: 0,
  usuariosDuplicados: 0,
  productosInsertados: 0,
  productosDuplicados: 0,
  productosOmitidos: 0,
  categoriasCreadas: 0
};

// ✅ Usuario único por correo
async function safeInsertUser(data) {
  const existing = await User.findOne({ where: { correo: data.correo } });
  if (!existing) {
    await User.create(data);
    console.log(`✅ Usuario "${data.correo}" insertado`);
    resumen.usuariosInsertados++;
  } else {
    console.log(`🔒 Usuario "${data.correo}" ya existe. Skipping...`);
    resumen.usuariosDuplicados++;
  }
}

// ✅ Producto único por nombre con validación de stock y categoría
async function safeInsertProducto(data) {
  const { nombre, stock = 0, categoriaNombre } = data;

  if (stock < 1) {
    console.log(`⚠️ Producto "${nombre}" tiene stock mínimo (${stock}). Skipping...`);
    resumen.productosOmitidos++;
    return;
  }

  let categoriaId = data.categoriaId;

  if (categoriaNombre && !categoriaId) {
    let cat = await Categoria.findOne({ where: { nombre: categoriaNombre } });
    if (!cat) {
      cat = await Categoria.create({ nombre: categoriaNombre });
      console.log(`🆕 Categoría "${categoriaNombre}" creada`);
      resumen.categoriasCreadas++;
    }
    categoriaId = cat.id;
  }

  const existing = await Producto.findOne({ where: { nombre } });
  if (!existing) {
    await Producto.create({ ...data, categoriaId });
    console.log(`✅ Producto "${nombre}" insertado`);
    resumen.productosInsertados++;
  } else {
    console.log(`🔒 Producto "${nombre}" ya existe. Skipping...`);
    resumen.productosDuplicados++;
  }
}

// 🔁 Inserción masiva
async function safeInsertManyUsers(usuarios = []) {
  for (const user of usuarios) {
    await safeInsertUser(user);
  }
}

async function safeInsertManyProductos(productos = []) {
  for (const prod of productos) {
    await safeInsertProducto(prod);
  }
}

// 📁 Exporta log en texto
function exportarLog(texto) {
  const fecha = new Date().toISOString().replace(/[:.]/g, '-');
  const logPath = path.join(__dirname, '../../logs/seed-log-' + fecha + '.txt');
  fs.writeFileSync(logPath, texto);
  console.log(`📁 Log guardado en: ${logPath}`);
}

// 📑 Exporta resumen como CSV
function exportarCSV(resumenObj, batchName = 'SeederBatch') {
  const fecha = new Date();
  const fechaIso = fecha.toISOString().replace(/[:.]/g, '-');
  const fechaLegible = fecha.toLocaleString();
  const csvPath = path.join(__dirname, '../../logs/seed-resumen-' + fechaIso + '.csv');

  const data = {
    lote: batchName,
    fecha: fechaLegible,
    ...resumenObj
  };

  const parser = new Parser({ delimiter: ',' });
  const csv = parser.parse([data]);
  fs.writeFileSync(csvPath, csv);
  console.log(`📑 Resumen guardado en CSV: ${csvPath}`);
}

// 🗃️ Registrar resumen en tabla SeedLogs con ejecutor opcional
async function registrarLogEnDB(tipo, resultado, comentario = '', ejecutadoPor = 'sistema') {
  await SeedLog.create({ tipo, resultado, comentario, ejecutadoPor });
  console.log(`🗃️ Log registrado en la base como "${tipo}" ejecutado por "${ejecutadoPor}"`);
}

// 📊 Mostrar resumen y exportar todo
function mostrarResumen(batchName = 'SeederBatch') {
  let texto = '\n📊 Resumen de inserciones:\n';
  texto += `👤 Usuarios insertados: ${resumen.usuariosInsertados}\n`;
  texto += `🔁 Usuarios duplicados: ${resumen.usuariosDuplicados}\n`;
  texto += `📦 Productos insertados: ${resumen.productosInsertados}\n`;
  texto += `🔁 Productos duplicados: ${resumen.productosDuplicados}\n`;
  texto += `⛔ Omitidos por stock: ${resumen.productosOmitidos}\n`;
  texto += `🗂️ Categorías creadas: ${resumen.categoriasCreadas}\n`;

  console.log(texto);
  exportarLog(texto);
  exportarCSV(resumen, batchName);
  return texto;
}

// ✅ Exportar funciones
module.exports = {
  safeInsertUser,
  safeInsertProducto,
  safeInsertManyUsers,
  safeInsertManyProductos,
  mostrarResumen,
  registrarLogEnDB
};