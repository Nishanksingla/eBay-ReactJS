var request = require('request')
	, express = require('express')
	, assert = require("assert")
	, http = require("http");

describe('http tests', function () {

	it('return index.html', function (done) {
		http.get('http://localhost:80/', function (res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('get user login status', function (done) {
		http.get('http://localhost:80/login/status', function (res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('test user login, return success if username and password match', function (done) {
		request.post('http://localhost:80/login',
			{ form: { username: "nishanksingal@gmail.com", password: "Singla@123" } }, function (error, res, body) {
				assert.equal(200, res.statusCode);
				done();
			})
	});

	it('returns cart item stored in session', function (done) {
		http.get('http://localhost:80/ebayCart/', function (res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});


	it('shoudl return the products under Books category', function (done) {
		http.get('http://localhost:80/products/getByCategory/Books', function (res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

});
