#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const inquirer = require("inquirer");

let erroresCriticos = 0;
let resultados = [];
let log = "";
const tracePath = path.join(__dirname, "diagnostico_trace.md");

// 🧪 Funciones individuales
function verificarDocker() {
  try {
    execSync("docker info", { stdio: "ignore" });
    console.log("🐳 Docker → ✅ Activo");
    log += `- 🐳 Docker → ✅ Activo\n`;
    resultados.push(["Docker", "✅ OK"]);
  } catch {
    console.log("❌ Docker → No disponible");
    log += `- 🐳 Docker → ❌ No disponible\n`;
    resultados.push(["Docker", "❌ Fallo"]);
    erroresCriticos++;
  }
}

function verificarHealthy() {
  try {
    const estado = execSync(
      `docker inspect --format='{{.State.Health.Status}}' postgres`,
      { encoding: "utf8" }
    ).trim();
    if (estado === "healthy") {
      console.log("🩺 Contenedor PostgreSQL → ✅ Healthy");
      log += `- 🩺 Contenedor PostgreSQL → ✅ Healthy\n`;
      resultados.push(["Contenedor", "✅ Healthy"]);
    } else {
      throw new Error("Unhealthy");
    }
  } catch {
    console.log("❌ Contenedor PostgreSQL → No está healthy");
    log += `- 🩺 Contenedor PostgreSQL → ❌ No está healthy\n`;
    resultados.push(["Contenedor", "❌ Fallo"]);
    erroresCriticos++;
  }
}

function verificarConexionPostgres() {
  try {
    const password = process.env.PGPASSWORD || "postgres";
    execSync(
      `PGPASSWORD=${password} psql -h postgres -U postgres -d postgres -c "SELECT 1;"`,
      { encoding: "utf8" }
    );
    console.log("🔌 PostgreSQL → ✅ Conexión verificada");
    log += `- 🔌 PostgreSQL → ✅ Conexión verificada\n`;
    resultados.push(["PostgreSQL", "✅ OK"]);
  } catch {
    console.log("❌ PostgreSQL → Error de conexión o autenticación");
    log += `- 🔌 PostgreSQL → ❌ Fallo de conexión\n`;
    resultados.push(["PostgreSQL", "❌ Fallo"]);
    erroresCriticos++;
  }
}

function verificarBaseDeDatos() {
  try {
    const dbCheck = execSync(
      `PGPASSWORD=${process.env.PGPASSWORD || "postgres"} psql -h postgres -U postgres -lqt | cut -d \\| -f 1 | grep -w mi_db`,
      { encoding: "utf8" }
    );
    if (dbCheck.trim()) {
      console.log("📦 Base de datos 'mi_db' → ✅ Lista");
      log += `- 📦 Base de datos 'mi_db' → ✅ Lista\n`;
      resultados.push(["Base de datos", "✅ OK"]);
    } else {
      throw new Error("No encontrada");
    }
  } catch {
    console.log("❌ Base de datos 'mi_db' → No encontrada");
    log += `- 📦 Base de datos 'mi_db' → ❌ No encontrada\n`;
    resultados.push(["Base de datos", "❌ Fallo"]);
  }
}

function verificarMigraciones() {
  try {
    const migraciones = execSync("npx sequelize-cli db:migrate:status", {
      encoding: "utf8",
    });
    if (migraciones.includes("down")) {
      console.log("📁 Migraciones → ⚠️ Pendientes");
      log += `- 📁 Migraciones → ⚠️ Pendientes\n`;
      resultados.push(["Migraciones", "⚠️ Pendientes"]);
    } else {
      console.log("📁 Migraciones → ✅ Aplicadas");
      log += `- 📁 Migraciones → ✅ Aplicadas\n`;
      resultados.push(["Migraciones", "✅ OK"]);
    }
  } catch {
    console.log("❌ Migraciones → Error al verificar");
    log += `- 📁 Migraciones → ❌ Error\n`;
    resultados.push(["Migraciones", "❌ Fallo"]);
  }
}

function exportarMarkdown() {
  const md = generarMarkdown(resultados, erroresCriticos);
  fs.writeFileSync(tracePath, md);
  console.log(`\n📄 Reporte generado: ${tracePath}`);
}

function generarMarkdown(resultados, errores) {
  let md = `# 🧪 Diagnóstico Técnico\n\n`;
  md += `**Fecha:** ${new Date().toLocaleString()}\n\n`;
  md += `## 🔍 Resultados\n\n`;
  md += `| Módulo         | Estado   |\n|----------------|----------|\n`;
  resultados.forEach(([modulo, estado]) => {
    md += `| ${modulo.padEnd(15)} | ${estado.padEnd(8)} |\n`;
  });
  md += `\n## 📊 Resumen\n\n`;
  md += `- Errores críticos: ${errores}\n`;
  md += `- Estado general: ${errores > 0 ? "⚠️ Revisar" : "✅ Todo OK"}\n\n`;
  md += `## 📜 Log técnico\n\n`;
  md += "```\n" + log + "```\n";
  return md;
}

// 🧭 Menú interactivo
async function mostrarMenu() {
  const opciones = await inquirer.prompt([
    {
      type: "checkbox",
      name: "validaciones",
      message: "Selecciona las validaciones que deseas ejecutar:",
      choices: [
        { name: "🐳 Docker activo", value: "docker" },
        { name: "🩺 Estado healthy del contenedor", value: "healthy" },
        { name: "🔌 Conexión a PostgreSQL", value: "conexion" },
        { name: "📦 Base de datos 'mi_db'", value: "db" },
        { name: "📁 Migraciones pendientes", value: "migraciones" },
        { name: "📄 Exportar reporte markdown", value: "exportar" },
      ],
    },
  ]);

  console.log("\n🚀 Ejecutando validaciones seleccionadas...\n");

  for (const opcion of opciones.validaciones) {
    switch (opcion) {
      case "docker":
        verificarDocker();
        break;
      case "healthy":
        verificarHealthy();
        break;
      case "conexion":
        verificarConexionPostgres();
        break;
      case "db":
        verificarBaseDeDatos();
        break;
      case "migraciones":
        verificarMigraciones();
        break;
      case "exportar":
        exportarMarkdown();
        break;
    }
  }

  if (!opciones.validaciones.includes("exportar")) {
    exportarMarkdown();
  }
}

// 🚀 Iniciar menú
mostrarMenu();