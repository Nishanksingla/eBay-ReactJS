var express = require('express');
var mq_client = require('../rpc/client');
var router = express.Router();

router.post("/", function (req, res, next) {
    console.log("req.body" + JSON.stringify(req.body));
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var msg_payload = { "username": username, "password": password, "firstname": firstname, "lastname": lastname };
    
    mq_client.make_request('register_queue', msg_payload, function (err, results) {

        console.log(results);
        if (err) {
            console.log(err);
            return;
        }

        if (results.code == 200) {
            res.send({ status: "success" });
            res.end();
        }
        else if (results.code == 401) {
            res.send({ 'error': results.value });
            res.end();
        }

    });
});


module.exports = router;

    // var username = req.body.username;

    // userModel.findOne({ username: req.body.username }, function (err, user) {
    //     if (user) {
    //         console.log("User Found with same username");
    //         res.send({ 'error': 'A user already exist with the same Username. Please select another Username.' });
    //         res.end();
    //     } else {
    //         console.log("User not found with same username");
    //         var newUser = new userModel();

    //         var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    //         console.log("encyrpted Password: " + password);

    //         newUser.firstname = req.body.firstname;
    //         newUser.lastname = req.body.lastname;
    //         newUser.username = req.body.username;
    //         newUser.password = password;

    //         newUser.save(function (err) {
    //             if (err) {
    //                 console.log(err);
    //                 res.json(err);
    //                 return;
    //             }
    //             res.json({ status: 'Success' });
    //             return;
    //         });
    //     }
    // });