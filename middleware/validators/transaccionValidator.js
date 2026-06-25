const { body } = require('express-validator');

exports.validarCrearTransaccion = [
  body('tipo')
    .notEmpty().withMessage('El tipo es obligatorio')
    .isIn(['venta', 'compra']).withMessage('El tipo debe ser venta o compra'),

  body('monto')
    .isFloat({ min: 0 }).withMessage('El monto debe ser un número válido'),

  body('fecha')
    .notEmpty().withMessage('La fecha es obligatoria'),

  body('usuarioId')
    .notEmpty().withMessage('El usuario es obligatorio')
];
