function authMiddleware (req, res, next) {
	// Si exista algo en la prop user de session
	if(req.session.user != undefined) {
		return next();
	}
	return res.redirect('/users');
}

module.exports = authMiddleware;