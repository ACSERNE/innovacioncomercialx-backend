const { getIO } = require('./socketServer');

module.exports = {
  emitirVenta: (venta) => {
    getIO().emit('venta:nueva', venta);
  },

  emitirAlerta: (alerta) => {
    getIO().emit('alerta:nueva', alerta);
  },

  emitirStock: (producto) => {
    getIO().emit('stock:cambio', producto);
  },

  emitirDashboard: (data) => {
    getIO().emit('dashboard:update', data);
  }
};
