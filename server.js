const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const db = require('./models');

// Importar rutas
const userRoutes = require('./routes/user.routes');
const productoRoutes = require('./routes/producto.routes');
const alertaRoutes = require('./routes/alerta.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const flujoCajaRoutes = require('./routes/flujoCaja.routes');
const reporteRoutes = require('./routes/reporte.routes');
const authRoutes = require('./routes/auth.routes');
const saleRoutes = require('./routes/sale.routes');
// Importar rutas tienda en línea (seller products)
const sellerProductRoutes = require('./routes/sellerProduct.routes');

const app = express();
const PORT = process.env.PORT || 5002;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/flujo-caja', flujoCajaRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sales', saleRoutes);
// Rutas tienda en línea
app.use('/api/seller-products', sellerProductRoutes);

// Ruta raíz para prueba rápida
app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅');
});

// Sincronizar base de datos y arrancar servidor
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al conectar con la base de datos:', error);
  });
