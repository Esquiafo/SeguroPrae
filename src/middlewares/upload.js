const multer = require('multer');
const path = require('path');


let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/photos'));
	},
	filename: function (req, file, cb) {
		let finalName = Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })

module.exports = upload;