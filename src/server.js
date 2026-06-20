require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Importar rutas reales (CommonJS)
const userRoutes = require("../routes/user.routes");
const productoRoutes = require("../routes/producto.routes");
const categoriaRoutes = require("../routes/categoria.routes");
const flujoCajaRoutes = require("../routes/flujoCaja.routes");
const alertaRoutes = require("../routes/alerta.routes");
const reporteRoutes = require("../routes/reporte.routes");
const transaccionRoutes = require("../routes/transaccion.routes");
const dashboardRoutes = require("../routes/dashboard.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Ruta de salud
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "innovacioncomercialx-backend" });
});

// Rutas reales
app.use("/api/user", userRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/categoria", categoriaRoutes);
app.use("/api/flujo-caja", flujoCajaRoutes);
app.use("/api/alerta", alertaRoutes);
app.use("/api/reporte", reporteRoutes);
app.use("/api/transaccion", transaccionRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
