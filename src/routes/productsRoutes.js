// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/prdImages'));
	},
	filename: function (req, file, cb) {
		let finalName = Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })

router.get('/productCart', productsController.productCart);

router.get('/productDetailsvida', productsController.productDetailsvida);

router.get('/productDetailsincendios', productsController.productDetailsincendios);

router.get('/productDetailsroboperdida', productsController.productDetailsroboperdida);

// /products/create (GET) Formulario de creación de productos
router.get('/productAdd', productsController.productAdd);

// /products (POST) Acción de creación (a donde se envía el formulario)
router.post('/productAdd', upload.single('prd_image'),productsController.storeProduct);

// /products/:id (DELETE) Acción de borrado
router.get('/allProducts', productsController.productsAll);

// /products/:id (DELETE) Acción de borrado
router.post('/deleteProduct/:productId', productsController.deleteProduct);

// /products/:id/edit (GET) Formulario de edición de productos
router.get('/productUpd/:productId', productsController.updProduct);
// /products/:id (PUT) Acción de edición (a donde se envía el formulario):
router.put('/productUpd/:productId', productsController.updProduct);
module.exports = router;
