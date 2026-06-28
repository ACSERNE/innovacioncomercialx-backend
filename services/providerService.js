const Provider = require('../models/Provider');
const jwt = require('../utils/jwt');

module.exports = {
  async register(data) {
    return Provider.create(data);
  },

  async login(email) {
    const provider = await Provider.findOne({ email });
    if (!provider) return null;
    return jwt.generateToken({ id: provider._id });
  },

  async getMe(id) {
    return Provider.findById(id);
  },

  async update(id, data) {
    return Provider.findByIdAndUpdate(id, data, { new: true });
  },

  async verifyEmail(id) {
    return Provider.findByIdAndUpdate(id, { verificado_email: true }, { new: true });
  },

  async verifyPhone(id) {
    return Provider.findByIdAndUpdate(id, { verificado_tel: true }, { new: true });
  },

  async verifyIdentity(id) {
    return Provider.findByIdAndUpdate(id, { verificado_identidad: true }, { new: true });
  }
};
