const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

// Rutas principales del backend
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/producto.routes"));
app.use("/api/sales", require("./routes/sale.routes"));

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("🔥 Error global:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});
