var mongoose = require('mongoose');

var userModel = require('../models/user');


function handle_request(msg, callback) {
    var res = {};
    console.log("getting user with id: " + JSON.stringify(msg));

    userModel.findOne({ _id: msg.id }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("found user");
        if (user) {
            res.user = user
            callback(null, res);
        } else {
            callback(null, res);
        }
    });
};

function addAddress(msg, callback) {
    var res = {};
    console.log("adding user address: " + JSON.stringify(msg));
    userModel.findByIdAndUpdate(msg.id, { "address": msg.address }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("address added successfully");
        if (user) {
            res.status = "success";
            callback(null, res);
        }
        // else {
        //     callback(null, res);
        // }
    });
};

function addCard(msg, callback) {
    var res = {};
    console.log("adding user card: " + JSON.stringify(msg));
    userModel.findByIdAndUpdate(msg.id, { "card": msg.card }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("card added successfully");
        if (user) {
            res.status = "success";
            callback(null, res);
        }
    });
};

exports.addAddress = addAddress;

exports.addCard = addCard;

exports.handle_request = handle_request;