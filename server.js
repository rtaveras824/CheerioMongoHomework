var express = require('express'),
	app = express(),
	bodyParser = require('body-parser')
	logger = require('morgan');

var applicationController = require('./controller/application_controller.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(express.static('public'));

app.use('/', applicationController);

app.listen(3000, function() {
	console.log('Listening on port: 3000');
});