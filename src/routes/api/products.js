// ************ Require's ************
const express = require('express');
const router = express.Router();

const productsAPIController = require('../../controllers/api/productsController');

// /products/:id (DELETE) Acción de borrado
router.get('/allProducts', productsAPIController.productsAll);


module.exports = router;