const express = require("express");
const router = express.Router();
const { Categoria } = require("../models");

// Crear categoría
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const categoria = await Categoria.create({
      nombre,
      descripcion
    });

    res.status(201).json(categoria);
  } catch (error) {
    console.error("❌ Error creando categoría:", error);
    res.status(500).json({ error: "Error creando categoría" });
  }
});

// Listar categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(categorias);
  } catch (error) {
    console.error("❌ Error obteniendo categorías:", error);
    res.status(500).json({ error: "Error obteniendo categorías" });
  }
});

// Obtener una categoría por ID
router.get("/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    console.error("❌ Error obteniendo categoría:", error);
    res.status(500).json({ error: "Error obteniendo categoría" });
  }
});

// Actualizar categoría
router.put("/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const { nombre, descripcion } = req.body;

    categoria.nombre = nombre ?? categoria.nombre;
    categoria.descripcion = descripcion ?? categoria.descripcion;

    await categoria.save();

    res.json(categoria);
  } catch (error) {
    console.error("❌ Error actualizando categoría:", error);
    res.status(500).json({ error: "Error actualizando categoría" });
  }
});

// Eliminar categoría
router.delete("/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    await categoria.destroy();

    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error eliminando categoría:", error);
    res.status(500).json({ error: "Error eliminando categoría" });
  }
});

module.exports = router;
