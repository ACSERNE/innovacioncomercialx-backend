module.exports = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const fecha = new Date().toISOString();

  console.log(\`[AUDITORIA] \${fecha} - \${ip} - \${req.method} \${req.originalUrl}\`);

  next();
};
