var express = require('express');
var multer = require('multer');
var fs = require('fs');

var app = express();
app.use(multer({
	dest: __dirname + '/uploads/',
	rename: function(fieldname, filename) {
		return Date.now();
	},
	limits: {
		fileSize: 100000
	},
	onFileSizeLimit: function(file) {
		console.log('Failed: ' + file.originalname + ' is limited');
		fs.unlink(file.path);
	}
}));


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function(req, res) {
	res.send(req.files);
});

app.listen(8080, function() {
	console.log('Running port 8080');
});