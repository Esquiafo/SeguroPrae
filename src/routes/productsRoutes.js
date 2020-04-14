// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');


const carrito = require('../middlewares/carrito');
const carritoborrado = require('../middlewares/carritoborrado');
const upload = require('../middlewares/upload');

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
router.post('/productAdd',upload.single('image'),productsController.storeProduct);

// /products/:id (DELETE) Acción de borrado
router.get('/allProducts', productsController.productsAll);

// /products/:id (DELETE) Acción de borrado
router.post('/deleteProduct/:productId', productsController.deleteProduct);

// /products/:id/edit (GET) Formulario de edición de productos
router.get('/productUpd/:productId', productsController.updProductShow);

// /products/:id (PUT) Acción de edición (a donde se envía el formulario):
router.post('/productUpd/:productId', productsController.updProduct);

module.exports = router;
