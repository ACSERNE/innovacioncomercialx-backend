'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models'); // Ajusta la ruta si tu estructura es distinta

async function realizarCompra(userId, productoId, cantidad = 1) {
  const transaction = await db.sequelize.transaction();

  try {
    const producto = await db.Producto.findByPk(productoId);
    if (!producto) throw new Error('Producto no encontrado');

    if (producto.stock < cantidad) {
      return {
        error: 'Stock insuficiente',
        producto: {
          nombre: producto.nombre,
          stock_disponible: producto.stock,
          solicitado: cantidad
        }
      };
    }

    // Restar el stock disponible
    producto.stock -= cantidad;
    await producto.save({ transaction });

    // Crear la transacción con todos los campos requeridos
    const nuevaTransaccion = await db.Transaccion.create({
      id: uuidv4(),
      userId: userId,
      productoId: producto.id, // campo correcto según migración/modelo
      tipo: 'Compra registrada',
      cantidad: cantidad,
      precio_unitario: producto.precio_unitario,
      total: producto.precio_unitario * cantidad,
      metodo_pago: 'Tarjeta de crédito'
    }, { transaction });

    // Registrar en LogActividad
    await db.LogActividad.create({
      id: uuidv4(),
      userId: userId,
      tipo: 'Compra registrada',
      descripcion: `Usuario compró ${cantidad} unidades de ${producto.nombre}`,
      fecha: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, { transaction });

    await transaction.commit();

    return {
      mensaje: 'Compra registrada exitosamente',
      producto: {
        nombre: producto.nombre,
        cantidad_comprada: cantidad,
        stock_restante: producto.stock
      },
      transaccion: {
        id: nuevaTransaccion.id,
        tipo: nuevaTransaccion.tipo,
        cantidad: nuevaTransaccion.cantidad,
        total: nuevaTransaccion.total,
        productoId: nuevaTransaccion.productoId,
        metodo_pago: nuevaTransaccion.metodo_pago
      }
    };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message };
  }
}

module.exports = realizarCompra;