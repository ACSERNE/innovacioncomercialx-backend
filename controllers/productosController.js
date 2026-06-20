const { Producto, Usuario } = require("../models");

exports.crearProducto = async (req, res) => {
  const { correo, nombreProducto, precio, stock } = req.body;

  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (usuario.tipo !== "proveedor") {
    return res.status(403).json({ error: "Solo proveedores pueden crear productos" });
  }

  if (!usuario.correoVerificado || !usuario.telefonoVerificado || !usuario.identidadValidada) {
    return res.status(403).json({ error: "Cuenta no verificada completamente" });
  }

  const producto = await Producto.create({
    nombre: nombreProducto,
    precio,
    stock,
    usuarioId: usuario.id
  });

  res.json({ mensaje: "Producto creado correctamente", producto });
};
