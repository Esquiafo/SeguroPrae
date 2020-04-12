
const controller = {
	index: (req, res) => {
		res.render('index');
	},
	users: (req, res) => {
		res.render('users');
	},

};

module.exports = controller
