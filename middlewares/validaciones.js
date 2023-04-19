const { body } = require('express-validator');
const validaciones = [
    body('email')
    .not().isEmpty().isEmail().withMessage('Email es requerido'),
    body('password')
    .not().isEmpty().withMessage('Contraseña es requerida'),
];

module.exports = validaciones;
