'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/transacciones', require('./routes/transaccion.routes'));
app.use('/api/reportes', require('./routes/reporte.routes'));
app.use('/api/flujoCaja', require('./routes/flujoCaja.routes'));
app.use('/api/alertas', require('./routes/alerta.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/sales', require('./routes/sale.routes'));
app.use('/api/sellerProduct', require('./routes/sellerProduct.routes'));
app.use('/health', require('./routes/health'));

// Ruta de prueba
app.get('/', (req, res) => res.send('Servidor de Innovación Comercial X activo'));

// Sincronizar base de datos y levantar servidor
const PORT = process.env.PORT || 5001;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida');
    return sequelize.sync(); // sincroniza todos los modelos
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('❌ No se pudo conectar a la base de datos:', err);
  });
