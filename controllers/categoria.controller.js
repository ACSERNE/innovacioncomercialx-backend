const { Categoria } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Error getAll categorias:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.create = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.json(categoria);
  } catch (error) {
    console.error("Error create categoria:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.update = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });

    await categoria.update(req.body);
    res.json(categoria);
  } catch (error) {
    console.error("Error update categoria:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.remove = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });

    await categoria.destroy();
    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    console.error("Error remove categoria:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
