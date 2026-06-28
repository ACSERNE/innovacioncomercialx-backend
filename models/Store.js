const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  nombre: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  pais: { type: String, required: true },
  idioma: { type: String, default: 'es' },
  moneda: { type: String, default: 'CLP' },
  descripcion: { type: String, default: '' },
  logo_url: { type: String, default: '' },
  portada_url: { type: String, default: '' },
  estado: { type: String, default: 'activa' },
  fecha_creacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Store', StoreSchema);
