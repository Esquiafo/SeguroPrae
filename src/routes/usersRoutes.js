// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const registerValidations = require('../middlewares/registerValidatorMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET to /users/register */
// router.get('/register', guestMiddleware, usersController.registerForm);
router.get('/register', usersController.registerForm);

/* POST to /users/register */
// router.post('/register', registerValidations, usersController.storeUser);
router.post('/register', usersController.storeUser);

/* GET to /users/login */
router.get('/login', usersController.loginForm);

/* POST to /users/login */
router.post('/login',guestMiddleware, usersController.processLogin);

/* GET to /users/profile */
router.get('/profile', authMiddleware, usersController.profile);
//router.get('/profile', usersController.profile);

/* GET to /users/logout */
router.get('/logout', usersController.logout);

module.exports = router;