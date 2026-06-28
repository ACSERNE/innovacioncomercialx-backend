const Store = require('../models/Store');
const slugify = require('slugify');

module.exports = {
  async create(provider_id, data) {
    const slug = slugify(data.nombre, { lower: true, strict: true });

    return Store.create({
      provider_id,
      nombre: data.nombre,
      slug,
      pais: data.pais,
      idioma: data.idioma || 'es',
      moneda: data.moneda || 'CLP',
      descripcion: data.descripcion || '',
      logo_url: data.logo_url || '',
      portada_url: data.portada_url || ''
    });
  },

  async getById(id) {
    return Store.findById(id);
  },

  async getByProvider(provider_id) {
    return Store.find({ provider_id });
  },

  async update(id, data) {
    return Store.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return Store.findByIdAndDelete(id);
  }
};
