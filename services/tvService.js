const { Producto, Alerta } = require('../models');

class TvService {
  async obtenerEstadoTV() {
    const productos = await Producto.findAll({
      order: [['nombre', 'ASC']]
    });

    const alertas = await Alerta.findAll({
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    const resumen = {
      totalProductos: productos.length,
      productosConStockBajo: productos.filter(p => p.stock <= p.stockMinimo).length,
      productosVencidos: productos.filter(p => p.fechaVencimiento && p.fechaVencimiento < new Date()).length
    };

    return { productos, alertas, resumen };
  }
}

module.exports = new TvService();
