const { SellerProduct } = require('../models');

// Crear producto de vendedor
exports.createSellerProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const vendedorId = req.user.id; // asumimos que el middleware auth agrega req.user

    if (!nombre || !precio || !stock) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoProducto = await SellerProduct.create({
      nombre,
      descripcion,
      precio,
      stock,
      vendedorId
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error creando producto vendedor:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Listar productos de vendedor autenticado
exports.getSellerProducts = async (req, res) => {
  try {
    const vendedorId = req.user.id;

    const productos = await SellerProduct.findAll({
      where: { vendedorId }
    });

    res.status(200).json(productos);
  } catch (error) {
    console.error('Error obteniendo productos vendedor:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};
