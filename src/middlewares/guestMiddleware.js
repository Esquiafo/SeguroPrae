function guestMiddleware (req, res, next) {
	console.log(req.body)
	if(req.session.user == undefined) {
		return next();
	}
	return res.redirect('/users/profile');
}

module.exports = guestMiddleware;