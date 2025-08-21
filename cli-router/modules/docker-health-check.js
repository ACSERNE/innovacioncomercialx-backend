// modules/docker-health-check.js
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

module.exports = {
  checkDockerStatus() {
    console.log("🔧 Verificando estado de contenedores Docker...");

    exec("docker ps --format '{{.Names}}|{{.Status}}'", (error, stdout, stderr) => {
      if (error) return console.error("❌ Error ejecutando docker ps:", error.message);

      const containers = stdout.trim().split("\n").map(line => {
        const [name, status] = line.split("|");
        return { name, status };
      });

      const log = containers.map(c => `${c.name},${c.status}`).join("\n");
      const logPath = `logs/docker-health-${Date.now()}.csv`;
      fs.writeFileSync(logPath, log);

      containers.forEach(c => {
        const state = c.status.includes("Up") ? "🟢 OK" : "🔴 DOWN";
        console.log(`${state} ${c.name} → ${c.status}`);
      });

      console.log(`📄 Log guardado en ${logPath}`);
    });
  }
};