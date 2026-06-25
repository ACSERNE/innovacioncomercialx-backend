const { body } = require('express-validator');

exports.validarMovimientoCaja = [
  body('tipo')
    .notEmpty().withMessage('El tipo es obligatorio')
    .isIn(['ingreso', 'egreso']).withMessage('El tipo debe ser ingreso o egreso'),

  body('monto')
    .isFloat({ min: 0 }).withMessage('El monto debe ser un número válido'),

  body('fecha')
    .notEmpty().withMessage('La fecha es obligatoria')
];
