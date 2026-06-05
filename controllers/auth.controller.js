const jwt = require("jsonwebtoken");
const { User } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_inseguro_cambiar_en_prod";

// =========================
// LOGIN
// =========================
exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: "Correo y password son obligatorios" });
    }

    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Validar contraseña usando método del modelo
    if (!user.validPassword(password)) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, correo: user.correo, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

// =========================
// REGISTER
// =========================
exports.register = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: "Nombre, correo y password son obligatorios" });
    }

    // Protección: solo permitir rol admin si se envía explícitamente
    const roleFinal = rol === "admin" ? "admin" : "user";

    const user = await User.create({
      nombre,
      correo,
      password,
      role: roleFinal
    });

    res.json(user);

  } catch (err) {
    console.error("Error en register:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

