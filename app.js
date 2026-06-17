const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Conexión BD
const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('📦 Conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error conectando a PostgreSQL:', err));

db.sequelize.sync({ alter: true })
  .then(() => console.log('🗄️ Modelos sincronizados'))
  .catch(err => console.error('❌ Error sincronizando modelos:', err));

// 🔥 Activar CRONJOBS
require('./cron');

// Rutas
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

app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend funcionando correctamente' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://0.0.0.0:${PORT}`);
});

app.use('/api/detalles/reportes', require('./routes/detalleReportes.routes'));
app.use('/api/flujo/reportes', require('./routes/flujoReportes.routes'));
app.use('/api/alertas', require('./routes/alertas.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));
app.use('/api/tv', require('./routes/tv.routes'));
// Seguridad global
require('./security')(app);
// Servir carpeta pública
app.use(express.static('public'));
// Fallback para rutas del frontend
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
