const cron = require('node-cron');
const dashboardService = require('../services/dashboardService');
const emailService = require('../services/emailService');

cron.schedule('0 7 * * *', async () => {
  console.log("📨 Enviando reporte diario...");

  const resumen = await dashboardService.obtenerDashboard();
  await emailService.enviarReporteDiario(resumen);

  console.log("📨 Reporte diario enviado.");
});
