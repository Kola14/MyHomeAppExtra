var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller');
var multer = require('multer');

var path = require('path');
var fs = require('fs');


var upload = multer({
	dest:'../public/uploads'
});

const error = (err, res) => {
	res
	.status(500)
	.contentType('text/plain')
	.end('Error uploading image');
};

router.post('/upload', upload.single('file'), function(req, res){
	const tempPath = req.file.path;
	const targetPath = path.join(__dirname, '../public/uploads/' + req.file.originalname);

	fs.rename(tempPath, targetPath, err =>{ 
		if (err) return error(err, res);

		userController.NewSignalwImage(req, res);
	});
});

router.get('/getimage/:image', userController.GetImage);

router.get('/signal/:deviceID', userController.NewSignal);
router.get('/geteventhistory/:userID', userController.GetEventHistory);
router.get('/confirm/', userController.ConfirmSignal);
router.get('/getdevices/:userID', userController.GetDevices);
router.get('/getrecent/:userID', userController.GetRecent);
router.get('/gethistory', userController.GetHistory);
router.get('/clearhistory/:userID', userController.ClearHistory);

module.exports = router;
