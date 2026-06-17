import express from "express";
import cors from "cors";
import morgan from "morgan";

// Importar rutas reales
import userRoutes from "../routes/user.routes.js";
import productoRoutes from "../routes/producto.routes.js";
import categoriaRoutes from "../routes/categoria.routes.js";
import flujoCajaRoutes from "../routes/flujoCaja.routes.js";
import alertaRoutes from "../routes/alerta.routes.js";
import reporteRoutes from "../routes/reporte.routes.js";
import transaccionRoutes from "../routes/transaccion.routes.js";
import dashboardRoutes from "../routes/dashboard.routes.js";

const app = express();

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

export default app;
