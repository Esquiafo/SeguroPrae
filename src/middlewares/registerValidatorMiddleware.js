const path = require('path');
const { check } = require('express-validator');

module.exports = [
	// validando campo nombre
	check('user_name', 'El nombre es obligatorio').notEmpty(),

	// validando campo email
	check('user_email')
		.notEmpty().withMessage('El email es obligatorio').bail()
		.isEmail().withMessage('Escribí un email válido'),

	// validando campo password
	check('user_password')
		.notEmpty().withMessage('Escribí una contraseña').bail()
		.isLength({ min: 5 }).withMessage('La contraseña debe tener más de 5 letras'),
	
		// validando campo avatar
	check('user_avatar')
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
			if (typeof req.file == 'undefined') {
				throw new Error('Elegí una imagen de perfil');
			} else if (req.file.originalname) {
				let fileExtension = path.extname(req.file.originalname);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos: son JPG, JPEG y PNG');
				}
			}
			return true;
		}),
	check('usrCategId', 'El nombre es obligatorio').notEmpty(),
];