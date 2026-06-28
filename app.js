const express = require('express');
const cors = require('cors');
const app = express();

// ===============================
// SOCKET.IO SERVER WRAPPER
// ===============================
const http = require("http");
const server = http.createServer(app);
const socket = require("./socket");
socket.init(server);

// ===============================
// MIDDLEWARES
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir carpeta pública
app.use(express.static('public'));

// ===============================
// CONEXIÓN BD
// ===============================
const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('📦 Conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error conectando a PostgreSQL:', err));

db.sequelize.sync({ alter: true })
  .then(() => console.log('🗄️ Modelos sincronizados'))
  .catch(err => console.error('❌ Error sincronizando modelos:', err));

// ===============================
// CRONJOBS
// ===============================
require('./cron');
require('./cron/alertas.cron');
require('./cron/reporteDiario.cron');

// ===============================
// RUTAS API EXISTENTES
// ===============================
app.use('/api/reporte', require('./routes/reporte.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/productos/reportes-avanzados', require('./routes/productoReportes.routes'));
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/transacciones', require('./routes/transaccion.routes'));
app.use('/api/detalles', require('./routes/transaccionDetalle.routes'));
app.use('/api/flujo', require('./routes/flujoCaja.routes'));
app.use('/api/alertas', require('./routes/alerta.routes'));
app.use('/api/seller', require('./routes/sellerProduct.routes'));
app.use('/api/detalles/reportes', require('./routes/detalleReportes.routes'));
app.use('/api/flujo/reportes', require('./routes/flujoReportes.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));
app.use('/api/tv', require('./routes/tv.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/ventas', require('./routes/venta.routes'));
app.use('/api/email', require('./routes/email.routes'));

// ===============================
// RUTAS DE VERIFICACIÓN
// ===============================
app.use('/api/verificacion', require('./routes/verificacionCorreo'));
app.use('/api/verificacion', require('./routes/validarCodigo'));

// ===============================
// RUTAS NUEVAS (REGISTRO + LOGIN)
// ===============================
app.use('/api/registro', require('./routes/registro'));
app.use('/api/login', require('./routes/login'));

// ===============================
// BLOQUEO DE TOKENS PÚBLICOS
// ===============================
const noPublicToken = require('./middleware/noPublicToken');
app.use('/api', noPublicToken);

// ===============================
// 🔥 RUTAS DEL MARKETPLACE GLOBAL
// ===============================

// A) Proveedores
app.use('/api/providers', require('./routes/providers'));

// B) Tiendas
app.use('/api/stores', require('./routes/stores'));

// C) Productos
app.use('/api/products', require('./routes/products'));

// E) Dashboard del proveedor
app.use('/api/providers/dashboard', require('./routes/providerDashboard'));

// F) Dashboard del administrador
app.use('/api/admin/dashboard', require('./routes/adminDashboard'));

// G) Marketplace público
app.use('/api/public/stores', require('./routes/publicStores'));
app.use('/api/public/products', require('./routes/publicProducts'));
app.use('/api/public/product', require('./routes/publicProductSlug'));
app.use('/api/public/store', require('./routes/publicStoreProducts'));

// H) Pagos (Stripe)
app.use('/api/payments', require('./routes/payments'));

// I) Carrito + Checkout
app.use('/api/cart', require('./routes/cart'));

// J) Envíos (Chilexpress)
app.use('/api/shipping', require('./routes/shipping'));

// K) Panel del comprador
app.use('/api/buyer', require('./routes/buyer'));

// L) Notificaciones internas
app.use('/api/notifications', require('./routes/notifications'));

// ===============================
// HEALTH CHECK
// ===============================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend operativo' });
});

// ===============================
// RUTA DASHBOARD
// ===============================
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

// ===============================
// RUTA RAÍZ
// ===============================
app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend funcionando correctamente' });
});

// ===============================
// FALLBACK SPA
// ===============================
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// ===============================
// SWAGGER
// ===============================
const swaggerUi = require("swagger-ui-express");
const swaggerInternal = require("./docs/swagger-internal");
const swaggerPublic = require("./docs/swagger-public");

app.use("/api/docs/internal", swaggerUi.serve, swaggerUi.setup(swaggerInternal));
app.use("/api/docs/public", swaggerUi.serve, swaggerUi.setup(swaggerPublic));

// ===============================
// INICIAR SERVIDOR
// ===============================
const PORT = process.env.PORT || 5002;
server.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Servidor backend corriendo en http://0.0.0.0:" + PORT);
});

// =========================
// CORS MIDDLEWARE
// =========================
const corsMiddleware = require("./cors");
app.use(corsMiddleware);

