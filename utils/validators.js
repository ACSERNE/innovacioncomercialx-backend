module.exports = {
  isEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  isPhone(phone) {
    return /^[0-9]{8,15}$/.test(phone);
  }
};
