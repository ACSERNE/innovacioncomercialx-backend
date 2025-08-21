// server.js
const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 5002;

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });
