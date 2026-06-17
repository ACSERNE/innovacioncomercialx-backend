const IPsBloqueadas = [
  "123.456.789.000",
  "201.222.111.55"
];

module.exports = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (IPsBloqueadas.includes(ip)) {
    return res.status(403).json({ error: "Acceso denegado" });
  }

  next();
};
