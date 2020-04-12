const db = require('../database/models');
const Users = db.users;
const UsrCategories = db.usrCategories;
//
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Users File Path
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper Functions
function getAllUsers() {
	let usersFileContent = fs.readFileSync(usersFilePath, 'utf-8');
	let usersArray;
	if (usersFileContent == '') {
		usersArray = [];
	} else {
		usersArray = JSON.parse(usersFileContent);
	}
	return usersArray;
}

function generateId() {
	let users = getAllUsers();
	if (users.length == 0) {
		return 1;
	}
	let lastUser = users.pop();
	return lastUser.id + 1;
}

function storeUser(userData) {
	let users = getAllUsers();
	users.push(userData);
	fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
}

function getUserByDni(dni) {
	let allUsers = getAllUsers();
	let userFind = allUsers.find(oneUser => oneUser.user_dni == dni);
	return userFind;
}


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
		// req.body.password = bcrypt.hashSync(req.body.password, 11);
		db.users.create(req.body)
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

	processLogin: (req, res) => {
		// Busco al usuario por dni
		Users.findAll({
			where: {
				docNum: req.body.docNum
			}
		})
		.then(user => {
			// Valido si existe el usuario
			if (user != undefined) {
				// Magia
				if (req.body.password === user[0].password) {
					// Borramos la contraseña del objeto usuario
					delete user[0].password;
			
					// Pasamos al usuario a session
					req.session.user = user[0];

					if (req.body.remember) {
						res.cookie('user', user[0].id, { maxAge: 180000 });
					}

					// Redirección
					return res.redirect('/users/profile');
				} else {
					res.send('Datos incorrectos');
				}
			} else {
				res.send('El usuario no existe');
			}
		});

	},

	profile: (req, res) => {
		res.render('users/profile', {
			user: req.session.user
		});
	},

	logout: (req, res) => {
		// Destruimos la session
		req.session.destroy();
		// Pisar la cookie
		res.cookie('user', null, { maxAge: -1 });
		// Redirección
		return res.redirect('/users/login');
	}

};

module.exports = controller