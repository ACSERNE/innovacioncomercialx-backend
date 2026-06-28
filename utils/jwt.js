const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secret123';

module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
  },

  verifyToken(token) {
    return jwt.verify(token, SECRET);
  }
};
