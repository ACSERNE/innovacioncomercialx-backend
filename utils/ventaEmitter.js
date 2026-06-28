const EventEmitter = require("events");

class VentaEmitter extends EventEmitter {}

const emitter = new VentaEmitter();

function emitirVenta(transaccion) {
  emitter.emit("venta", transaccion);
  console.log("📢 Venta emitida:", transaccion.id, "total:", transaccion.total);
}

module.exports = {
  emitter,
  emitirVenta
};
