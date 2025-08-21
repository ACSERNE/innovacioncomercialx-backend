// modules/route-auditor.js
const fs = require("fs");
const chalk = require("chalk");
const app = require("../app"); // Asegúrate de exportar el objeto Express desde app.js

function getColor(method) {
  switch (method.toUpperCase()) {
    case "GET": return chalk.green;
    case "POST": return chalk.blue;
    case "PUT": return chalk.yellow;
    case "DELETE": return chalk.red;
    default: return chalk.gray;
  }
}

module.exports = {
  inspectRoutes() {
    const routes = [];

    app._router.stack.forEach(layer => {
      if (layer.route) {
        const path = layer.route.path;
        const methods = Object.keys(layer.route.methods);
        const middlewares = layer.route.stack.map(s => s.name || "anonymous");

        methods.forEach(method => {
          routes.push({ method, path, middlewares });
        });
      }
    });

    if (!routes.length) {
      console.log(chalk.red("❌ No se detectaron rutas en Express"));
      return;
    }

    const timestamp = Date.now();
    const logPath = `logs/express-routes-${timestamp}.csv`;
    const csv = routes.map(r => `${r.method},${r.path},${r.middlewares.join("|")}`).join("\n");
    fs.writeFileSync(logPath, csv);

    routes.forEach(r => {
      const color = getColor(r.method);
      const secure = r.middlewares.some(m => m.toLowerCase().includes("auth")) ? "🔒" : "🌐";
      console.log(`${secure} ${color(r.method)} ${chalk.cyan(r.path)} [${r.middlewares.join(", ")}]`);
    });

    console.log(`📄 Auditoría con semáforos guardada en ${logPath}`);
  }
};