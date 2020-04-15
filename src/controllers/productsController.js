const db = require('../database/models/');
const Products = db.products;
const PrdCategories = db.prdCategories;

var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())


module.exports = {

	productDetailsroboperdida: (req, res) => {
		Products
			.findAll()
			.then(products => {
				return res.render('products/productDetailsroboperdida', {
					products
				});
			})
			.catch(error => res.send(error));

	},

	productDetailsvida: (req, res) => {

		Products
			.findAll()
			.then(products => {
				return res.render('products/productDetailsvida', {
					products
				});
			})
			.catch(error => res.send(error));

	},

	productDetailsincendios: (req, res) => {
		Products
			.findAll()
			.then(products => {
				return res.render('products/productDetailsincendios', {
					products
				});
			})
			.catch(error => res.send(error));

	},

	productAdd: (req, res) => {

		let prdCategories = PrdCategories.findAll();

		Promise
			.all([prdCategories])
			.then(results => {
				res.render('products/productAdd', {
					prdCategories: results[0]
				});
			})
			.catch(error => res.send(error));

		return;

	},

	storeProduct: (req, res) => {
		
		Products
			.create({
				image: req.file.filename,
				...req.body}
				)
			.then(products => {
				return res.redirect('/products/productAdd');
				
			})
			.catch(error => res.send(error));
	},

	productsAll: (req, res) => {
		Products
			.findAll()
			.then(products => {
				return res.render('products/allProducts', {
					products
				});
			})
			.catch(error => res.send(error));
	},

	deleteProduct: (req, res) => {

		Products
			.findByPk(req.params.productId)
			.then(product => {
				product.destroy();
				return res.redirect('/products/allProducts');
			})
			.catch(error => res.send(error));
	},

	updProductShow: (req, res) => {

		Products
			.findByPk(req.params.productId, {
				include: ['prdCategory']
			})
			.then(product => {
				return res.render('products/productUpd', { updPrd: product });
			})
			.catch(error => res.send(error));

	},

	updProduct: (req, res) => {

		Products
			.update({
				prdCategId: req.body.prdCategId,
				description: req.body.description,
				price: req.body.price,
				
			},
				{
					where: {
						id: req.params.productId,
					}
				})
			.catch(error => res.send(error));

			return res.redirect('/products/allProducts');
	},
	carritoForm: (req, res) =>  {
		if (req.cookies.compra!=undefined) {
			console.log('Pisando datos')
			let contenidoCookie = JSON.parse(req.cookies.compra);  // Convierto el array en string para poder pushearle cosas
			contenidoCookie.push(req.body.item); // Le metés a ese array que recuperaste el contenido nuevo
			console.log(contenidoCookie)
			res.cookie('compra', JSON.stringify(contenidoCookie), { maxAge: (1000 * 60) * 10 }); // Volvés a setear la cookie
		} else {
			console.log('Creando datos por primera vez')
			let contenidoCookie =  [req.body.item]
			res.cookie('compra', JSON.stringify(contenidoCookie), { maxAge: (1000 * 60) * 10 }); // Seteo la cookie para que nunca mas sea undefined
		  }
		  res.redirect('../');
	},
	carritoView: (req, res) => {
		// let errorView=res.status(500)
		// if (errorView===errorView){
		// 	res.status('El carrito esta vacio, metele cosas pa, para que queres comprar si sabes que no hay nada, vos vas al super y vas a la caja con el chango vacio? No, bueno aca tampoco');
		// }
		DatosCookie=req.cookies.compra
		Products
		
			.findAll()
			.then(products => {
				return res.render('products/productCart', {
					products,
					DatosCookie,
				});
				
			})
			
			.catch(error => res.send(error));
		},
	carritoBorrar: (req,res) => {
		Products

		.findAll()
		.then(products => {
			return res.render('products/productCart',{
				products,
				DatosCookie
			})
		})
		.catch(error => res.send(error));
		
	}

}

			
			
		
		 



