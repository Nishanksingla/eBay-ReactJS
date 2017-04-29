var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// load up the user model
var userModel = require('../models/user');


function handle_request(msg, callback) {
    var res = {};
    console.log("In register handle request:" + JSON.stringify(msg));
    // console.log("In register handle request:" + msg.username);
    userModel.findOne({ username: msg.username }, function (err, user) {
        console.log(user);
        if (err) {
            console.log(err);
            // return done(err);
        }
        if (user) {
            res.code = "401";
            res.value = 'User Found with same username.'
            callback(null, res);
        } else {
            console.log("inserting new user");
            var User = new userModel();

            var password = bcrypt.hashSync(msg.password, bcrypt.genSaltSync(8), null);
            console.log("encyrpted Password: " + password);

            User.firstname = msg.firstname;
            User.lastname = msg.lastname;
            User.username = msg.username;
            User.password = password;

            // save the user
            User.save(function (err,User) {
                if (err) {
                    console.log("inside err");
                    console.log(err);
                    return;
                }
                res.code = "200";
                res.value = "Successfully Registered";
                console.log(res);
                callback(null, res);
            });
        }

    });
}

exports.handle_request = handle_request;