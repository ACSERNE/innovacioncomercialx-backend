const { User } = require('../models'); // Ajusta la ruta si hace falta
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

async function insertDemoUser() {
  try {
    const id = uuidv4();
    const password = await bcrypt.hash('demo1234', 10);
    const user = await User.create({
      id,
      nombre: 'Demo User',
      correo: 'demo@ejemplo.com',
      password,
      role: 'admin',
      activo: true
    });
    console.log('Usuario demo creado:', user.toJSON());
  } catch (error) {
    console.error('Error creando usuario demo:', error);
  } finally {
    process.exit();
  }
}

insertDemoUser();
