require("dotenv").config();

module.exports = function envValidator() {
  console.log("🧪 Validando .env...");
  const required = ["DB_HOST", "DB_USER", "DB_PASS", "DATABASE_URL"];
  required.forEach((key) => {
    if (process.env[key]) {
      console.log(`✅ Variable OK: ${key}`);
    } else {
      console.warn(`⚠️ Falta en .env: ${key}`);
    }
  });
};