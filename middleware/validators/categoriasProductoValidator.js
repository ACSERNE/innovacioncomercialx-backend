const { body } = require('express-validator');

exports.validarCrearCategoria = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
];
