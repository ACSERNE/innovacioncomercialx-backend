const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const exportCSV = args.includes("--csv");
const exportJSON = args.includes("--json");

const timestamp = new Date().toISOString();
const rutas = ["/app/.env", "/app/config.json", "/app/diagnosticos", "/app/logs"];
const resultados = [];

console.log(`# 🧪 Diagnóstico de rutas críticas\n`);

rutas.forEach((ruta) => {
  const existe = fs.existsSync(ruta);
  const estado = existe ? "✅ Existe" : "❌ No encontrada";
  resultados.push({ ruta, estado });

  console.log(`- **${ruta}**: ${estado}`);
});

if (exportCSV) {
  const csv = ["ruta,estado"].concat(
    resultados.map(r => `"${r.ruta}","${r.estado}"`)
  ).join("\n");

  fs.writeFileSync(path.resolve("/app", "diagnostico-verificar-rutas.csv"), csv);
}

if (exportJSON) {
  const json = {
    hora: timestamp,
    rutas: resultados
  };

  fs.writeFileSync(path.resolve("/app", "diagnostico-verificar-rutas.json"), JSON.stringify(json, null, 2));
}
