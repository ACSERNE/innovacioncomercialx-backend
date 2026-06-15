// server.js
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// -------------------------
// RUTA DE SALUD (ping)
// -------------------------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend vivo sin BD" });
});

// -------------------------
// LOGIN SIMPLE (sin BD)
// -------------------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Credenciales de prueba
  if (email === "admin@x.com" && password === "1234") {
    return res.json({
      token: "TOKEN-DE-PRUEBA",
      user: {
        id: 1,
        name: "Administrador X",
        email: "admin@x.com",
      },
    });
  }

  return res.status(401).json({ error: "Credenciales incorrectas" });
});

// -------------------------
// DASHBOARD SIMPLE (KPIs)
// -------------------------
app.get("/api/dashboard", (req, res) => {
  res.json({
    ventasHoy: 12,
    productosActivos: 48,
    transacciones: 103,
    ingresosHoy: 245000,
  });
});

// -------------------------
// PUERTO
// -------------------------
const PORT = 5003;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend simple corriendo en puerto ${PORT}`);
});

