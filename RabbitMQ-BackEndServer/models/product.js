var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    category: String,
    title: String,
    condition: String,
    details: String,
    format: String,
    bid_price: Number,
    price: Number,
    quantity:Number,
    seller_id : mongoose.Schema.Types.ObjectId,
    num_bids:Number
});

module.exports = mongoose.model('product', productSchema);