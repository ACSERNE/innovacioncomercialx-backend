const reporteService = require('../services/reporteService');

class ReporteController {

  // -----------------------------
  // VENTAS EXCEL
  // -----------------------------
  async ventasExcel(req, res) {
    try {
      const { desde, hasta } = req.query;
      const ventas = await reporteService.obtenerVentasEntreFechas(desde, hasta);

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="reporte_ventas.xlsx"');

      await reporteService.generarExcelVentas(ventas, res);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar reporte de ventas (Excel)', detalle: error.message });
    }
  }

  // -----------------------------
  // VENTAS PDF
  // -----------------------------
  async ventasPDF(req, res) {
    try {
      const { desde, hasta } = req.query;
      const ventas = await reporteService.obtenerVentasEntreFechas(desde, hasta);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="reporte_ventas.pdf"');

      await reporteService.generarPDFVentas(ventas, res);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar reporte de ventas (PDF)', detalle: error.message });
    }
  }

  // -----------------------------
  // FLUJO DE CAJA EXCEL
  // -----------------------------
  async flujoCajaExcel(req, res) {
    try {
      const { desde, hasta } = req.query;
      const movimientos = await reporteService.obtenerFlujoCajaEntreFechas(desde, hasta);

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="reporte_flujo_caja.xlsx"');

      await reporteService.generarExcelFlujoCaja(movimientos, res);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar reporte de flujo de caja (Excel)', detalle: error.message });
    }
  }

  // -----------------------------
  // PRODUCTOS EXCEL
  // -----------------------------
  async productosExcel(req, res) {
    try {
      const productos = await reporteService.obtenerProductos();

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="reporte_productos.xlsx"');

      await reporteService.generarExcelProductos(productos, res);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar reporte de productos (Excel)', detalle: error.message });
    }
  }
}

module.exports = new ReporteController();
