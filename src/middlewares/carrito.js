function carrito(req, res, next) {
    let cookie = req.cookies.compra
    if(cookie != null) {
        console.log('La cookie ya existe')
    } else {
         // Crear la cookie
		let array=[];
		res.cookie('compra', JSON.stringify(array), { maxAge: (1000 * 60) * 5 });
		console.log('La Cookie fue creada')
	}
    next();
}


module.exports = carrito



