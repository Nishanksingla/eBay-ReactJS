var express = require('express');
var router = express.Router();

router.get("/", function (req,res) {
    console.log("getting cart items");
    if (req.session.cart) {
        console.log(req.session.cart);
        res.send(req.session.cart);
        res.end();
    }
    else {
        res.send({ status: "noitem" });
        res.end();
    }
});

router.post("/addToCart", function (req,res) {
    console.log("adding to cart");
    console.log("req.body: " + JSON.stringify(req.body));
    var item = [req.body];
    if (req.session.cart) {
        req.session.cart = (req.session.cart).concat(item);
        res.send({ status: "successs" });
        res.end();
    } else {
        req.session.cart = item;
        res.send({ status: "successs" });
        res.end();
    }
});

router.post("/updateCart",function(req,res){
    console.log("req.body: " + JSON.stringify(req.body));
    req.session.cart = req.body;
    res.send({ status: "success" });
    res.end();
})

module.exports = router;