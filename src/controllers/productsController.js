const db = require('../database/models/');
const Products = db.products;
const PrdCategories = db.prdCategories;

//const fs = require('fs');
//const path = require('path');

// Users File Path
//const productsFilePath = path.join(__dirname, '../data/products.json');

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

function generateId () {
	let product = getAllProducts();
	if (product.length == 0) {
		return 1;
	}
	let lastProd = product.pop();
	return lastProd.id + 1;
}

function storeUser (productData) {
	let products = getAllProducts();
	products.push(productData);
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
}

function guardarProductos (products) {
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
}

module.exports = {
     
	productCart: (req, res) => {
		res.render('products/productCart');
	},

	productDetailsroboperdida: (req, res) => {
		let productsData = getAllProducts();
		res.render('products/productDetailsroboperdida', { productsData });
	},

	productDetailsvida: (req, res) => {
		let productsData = getAllProducts();
		res.render('products/productDetailsvida', { productsData });
	},

	productDetailsincendios: (req, res) => {
		let productsData = getAllProducts();
		res.render('products/productDetailsincendios', { productsData });
	},

	productAdd: (req, res) => {
		res.render('products/productAdd');
	},
	
    storeProduct: (req, res) => {		
		
		let newProductData = {
			id: generateId(),
			prd_image: req.file.filename,
			...req.body
		}
		// Guardo el producto en el JSON
		storeUser(newProductData);
		// Redirección
		res.redirect('/products/productAdd');
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
		// let productsData = getAllProducts();
		// res.render('products/allProducts', { productsData });
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

 