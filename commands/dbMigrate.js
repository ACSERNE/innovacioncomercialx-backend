const { execSync } = require("child_process");

module.exports = function dbMigrate() {
  console.log("🔄 Ejecutando migraciones...");
  execSync("npx sequelize-cli db:migrate", { stdio: "inherit" });
  console.log("✅ Migraciones completadas.");
};