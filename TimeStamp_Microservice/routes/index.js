var express = require('express');
var router = express.Router();
var stamper = require('../resources/stamper.js');

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Timestamp Checker' });
});

router.get('/*/', function(req, res, next) {
	var m = new RegExp('//*/*')
	var params = req.params['0'];

	if (m.test(params)){
		next();
		return;
	}
	console.log('\nChecking validity of ' + req.params[0])
	var timestamps = stamper.tstamp(params);
	console.log(timestamps)
	res.send(timestamps);
});

router.get('*', function(req, res, next){
	console.log('File Not Found')
	res.send('404');
});

module.exports = router;
