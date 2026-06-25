const cron = require('node-cron');
const { Producto } = require('../models');
const alertaService = require('../services/alerta.service');
const { Op } = require('sequelize');

// 1) STOCK BAJO — cada 1 hora
cron.schedule('0 * * * *', async () => {
  const productos = await Producto.findAll();

  for (const p of productos) {
    if (p.stock <= p.stockMinimo) {
      const existe = await alertaService.existeAlertaActiva('stock_bajo', p.id);
      if (!existe) {
        await alertaService.crearAlerta(
          'stock_bajo',
          `Stock bajo: ${p.nombre} (${p.stock})`,
          p.id
        );
      }
    }
  }
});

// 2) VENCIMIENTO PRÓXIMO — todos los días a las 00:00
cron.schedule('0 0 * * *', async () => {
  const hoy = new Date();
  const limite = new Date();
  limite.setDate(hoy.getDate() + 7);

  const productos = await Producto.findAll({
    where: {
      fechaVencimiento: {
        [Op.between]: [hoy, limite]
      }
    }
  });

  for (const p of productos) {
    const existe = await alertaService.existeAlertaActiva('vencimiento_proximo', p.id);
    if (!existe) {
      await alertaService.crearAlerta(
        'vencimiento_proximo',
        `Producto por vencer: ${p.nombre} (${p.fechaVencimiento})`,
        p.id
      );
    }
  }
});

// 3) PRODUCTOS VENCIDOS — todos los días a las 00:05
cron.schedule('5 0 * * *', async () => {
  const hoy = new Date();

  const productos = await Producto.findAll({
    where: {
      fechaVencimiento: {
        [Op.lt]: hoy
      }
    }
  });

  for (const p of productos) {
    const existe = await alertaService.existeAlertaActiva('vencido', p.id);
    if (!existe) {
      await alertaService.crearAlerta(
        'vencido',
        `Producto vencido: ${p.nombre} (${p.fechaVencimiento})`,
        p.id
      );
    }
  }
});

// 4) LIMPIEZA AUTOMÁTICA — todos los días a las 03:00
cron.schedule('0 3 * * *', async () => {
  await alertaService.limpiarAlertasViejas();
});
