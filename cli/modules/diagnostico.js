const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

module.exports = async () => {
  console.log("🩺 Ejecutando Diagnóstico del Sistema...");
  const logPath = path.resolve(__dirname, "../../logs/diagnostico_trace.md");
  const fecha = new Date().toISOString();

  let log = `# 🩺 Diagnóstico Técnico — ${fecha}\n\n`;
  let erroresCriticos = 0;

  const resultados = [];

  // 🔌 PostgreSQL
  try {
    const pgStatus = execSync("pg_isready").toString().trim();
    console.log("🔌 PostgreSQL:", pgStatus);
    log += `- 🔌 PostgreSQL → ✅ ${pgStatus}\n`;
    resultados.push(["PostgreSQL", "✅ OK"]);
  } catch {
    console.log("❌ PostgreSQL no disponible");
    log += `- 🔌 PostgreSQL → ❌ No disponible\n`;
    resultados.push(["PostgreSQL", "❌ Fallo"]);
    erroresCriticos++;
  }

  // 🐳 Docker
  try {
    execSync("docker info", { stdio: "ignore" });
    console.log("🐳 Docker activo");
    log += `- 🐳 Docker → ✅ Activo\n`;
    resultados.push(["Docker", "✅ OK"]);
  } catch {
    console.log("❌ Docker no accesible");
    log += `- 🐳 Docker → ❌ Inaccesible\n`;
    resultados.push(["Docker", "❌ Fallo"]);
    erroresCriticos++;
  }

  // 🚦 Rutas Express
  try {
    const rutas = fs.readdirSync(path.resolve(__dirname, "../../routes"))
      .filter(f => f.endsWith(".js"));
    if (rutas.length > 0) {
      console.log(`🚦 Rutas Express detectadas: ${rutas.length}`);
      rutas.forEach(r => console.log(`- ${r}`));
      log += `- 🚦 Rutas Express → ✅ ${rutas.length} archivos\n`;
      resultados.push(["Rutas Express", `✅ ${rutas.length} archivo(s)`]);
    } else {
      console.log("❌ No se encontraron rutas Express");
      log += `- 🚦 Rutas Express → ❌ Vacío\n`;
      resultados.push(["Rutas Express", "❌ Vacío"]);
      erroresCriticos++;
    }
  } catch {
    console.log("⚠️ Error al acceder a backend/routes");
    log += `- 🚦 Rutas Express → ⚠️ Error de acceso\n`;
    resultados.push(["Rutas Express", "⚠️ Error"]);
    erroresCriticos++;
  }

  // 🧾 Guardar log
  fs.writeFileSync(logPath, log);
  console.log(`🧾 Log generado en logs/diagnostico_trace.md`);

  // 📊 Banner final
  console.log("\n📊 Resumen Técnico:");
  console.log("| Componente       | Estado       |");
  console.log("|------------------|--------------|");
  resultados.forEach(([componente, estado]) => {
    console.log(`| ${componente.padEnd(16)} | ${estado.padEnd(12)} |`);
  });

  // 🧠 Recomendación rápida
  if (erroresCriticos > 0) {
    console.log("\n❌ Diagnóstico falló con errores críticos");
    console.log("🔧 Recomendación: revisar infraestructura antes de ejecutar validadores");
    process.exit(1);
  } else {
    console.log("\n✅ Diagnóstico completado sin errores críticos");
    console.log("🚀 Entorno listo para ejecución de cockpit técnico");
    process.exit(0);
  }
};

// 🚀 Ejecutar si se llama directamente
if (require.main === module) {
  module.exports();
}