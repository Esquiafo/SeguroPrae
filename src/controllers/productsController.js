const fs = require('fs');
const path = require('path');

// Users File Path
const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper Functions
function getAllProducts () {
	let productsFileContent = fs.readFileSync(productsFilePath, 'utf-8');
	console.log(productsFileContent);
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

const controller = {
     
	productCart: (req, res) => {
		res.render('products/productCart');
	},
	productDetailsroboperdida: (req, res) => {
		res.render('products/productDetailsroboperdida');
	},
	productDetailsvida: (req, res) => {
		res.render('products/productDetailsvida');
	},
	productDetailsincendios: (req, res) => {
		res.render('products/productDetailsincendios');
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
	
};

module.exports = controller