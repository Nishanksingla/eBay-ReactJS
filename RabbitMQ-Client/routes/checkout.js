var express = require('express');
var router = express.Router();

var mq_client = require('../rpc/client');

router.post("/", function (req, res) {
    console.log(JSON.stringify(req.body));
    var msg_payload = {};
    msg_payload.id = req.session.user._id;
    msg_payload.items = req.body.items;
    mq_client.make_request('checkout_queue', msg_payload, function (err, results) {

        if (err) {
            console.log(err);
            return;
        }
        if (results.status) {
            delete req.session.cart;
            res.send({ 'status': "success" });
            res.end();
        }
    });



});

module.exports = router;
