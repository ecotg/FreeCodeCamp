var request = require('request'),
	TimeStamp_MS = require('../bin/www');

var baseURL = 'http://localhost:3000';

console.log('Running tests.')

describe('Timestamp Microsevices', function(){
	it('should parse "Mar 15, 2095" as valid', function(done){
		var _url = baseURL + '/Mar%2015%2C%202095'
		request(_url, function(err, resp, body){
			expect(body).toBe('{"unix":3950985600,"natural":"Tue Mar 15 2095"}');
			done()
		});
	}, 7000);

	it('should parse "1450137600" as valid', function(done){
		var _url = baseURL + '/1450137600'
		request(_url, function(err, resp, body){
			expect(body).toBe('{"unix":1382400,"natural":"Sat Jan 17 1970"}');
			done();
		});
	}, 7000);

	it('should parse "10, 12,1001" as valid', function(done){
		var _url = baseURL + '/10%2C%2012%2C1001'
		request(_url, function(err, resp, body){
			expect(body).toBe('{"unix":-30554150400,"natural":"Mon Oct 12 1001"}');
			done();
		});
	}, 7000);

	it('should parse "December Mayer, 2016" as invalid', function(done){
		var _url = baseURL + '/December%20Mayer%2C%201990'
		request(_url, function(err, resp, body){
			expect(body).toBe('{"unix":null,"natural":null}');
			done();
		});
	}, 7000);

	it('should parse "123456" as invalid', function(done){
		var _url = baseURL + '/123456'
		request(_url, function(err, resp, body){
			expect(body).toBe('{"unix":null,"natural":null}');
			done();
		});
	}, 7000);

	it('should parse "churg churg" as invalid', function(done){
		var _url = baseURL + '/churg%20churg'
		request(_url, function(err, resp, body){
			expect(body).toBe('{"unix":null,"natural":null}');
			done();
		});
	}, 7000);

	it('should parse "2015, feb 1" as valid', function(done){
		var _url = baseURL + '/2015%2C%20feb%201'
		request(_url, function(err, resp, body){
			expect(body).toBe('{"unix":1422748800,"natural":"Sun Feb 01 2015"}')
			done();
		});
	}, 7000);

	it('should return 404 for "Dec 4, 2016/me"', function(done){
		var _url = baseURL + '/Dec%204%2C%202016%2Fme'
		request(_url, function(err, resp, body){
			expect(body).toBe('404');
			done();
			TimeStamp_MS.closeServer();
		});
	}, 7000); //timeout
});
