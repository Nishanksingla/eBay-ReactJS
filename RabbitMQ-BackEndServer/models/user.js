var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    address: {
        state: String,
        country: String,
        city: String,
        zip: String,
        streetaddress: String,
        streetaddress2: String,
    },
    bid_history: [],
    purchase_history: [],
    items_sold: [],
    card: {
        expiration : String,
        number : String,
        securityCode : String
    }
});

module.exports = mongoose.model('user', userSchema);