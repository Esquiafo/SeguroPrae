const { validationResult } = require('express-validator'); 
const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/user.json');

function getAllUsers() {
	let userFileContent= fs.readFileSync(userFilePath, {encoding: 'utf-8'});
	let userArray;
	if(userFileContent == ''){
		userArray = [];
	} else {
		userArray = JSON.parse(userFileContent);;
	}
	return userArray
}
function generateId() {
	let user = getAllUsers();
	if(user.length == 0){
		return 1;
	}
	let lastUser= user.pop();
	return lastUser.id + 1;
}
function storeUser(userData) {
	let user = getAllUsers();
	user.push(userData);
	fs.writeFileSync(userFilePath, JSON.stringify(user, null, ''));
}


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
			let newUser = {
				id: generateId(),
				...req.body
			}
			// Guardo el producto en el JSON
			storeUser(newUser);
			// Redirección
			res.redirect('/login');
		}
	},
};

module.exports = controller

