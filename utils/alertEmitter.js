const EventEmitter = require("events");

class AlertEmitter extends EventEmitter {}

const emitter = new AlertEmitter();

/**
 * Emitir alerta global
 */
function emitirAlerta(alerta) {
  emitter.emit("alerta", alerta);
  console.log("📢 Alerta emitida:", alerta.titulo || alerta.mensaje);
}

module.exports = {
  emitter,
  emitirAlerta
};
