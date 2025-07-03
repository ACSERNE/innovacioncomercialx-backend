// app.js
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const db = require('./models');

// Importación de rutas
const userRoutes = require('./routes/user.routes');
const productoRoutes = require('./routes/producto.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const flujoCajaRoutes = require('./routes/flujoCaja.routes');
const alertaRoutes = require('./routes/alerta.routes');
const reporteRoutes = require('./routes/reporte.routes');
const transaccionRoutes = require('./routes/transaccion.routes');
const authRoutes = require('./routes/auth.routes');

// Importar middleware específico
const { authenticate } = require('./middleware/auth');

const app = express();

const PORT_START = process.env.PORT ? Number(process.env.PORT) : 5002;

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// Rutas públicas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/flujo-caja', flujoCajaRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api/reportes', reporteRoutes);

// Rutas protegidas con JWT - usando solo la función authenticate
app.use('/api/transacciones', authenticate, transaccionRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅');
});

function startServer(port) {
  db.sequelize.sync()
    .then(() => {
      const server = app.listen(port, () => {
        console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.warn(`⚠️ Puerto ${port} ocupado, intentando con el siguiente...`);
          startServer(port + 1);
        } else {
          console.error('Error al iniciar el servidor:', err);
        }
      });
    })
    .catch((err) => {
      console.error('Error conectando a la base de datos:', err);
    });
}

startServer(PORT_START);

console.log('userRoutes:', typeof userRoutes);
console.log('productoRoutes:', typeof productoRoutes);
console.log('categoriaRoutes:', typeof categoriaRoutes);
console.log('flujoCajaRoutes:', typeof flujoCajaRoutes);
console.log('alertaRoutes:', typeof alertaRoutes);
console.log('reporteRoutes:', typeof reporteRoutes);
console.log('transaccionRoutes:', typeof transaccionRoutes);
console.log('authRoutes:', typeof authRoutes);
