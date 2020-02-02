const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const registerValidations = require('../middlewares/registerValidatorMiddleware');
const upload = require('../middlewares/uploadMiddleware');


router.get('/register', userController.register);
router.get('/login', userController.login);
// router.post('/register', function(req, res) {
//     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//       if (err) {
//        return res.render("register", {info: "Sorry. That username already exists. Try again."});
//       }
//   
//       passport.authenticate('local')(req, res, function () {
//         res.redirect('/');
//       });
//     });
//   });

router.post('/register', registerValidations, userController.save)




module.exports = router;