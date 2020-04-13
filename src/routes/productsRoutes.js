// ************ Require's ************
const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// let diskStorage = multer.diskStorage({
//	destination: function (req, file, cb) {
//		cb(null, path.join(__dirname, '../../public/images/prdImages'));
//	},
//	filename: function (req, file, cb) {
//		let finalName = Date.now() + path.extname(file.originalname);
//		cb(null, finalName);
//	}
// });

// let upload = multer({ storage: diskStorage })

const carrito = require('../middlewares/carrito');
const carritoborrado = require('../middlewares/carritoborrado');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.get('/carrito',productsController.carritoView);
router.post('/carrito', carritoborrado,productsController.carritoBorrar);

router.get('/vida', productsController.productDetailsvida);
router.post('/vida',carrito ,productsController.carritoForm);

router.get('/incendios', productsController.productDetailsincendios);
router.post('/incendios',carrito , productsController.carritoForm);

router.get('/robo-perdida', productsController.productDetailsroboperdida);
router.post('/robo-perdida',carrito ,  productsController.carritoForm);

// /products/create (GET) Formulario de creación de productos
router.get('/productAdd', productsController.productAdd);

// /products (POST) Acción de creación (a donde se envía el formulario)
router.post('/productAdd',productsController.storeProduct);

// /products/:id (DELETE) Acción de borrado
router.get('/allProducts', productsController.productsAll);

// /products/:id (DELETE) Acción de borrado
router.post('/deleteProduct/:productId', productsController.deleteProduct);

// /products/:id/edit (GET) Formulario de edición de productos
router.get('/productUpd/:productId', productsController.updProductShow);

// /products/:id (PUT) Acción de edición (a donde se envía el formulario):
router.post('/productUpd/:productId', productsController.updProduct);

module.exports = router;
