const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./config/database');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend ComercialX funcionando 🚀');
});

sequelize.authenticate()
  .then(() => console.log('Base de datos conectada ✅'))
  .catch(err => console.log('Error DB: ', err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
