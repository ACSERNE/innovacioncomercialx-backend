const { SellerProduct, Producto, Usuario } = require('../models');

class SellerProductService {
  async asignarProducto(data) {
    return await SellerProduct.create(data);
  }

  async obtenerAsignaciones() {
    return await SellerProduct.findAll({
      include: [
        { model: Producto, as: 'producto' },
        { model: Usuario, as: 'seller' }
      ],
      order: [['id', 'ASC']]
    });
  }

  async obtenerAsignacionPorId(id) {
    return await SellerProduct.findByPk(id, {
      include: [
        { model: Producto, as: 'producto' },
        { model: Usuario, as: 'seller' }
      ]
    });
  }

  async actualizarAsignacion(id, data) {
    const asignacion = await SellerProduct.findByPk(id);
    if (!asignacion) return null;
    await asignacion.update(data);
    return asignacion;
  }

  async eliminarAsignacion(id) {
    const asignacion = await SellerProduct.findByPk(id);
    if (!asignacion) return null;
    await asignacion.destroy();
    return true;
  }
}

module.exports = new SellerProductService();
