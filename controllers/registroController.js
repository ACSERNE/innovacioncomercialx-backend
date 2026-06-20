const { Usuario } = require("../models");

exports.registro = async (req, res) => {
  const { nombre, correo, telefono, tipo } = req.body;

  if (!nombre || !correo || !telefono || !tipo) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  if (!["proveedor", "comprador"].includes(tipo)) {
    return res.status(400).json({ error: "Tipo inválido" });
  }

  const existe = await Usuario.findOne({ where: { correo } });
  if (existe) {
    return res.status(400).json({ error: "El correo ya está registrado" });
  }

  const usuario = await Usuario.create({
    nombre,
    correo,
    telefono,
    tipo
  });

  // TODO: enviar códigos por correo y SMS
  // enviarCodigoCorreo(correo)
  // enviarCodigoSMS(telefono)

  res.json({ mensaje: "Códigos enviados al correo y teléfono", usuarioId: usuario.id });
};

exports.verificarCorreo = async (req, res) => {
  const { correo, codigo } = req.body;

  // TODO: validar código
  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  await usuario.update({ correoVerificado: true });

  res.json({ mensaje: "Correo verificado" });
};

exports.verificarTelefono = async (req, res) => {
  const { telefono, codigo } = req.body;

  // TODO: validar código
  const usuario = await Usuario.findOne({ where: { telefono } });
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  await usuario.update({ telefonoVerificado: true });

  res.json({ mensaje: "Teléfono verificado" });
};

exports.validarIdentidad = async (req, res) => {
  const { correo, nombre, run } = req.body;

  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  if (usuario.tipo !== "proveedor") {
    return res.status(400).json({ error: "Solo proveedores requieren identidad validada" });
  }

  const regexRun = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$/;
  if (!regexRun.test(run)) {
    return res.status(400).json({ error: "RUN inválido" });
  }

  await usuario.update({
    run,
    identidadValidada: true
  });

  res.json({ mensaje: "Identidad validada" });
};
