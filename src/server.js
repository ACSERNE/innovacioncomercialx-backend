// Cargar variables de entorno
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Importar rutas
const userRoutes = require("./routes/user.routes");
const productoRoutes = require("./routes/producto.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const flujoCajaRoutes = require("./routes/flujoCaja.routes");
const alertaRoutes = require("./routes/alerta.routes");
const reporteRoutes = require("./routes/reporte.routes");
const transaccionRoutes = require("./routes/transaccion.routes");
const authRoutes = require("./routes/auth.routes");

// Inicializar app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/flujo-caja", flujoCajaRoutes);
app.use("/api/alertas", alertaRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/transacciones", transaccionRoutes);
app.use("/api/auth", authRoutes);

// Puerto
const PORT = process.env.PORT || 5002;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(\`🚀 Servidor backend corriendo en http://localhost:\${PORT}\`);
});
