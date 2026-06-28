const cron = require("node-cron");
const alertaService = require("../services/alerta.service");

/**
 * CRON: Generar alerta automática cada X tiempo
 * (Ejemplo: cada 10 minutos)
 */
cron.schedule("*/10 * * * *", async () => {
  try {
    console.log("⏰ Ejecutando cron de alertas...");

    await alertaService.crearAlerta({
      titulo: "Revisión automática",
      mensaje: "El sistema ejecutó el cron de alertas correctamente.",
      tipo: "sistema",
      prioridad: "baja",
      origen: "cron"
    });

    console.log("✅ Alerta generada por cron");
  } catch (error) {
    console.error("❌ Error en cron de alertas:", error);
  }
});
