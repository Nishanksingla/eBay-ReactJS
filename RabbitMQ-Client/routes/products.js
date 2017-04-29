var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.get("/getByCategory/:category", function (req, res) {
    console.log("Category: " + req.params.category);
    var msg_payload = {"category":req.params.category};
    mq_client.make_request('product_queue', msg_payload, function (err, results) {
        if(err){
            console.log(err);
            return;
        }
        console.log("inside make_request get product by category");
        if(results.products){
            res.send({ 'products': results.products });
            res.end();
        }else{
            res.send({'products':[]});
            res.end();
        }
    });
});

router.post("/placebid",function(req,res){
    console.log("Category: " + JSON.stringify(req.body));
    var msg_payload = req.body;
    msg_payload.user_id = req.session.user._id;
    mq_client.make_request('product_queue', msg_payload, function (err, results) {
        if(err){
            console.log(err);
            return;
        }
        console.log("inside make_request place bid");
        if(results.product){
            res.send({ 'status': "success","product":results.product });
            res.end();
        }else{
            res.send("");
            res.end();
        }
    });

});


module.exports = router;