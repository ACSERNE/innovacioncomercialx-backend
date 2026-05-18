const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error getAllUsers:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error("Error getUserById:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.error("Error createUser:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error("Error updateUser:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error deleteUser:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
