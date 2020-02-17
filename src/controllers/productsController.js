const db = require('../database/models/');
const Products = db.products;
const PrdCategories = db.prdCategories;

// Helper Functions
function getAllProducts () {
	let productsFileContent = fs.readFileSync(productsFilePath, {encoding:'utf-8'});
	let productsArray;
	if (productsFileContent == '') {
		productsArray = [];
	} else {
		productsArray = JSON.parse(productsFileContent);
	}
	return productsArray;
}

function guardarProductos (products) {
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
}

module.exports = {
     
	productCart: (req, res) => {
		res.render('products/productCart');
	},

	
	// PASADA
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

	// PASADA
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

	// PASADA
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
	
	// PASADO
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
	
	// PASADA
    storeProduct: (req, res) => {		
		console.log(req.body);
		Products
			.create(req.body)
			.then(product => {
				return res.redirect('/products/productAdd');
			})
			.catch(error => res.send(error));
	},
	
	/* PASADA */
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
		let productsData = getAllProducts();
		finalPrdData = productsData.filter(function(product){
			return product.id != req.params.productId;
		});
		guardarProductos(finalPrdData);
		res.redirect('/products/allProducts');
	},

	updProduct: (req, res) => {
		let productsData = getAllProducts();
		updPrd = productsData.filter(function(product){
			return product.id == req.params.productId;
		});
		
		res.render('products/productUpd', {updPrd: updPrd});
	},
	
}

 