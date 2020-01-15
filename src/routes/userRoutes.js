const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController')



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

router.post('/register', function (req, res) {
    res.send(req.body)
  })
  
  let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../data/user.json'));
	},
	filename: function (req, file, cb) {
		let finalName = Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })



module.exports = router;
module.exports = router