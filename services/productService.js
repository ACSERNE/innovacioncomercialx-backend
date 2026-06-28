const db = require("../models");
const slugify = require("slugify");

module.exports = {
  async create(store_id, data) {
    const slug = slugify(data.nombre, { lower: true, strict: true });

    const product = await db.Product.create({
      store_id,
      nombre: data.nombre,
      slug,
      descripcion: data.descripcion || "",
      precio: data.precio,
      stock: data.stock || 0,
      sku: data.sku || "",
      categoria_id: data.categoria_id || null
    });

    if (data.imagenes?.length > 0) {
      for (const url of data.imagenes) {
        await db.ProductImage.create({ product_id: product.id, url });
      }
    }

    return product;
  },

  async getById(id) {
    return db.Product.findByPk(id, {
      include: [db.ProductImage, db.InventoryLog]
    });
  },

  async getByStore(store_id) {
    return db.Product.findAll({
      where: { store_id },
      include: [db.ProductImage]
    });
  },

  async update(id, data) {
    return db.Product.update(data, { where: { id }, returning: true });
  },

  async delete(id) {
    return db.Product.destroy({ where: { id } });
  },

  async addStock(product_id, cantidad, motivo) {
    const product = await db.Product.findByPk(product_id);
    await product.update({ stock: product.stock + cantidad });

    await db.InventoryLog.create({
      product_id,
      cambio: cantidad,
      motivo
    });

    return product;
  },

  async removeStock(product_id, cantidad, motivo) {
    const product = await db.Product.findByPk(product_id);
    await product.update({ stock: product.stock - cantidad });

    await db.InventoryLog.create({
      product_id,
      cambio: -cantidad,
      motivo
    });

    return product;
  }
};
