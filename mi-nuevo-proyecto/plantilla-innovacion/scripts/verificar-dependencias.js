const dependencias = [
  'sequelize',
  'chalk',
  'axios',
  'pdfkit',
  'exceljs',
  'dotenv',
  'dayjs'
];

console.log('\n🛠 Verificando dependencias críticas...\n');

let errores = 0;

dependencias.forEach(dep => {
  try {
    require.resolve(dep);
    console.log(`✅ ${dep} instalado`);
  } catch {
    console.log(`❌ ${dep} no encontrado`);
    errores++;
    console.log(`👉 Instalalo con: npm install ${dep}\n`);
  }
});

console.log(errores === 0
  ? '\n🎉 Todas las dependencias están instaladas correctamente.\n'
  : `\n⚠️ Se detectaron ${errores} dependencias faltantes.\n`
);