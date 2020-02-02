const { validationResult } = require('express-validator'); 

const controller = {
	login: (req, res) => {
		//let html = readHTML('login');
		return res.render('login');
	},
	register: (req, res) => {
		return res.render('register');
	},
	save: (req, res) => {
		const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}
		
		let errorsResult = validationResult(req);

		if ( !errorsResult.isEmpty() ) {
			return res.render('register', {
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body
			});
		} else {
			return res.send('<h1>Ok, pasó las validaciones</h1>');
		}
	},
};

module.exports = controller

