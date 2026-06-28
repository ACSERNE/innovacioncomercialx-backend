const cron = require("node-cron");
const dashboardService = require("../services/dashboardService");

/**
 * CRON: Generar reporte diario del dashboard
 * (Ejemplo: cada día a las 23:59)
 */
cron.schedule("59 23 * * *", async () => {
  try {
    console.log("⏰ Ejecutando reporte diario del dashboard...");

    const data = await dashboardService.obtenerDashboard();

    console.log("📊 Reporte diario generado:", data);
  } catch (error) {
    console.error("❌ Error en reporte diario:", error);
  }
});
