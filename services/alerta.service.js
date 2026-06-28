const { Alerta } = require("../models");
const emitter = require("../utils/alertEmitter");

/**
 * Crear una alerta y emitirla en tiempo real
 */
async function crearAlerta(data) {
  try {
    const alerta = await Alerta.create({
      titulo: data.titulo,
      mensaje: data.mensaje,
      tipo: data.tipo || "info",
      prioridad: data.prioridad || "media",
      origen: data.origen || "sistema"
    });

    // Emitir alerta al sistema
    emitter.emitirAlerta(alerta);

    return alerta;
  } catch (error) {
    console.error("❌ Error creando alerta:", error);
    throw error;
  }
}

/**
 * Obtener todas las alertas
 */
async function obtenerAlertas() {
  return await Alerta.findAll({ order: [["createdAt", "DESC"]] });
}

module.exports = {
  crearAlerta,
  obtenerAlertas
};
