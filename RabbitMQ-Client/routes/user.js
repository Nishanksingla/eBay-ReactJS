var express = require('express');
var router = express.Router();

var mq_client = require('../rpc/client');

router.get("/seller/:sid", function (req, res) {
    console.log("sid: " + req.params.sid);

    var msg_payload = { "id": req.params.sid };
    mq_client.make_request('userInfo_queue', msg_payload, function (err, results) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("inside make_request get seller by id");
        if (results.user) {
          res.send({ 'seller': results.user });
          res.end();
        } else {
          res.send("");
          res.end();
        }
    });
});

router.get("/info", function (req, res) {
    var user_id = req.session.user._id;
    console.log(user_id);
    var msg_payload = { "id": req.session.user._id };
    mq_client.make_request('userInfo_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("inside make_request get user info");
        // console.log(results);
        if (results.user) {
            res.send({ 'user': results.user });
            res.end();
        } else {
            res.send({ "result": "noinfo" });
            res.end();
        }
    });
});

router.post("/addAddress", function (req, res) {
    var user_id = req.session.user._id;
    console.log(user_id);
    console.log("req.body" + JSON.stringify(req.body));
    var msg_payload={};
    msg_payload.id = user_id;
    msg_payload.address = {
        phone: req.body.phonenumber,
        state: req.body.state,
        country: req.body.country,
        city: req.body.city,
        zip: req.body.zip,
        streetaddress: req.body.streetaddress,
        streetaddress2: req.body.streetaddress2
    };

    mq_client.make_request('userInfo_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("inside make_request");
        if (results.status) {
            res.send({ 'status': "success" });
            res.end();
        }
    });
});

router.post("/addCard", function (req, res) {
    console.log("req.body" + JSON.stringify(req.body));
    if (req.body.number.length !== 16) {
        res.send({ "error": "Please enter a valid card number." });
        res.end();
    } else {
        var user_id = req.session.user._id;
        var msg_payload={};
        msg_payload.id = user_id;
        msg_payload.card = {
          number: req.body.number,
          expiration: req.body.expiration,
          securityCode: req.body.securityCode
        };
        mq_client.make_request('userInfo_queue', msg_payload, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("inside make_request");
            if (results.status) {
                res.send({ 'status': "success" });
                res.end();
            }
        });
    }
});

module.exports = router;