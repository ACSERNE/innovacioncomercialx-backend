// config/db-config.js
require("dotenv").config();

module.exports = {
  connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/db",
};