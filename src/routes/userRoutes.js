const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const registerValidations = require('../middlewares/registerValidatorMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/register', userController.register);
router.get('/login', userController.login);

router.post('/register',upload.single('avatar'), registerValidations, userController.save)




module.exports = router;