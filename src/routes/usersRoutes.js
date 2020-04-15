// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Middlewares ************
const upload = require('../middlewares/upload');
const guest = require('../middlewares/guestMiddleware');
const auth = require('../middlewares/authMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET to /users/register */
// router.get('/register', guestMiddleware, usersController.registerForm);
router.get('/register', guest,usersController.registerForm);

/* POST to /users/register */
//router.post('/register',registerMiddleware, upload.single('avatar'), usersController.storeUser);
router.post('/register', upload.single('avatar'), usersController.storeUser);

/* GET to /users/login */
router.get('/login', guest,usersController.loginForm);

/* POST to /users/login */
router.post('/login', usersController.processLogin);

/* GET to /users/profile */
router.get('/profile', auth,usersController.profile);

/* GET to /users/logout */
router.get('/logout', usersController.logout);

module.exports = router;