const db = require('../database/models/');
const Products = db.products;
const PrdCategories = db.prdCategories;

// Helper Functions
function getAllProducts() {
	let productsFileContent = fs.readFileSync(productsFilePath, { encoding: 'utf-8' });
	let productsArray;
	if (productsFileContent == '') {
		productsArray = [];
	} else {
		productsArray = JSON.parse(productsFileContent);
	}
	return productsArray;
}

function guardarProductos(products) {
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
}

module.exports = {

	// Falta
	productCart: (req, res) => {
		res.render('products/productCart');
	},

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
		console.log(req.body);
		Products
			.create(req.body)
			.then(product => {
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
				price: req.body.price
			},
				{
					where: {
						id: req.params.productId,
					}
				})
			.catch(error => res.send(error));

			return res.redirect('/products/allProducts');
	},


}

