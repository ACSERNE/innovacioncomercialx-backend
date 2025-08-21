const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const exportCSV = args.includes("--csv");
const exportJSON = args.includes("--json");

const timestamp = new Date().toISOString();
const variables = ["PGHOST", "PGPORT", "PGUSER", "PGPASSWORD", "PGDATABASE"];
const resultados = [];

console.log(`# 🧪 Diagnóstico de variables de entorno\n`);

variables.forEach((key) => {
  const valor = process.env[key];
  const estado = valor ? "✅ Presente" : "❌ Ausente";
  resultados.push({ clave: key, valor: valor || "", estado });

  console.log(`- **${key}**: ${estado}${valor ? ` → \`${valor}\`` : ""}`);
});

if (exportCSV) {
  const csv = ["clave,valor,estado"].concat(
    resultados.map(r => `"${r.clave}","${r.valor}","${r.estado}"`)
  ).join("\n");

  fs.writeFileSync(path.resolve("/app", "diagnostico-verificar-env.csv"), csv);
}

if (exportJSON) {
  const json = {
    hora: timestamp,
    variables: resultados
  };

  fs.writeFileSync(path.resolve("/app", "diagnostico-verificar-env.json"), JSON.stringify(json, null, 2));
}
