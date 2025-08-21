const { execSync } = require("child_process");

module.exports = function seedAll() {
  console.log("🌱 Ejecutando seeders...");
  execSync("npx sequelize-cli db:seed:all", { stdio: "inherit" });
  console.log("✅ Seeders completados.");
};