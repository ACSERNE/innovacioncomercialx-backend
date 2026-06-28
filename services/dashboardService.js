const { Venta, Producto, Categoria, FlujoCaja } = require("../models");
const { Op } = require("sequelize");

/**
 * Obtener métricas del dashboard
 */
async function obtenerDashboard() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // ============================
  // VENTAS HOY
  // ============================
  const ventasHoy = await Venta.sum("total", {
    where: {
      createdAt: {
        [Op.gte]: hoy
      }
    }
  }) || 0;

  // ============================
  // TOTAL PRODUCTOS
  // ============================
  const totalProductos = await Producto.count();

  // ============================
  // TOTAL CATEGORÍAS
  // ============================
  const totalCategorias = await Categoria.count();

  // ============================
  // FLUJO DE CAJA HOY
  // ============================
  const flujoHoy = await FlujoCaja.sum("monto", {
    where: {
      createdAt: {
        [Op.gte]: hoy
      }
    }
  }) || 0;

  // ============================
  // RETORNAR DASHBOARD
  // ============================
  return {
    ventasHoy,
    totalProductos,
    totalCategorias,
    flujoHoy
  };
}

module.exports = {
  obtenerDashboard
};
