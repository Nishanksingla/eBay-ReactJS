var mongoose = require('mongoose');

var productModel = require('../models/product');
var userModel = require('../models/user');

function getByCategory(msg, callback) {
    var res = {};
    console.log("In get product by category handle request:" + JSON.stringify(msg));

    productModel.find({ category: msg.category }, function (err, products) {

        if (err) {
            console.log(err);
            return;
        }
        console.log("products found");
        console.log(products);
        if (products) {
            res.products = products
            callback(null, res);
        } else {
            callback(null, res);
        }
    });
}

function addItem(msg, callback) {
    var res = {};
    console.log("In add product handle request:" + JSON.stringify(msg));
    var product = new productModel(msg.product);
    product.save(function (err, product) {
        if (err) {
            console.log("inside err");
            console.log(err);
            return;
        }
        console.log("product saved");
        if (product) {
            res.status = "success";
            callback(null, res);
        } else {
            callback(null, res);
        }
    });
}

function placeBid(msg, callback) {
    var res = {};
    console.log("In place bid for a product handle request:" + JSON.stringify(msg));
    productModel.findByIdAndUpdate(msg.id, { "bid_price": msg.bid_price, $inc: { num_bids: 1 } }, { new: true }, function (err, product) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("product bid_price has been updated");
        userModel.findByIdAndUpdate(msg.user_id, { $push: { "bid_history": { "title": product.title, "bid_price": msg.bid_price, } } }, function (err, seller) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("user bid history has been updated");
            if (product) {
                res.product = product;
                callback(null, res);
            }
        });

        // console.log(product);

    });
}

exports.placeBid = placeBid;
exports.addItem = addItem;
exports.getByCategory = getByCategory;