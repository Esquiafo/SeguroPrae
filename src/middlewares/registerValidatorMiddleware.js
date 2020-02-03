const path = require('path');
const { check } = require('express-validator');

module.exports = [


	check('user_name', 'El nombre completo es obligatorio').notEmpty(),

	check('user_num', 'El numero es obligatorio').notEmpty(),

	check('user_repassword', 'El re confirme la contraseña es obligatorio').notEmpty(),


	check('user_NumeroDocumento', 'El numero de identidad es obligatorio').notEmpty().bail()
	.isLength({ min: 8 }).withMessage('La numero de identidad debe tener más de 8 letras'),

	// validando campo email
	check('user_email')
		.notEmpty().withMessage('El email es obligatorio').bail()
		.isEmail().withMessage('Escribí un email válido'),

	// validando campo password
	check('user_repassword')
		.notEmpty().withMessage('Escribí una contraseña').bail()
		.isLength({ min: 5 }).withMessage('La contraseña debe tener más de 5 letras'),
	
];