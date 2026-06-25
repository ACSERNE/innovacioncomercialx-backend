const { verificarToken } = require("../utils/jwt");

module.exports = function authRequired(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = verificarToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
