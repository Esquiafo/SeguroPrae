const db = require('../database/models');
const Users = db.users;
const UsrCategories = db.usrCategories;
//
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');



const controller = {

	registerForm: (req, res) => {
		// res.render('users/registerForm');
		let usrCategories = UsrCategories.findAll();

		Promise
			.all([usrCategories])
			.then(results => {
				res.render('users/registerForm', {
					usrCategories: results[0]
				});
			})
			.catch(error => res.send(error));

		return;
	},

	storeUser: (req, res) => {
		// Hasheo la contraseña
		console.log(req.body.password)
		req.body.password = bcrypt.hashSync(req.body.password, 11);
		console.log(req.body.password)
		console.log(req.body)

		Users.create(req.body)
			.then(user => {
				res.redirect('/login');
			})
			.catch(error => res.send(error));

		const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}

		let errorsResult = validationResult(req);

		if (!errorsResult.isEmpty()) {
			return res.render('users/registerForm', {
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body
			});
		} else {
			return res.redirect('login');
		}
	},

	loginForm: (req, res) => {
		res.render('users/loginForm');
	},

	processLogin:(req, res) => {
        
		Users
		.findAll({where: {docNum: req.body.docNum}}) //Busca en la DB usuarios con el mismo valor
		.then(users => {
	  let usuario = users[0].dataValues;
	if (usuario != undefined){

	
	let conectado = bcrypt.compareSync(req.body.password , usuario.password);
	
	
		if (conectado) {
			
			req.session.user = usuario;
			
			if (req.body.remember='on') {
				
				console.log(req.body.remember)
				
				res.cookie('usuario', bcrypt.hashSync(req.body.docNum, 11), { maxAge: 9999999});
			}
			
			 res.redirect('/users/profile');
		}else{

			res.send('Datos incorrectos');
		}
	}else{
		res.send('El usuario no existe');
	}

})

	},

	profile: (req, res) => {
		Users
			.findAll()
			.then(users => {
				return res.render('users/profile', {
					users
				});
			})
			.catch(error => res.send(error));
	},

	logout: (req, res) => {
		// Destruimos la session
		req.session.destroy();
		// Pisar la cookie
		res.cookie('usuario', null, { maxAge: -1 });
		// Redirección
		return res.redirect('/users/login');
	}

};

module.exports = controller