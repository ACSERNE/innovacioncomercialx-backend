const { SellerProduct } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const registros = await SellerProduct.findAll();
    res.json(registros);
  } catch (error) {
    console.error("Error getAll sellerProduct:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.create = async (req, res) => {
  try {
    const registro = await SellerProduct.create(req.body);
    res.json(registro);
  } catch (error) {
    console.error("Error create sellerProduct:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
