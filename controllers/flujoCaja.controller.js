async function main() {
const { FlujoCaja } = require('../models');

// Obtener todos los registros de flujo de caja
exports.getAllFlujos = async (req, res) => {
  try {
    const flujos = await FlujoCaja.findAll();
    res.json(flujos);
  } catch (error) {
    console.error('❌ Error al obtener flujos de caja:', error);
    res.status(500).json({ error: 'Error al obtener flujos de caja' });
  }
};

// Crear flujo de caja
exports.createFlujo = async (req, res) => {
  try {
    const { descripcion, monto, tipo, fecha } = req.body;
    const nuevoFlujo = await FlujoCaja.create({ descripcion, monto, tipo, fecha });
    res.status(201).json(nuevoFlujo);
  } catch (error) {
    console.error('❌ Error al crear flujo de caja:', error);
    res.status(500).json({ error: 'Error al crear flujo de caja' });
  }
};

// Eliminar flujo de caja
exports.deleteFlujo = async (req, res) => {
  try {
    const flujo = await FlujoCaja.findByPk(req.params.id);
    if (!flujo) return res.status(404).json({ error: 'Registro no encontrado' });

    await flujo.destroy();
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar flujo:', error);
    res.status(500).json({ error: 'Error al eliminar flujo' });
  }
};
}
main()
