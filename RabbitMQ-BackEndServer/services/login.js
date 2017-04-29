var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var passport = require('passport');
// load up the user model
var User = require('../models/user');


function handle_request(msg, callback) {
	var res = {};
	console.log("In login handle request:" + msg.username);
	User.findOne({ username: msg.username }, function (err, user) {
		console.log(user);
		if (err) {
			console.log(err);
			return done(err);
		}

		if (user === null) {
			res.code = "401";
			res.value = 'Username does not exist.'
			callback(null, res);
		} else {
			if (!bcrypt.compareSync(msg.password, user.password)) {
				res.code = "401";
				res.value = "Oops! Wrong password.";
				callback(null, res);
			} else {
				res.code = "200";
				res.value = "Succes Login";
				res.user = user;
				callback(null, res);
			}
		}
	});
}

exports.handle_request = handle_request;