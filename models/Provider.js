const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  nombre: { type: String, required: true },
  pais: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  verificado_email: { type: Boolean, default: false },
  verificado_tel: { type: Boolean, default: false },
  verificado_identidad: { type: Boolean, default: false },
  estado: { type: String, default: 'activo' },
  fecha_registro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Provider', ProviderSchema);
