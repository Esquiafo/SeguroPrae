const fs = require('fs');
const path = require('path');

const controller = {
	login: (req, res) => {
		//let html = readHTML('login');
		res.render('login');
	},
	register: (req, res) => {
		//let html = readHTML('register');
		res.render('register');
	},
}

module.exports = controller

