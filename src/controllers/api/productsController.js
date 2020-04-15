const db = require('../../database/models/');
const Products = db.products;
const PrdCategories = db.prdCategories;

var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

module.exports = {
	productsAll: (req, res) => {
		Products
			.findAll()
			.then(function(products) {
                for (let i = 0; i < products.length; i++) {
                    products[i].setDataValue('endpoint', 'api/products/' + products[i].id);
                }

                let resp = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: '/api/products/allProducts'
                    }, 
                    data: products
                };
                
                return res.json(resp);
			})
			.catch(error => res.send(error));
	},
}