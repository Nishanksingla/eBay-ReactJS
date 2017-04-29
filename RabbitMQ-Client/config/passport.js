
// var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// load up the user model
var User = require('../dbModels/user');

// expose this function to our app using module.exports
module.exports = function (passport) {
    
    passport.use('register', new LocalStrategy(function (username, password, done) {
        console.log("passport register");
        console.log(username);
        console.log(password);
        User.findOne({ username: username }, function (err, user) {
            // if there are any errors, return the error
            console.log(user);
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, { 'error': 'Username already exist.' });
            } else {
                var newUser = new User();
                // set the user's local credentials
                var password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                console.log("encyrpted Password: " + password);

                newUser.firstname = req.body.firstname;
                newUser.lastname = req.body.lastname;
                newUser.username = username;
                newUser.password = password;

                // save the user
                newUser.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser, { status: 'Success' });
                });
            }

        });

    }));

    passport.use('login', new LocalStrategy(function (username, password, done) {
        console.log("login using passport");
        console.log("username: " + username);
        
        // console.log("inside passport login");
        User.findOne({ 'username': username },function (err, user) {
            // if there are any errors, return the error before anything else
            // console.log(user);
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, { 'error': 'Username does not exist.' }); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { 'error': 'Oops! Wrong password.' }); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            delete user.password;
            // console.log(user);
            return done(null, user);
        });

    }));

};
