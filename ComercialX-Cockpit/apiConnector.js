const axios = require('axios');

const API_BASE = 'https://acserne-backend.com/api'; // Reemplaza con tu endpoint real

async function autenticarUsuario(email, password) {
  try {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return res.data.token; // JWT
  } catch (err) {
    console.error('❌ Error de autenticación:', err.response?.data || err.message);
    return null;
  }
}

async function registrarAccion(token, email, rol, accion) {
  try {
    await axios.post(`${API_BASE}/acciones`, {
      email,
      rol,
      accion,
      timestamp: new Date().toISOString()
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Acción registrada en backend');
  } catch (err) {
    console.error('❌ Error al registrar acción:', err.response?.data || err.message);
  }
}

async function sincronizarInventario(token) {
  try {
    const res = await axios.get(`${API_BASE}/inventario`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data; // Array de productos
  } catch (err) {
    console.error('❌ Error al sincronizar inventario:', err.response?.data || err.message);
    return [];
  }
}

module.exports = {
  autenticarUsuario,
  registrarAccion,
  sincronizarInventario
};
