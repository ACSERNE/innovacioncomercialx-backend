const fs = require("fs");

module.exports = function verLog() {
  const logPath = "logs/database-url-rebuilder.log";
  if (!fs.existsSync(logPath)) {
    console.log("❌ Log no disponible:", logPath);
    return;
  }

  const content = fs.readFileSync(logPath, "utf8");
  console.log("\n📄 Log detectado:\n");
  console.log(content);

  try {
    const { analizarLog } = require("./analizar-log");
    analizarLog(content);
  } catch (e) {}
};