var express = require('express');
var mq_client = require('../rpc/client');
var router = express.Router();

router.post("/", function (req, res) {
    console.log("req.body : " + JSON.stringify(req.body));
    console.log(req.session.user);
    if (req.session.user) {
        var seller_id = req.session.user._id;
        var msg_payload = {};
        msg_payload.product = {
            category : req.body.category,
            title : req.body.title,
            condition : req.body.condition,
            details : req.body.details,
            format : req.body.listingformat,
            bid_price : req.body.startingprice,
            price : req.body.price,
            quantity : req.body.quantity,
            seller_id : seller_id
        }
        mq_client.make_request('product_queue', msg_payload, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("inside make_request sellitem");
            if (results.status) {
                res.send({ 'status': "success" });
                res.end();
            } else {
                res.send("");
                res.end();
            }
        });

    } else {
        res.send({ 'error': "Session Expired" });
        res.end();
    }
});

module.exports = router;
