const crypto = require('crypto');

const generateSignature = (email) => {
  return crypto.createHash('sha256').update(email + 'secret-key').digest('hex');
};

module.exports = generateSignature;
