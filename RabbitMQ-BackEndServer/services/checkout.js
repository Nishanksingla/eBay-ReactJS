var mongoose = require('mongoose');

var productModel = require('../models/product');
var userModel = require('../models/user');

function checkout(msg, callback) {
    var res = {};
    console.log("In checkout handle request:" + JSON.stringify(msg));
    msg.items.forEach(function (item, index) {
        console.log()
        var product_id = item._id;
        var seller_id = item.sellerInfo._id;
        console.log("product_id");
        console.log(product_id);
        console.log("seller_id");
        console.log(seller_id);
        var quantity = item.selectedQuantity;
        var updatedQuantity = item.quantity - item.selectedQuantity
        userModel.findByIdAndUpdate(msg.id, { $push: { "purchase_history": { "title": item.title, "price": item.price, "product_id": product_id, "quantity": quantity, "sellername": item.sellerInfo.firstname } } }, function (err, user) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("user purchase_history has been updated");
            productModel.findByIdAndUpdate(product_id, { "quantity": updatedQuantity }, function (err, product) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("product quantity has been updated");
                userModel.findByIdAndUpdate(seller_id, { $push: { "items_sold": { "title": item.title, "price": item.price, "remainingQuantity": updatedQuantity, "product_id": product_id, "quantity": quantity } } }, function (err, seller) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("seller items_sold has been updated");
                });
            })
        });
        if (index === msg.items.length - 1) {
            res.status = "success"
            callback(null, res);
        }
    });
}

exports.handle_checkout = checkout;