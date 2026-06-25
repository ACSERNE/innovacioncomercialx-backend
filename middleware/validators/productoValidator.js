const { body } = require('express-validator');

exports.validarCrearProducto = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),

  body('precio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número válido'),

  body('stock')
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero'),

  body('categoriaId')
    .notEmpty().withMessage('La categoría es obligatoria')
];
