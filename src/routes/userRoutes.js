const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController')



router.get('/register', userController.register);
router.get('/login', userController.login);

// router.post("/register", function (req, res) {
//   console.log('papita frita')
// 		// res.send(fs.appendFileSync("pendientes.txt", "aprender node"))
// 	  });
module.exports = router