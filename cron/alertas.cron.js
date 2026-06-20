const cron = require('node-cron');
const alertaService = require('../services/alerta.service');

// Cada hora: stock bajo
cron.schedule('0 * * * *', () => {
  alertaService.generarAlertasStockBajo();
});

// Cada día a las 08:00: vencimiento
cron.schedule('0 8 * * *', () => {
  alertaService.generarAlertasVencimiento();
});

// Cada día a las 23:59: ventas del día
cron.schedule('59 23 * * *', () => {
  alertaService.generarAlertasVentasDia();
});

console.log('⏰ CRON: Alertas programadas');

// Cada día a las 03:00: limpieza automática de alertas
cron.schedule('0 3 * * *', () => {
  alertaService.limpiarAlertas();
  console.log('🧹 CRON: Limpieza automática de alertas ejecutada');
});

