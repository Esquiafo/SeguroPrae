const path = require('path');
const { check } = require('express-validator');

module.exports = [


	check('usrName', 'El A es obligatorio').notEmpty(),


	check('NumeroDocumento', 'El numero de identidad es obligatorio').notEmpty().bail()
	.isLength({ min: 8 }).withMessage('La numero de identidad debe tener más de 8 letras'),

	// validando campo email
	check('email')
		.notEmpty().withMessage('El email es obligatorio').bail()
		.isEmail().withMessage('Escribí un email válido'),

	// validando campo password
	check('password')
		.notEmpty().withMessage('Escribí una contraseña').bail()
		.isLength({ min: 5 }).withMessage('La contraseña debe tener más de 5 letras'),
	
];