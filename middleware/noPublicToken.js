module.exports = (req, res, next) => {
  if (req.headers['x-public-token']) {
    return res.status(400).json({
      error: "Esta ruta es interna. No uses token público aquí."
    });
  }
  next();
};
