var express = require('express');

var router = express.Router();

var passport = require('passport');


router.post("/", function (req, res, next) {
	console.log("req.body" + JSON.stringify(req.body));
	// var username = req.body.username;
	// var password = req.body.password;
	passport.authenticate('login', function (err, user, info) {
		console.log(user);
		console.log(info);
		if (err) {
			res.send(err);
			res.end();
		}
		if (!user) {
			res.send(info);
			res.end();
		}
		else if (user) {
			req.session.user = user;
			console.log(user);
			res.send({ status: "success",user:user });
			res.end();
		}
	})(req, res, next);

});

router.get("/status", function (req, res) {
	// console.log("checking login status");
	if (req.session.user) {
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		console.log("cart session: " + req.session.cart);
		res.send({ user: req.session.user});
		res.end();
	} else {
		res.send("");
		res.end();
	}

});
router.get("/logout", function (req, res) {
	console.log("loggin out");
	req.session.destroy();
	res.send({ 'status': "success" });
	res.end();
});
module.exports = router;

	// console.log("req.body" + JSON.stringify(req.body));
	// var input = req.body;
	// var username = input.username;
	// console.log(username);
	// var password = input.password;
	// console.log(password);

	// userModel.findOne({ username: username }, function (err, user) {
	// 	if (user) {
	// 		console.log(user);
	// 		if (!bcrypt.compareSync(password, user.password)) {
	// 			res.send({ 'error': 'Oops! Wrong password.' });
	// 			res.end();
	// 		} else {
	// 			delete user.password;
	// 			req.session.username = user;
	// 			res.send({status : "success"});
	// 			res.end();
	// 		}
	// 	} else {
	// 		res.send({ 'error': 'Username does not exist.' });
	// 		res.end();
	// 	}
	// });

//Rabit MQ login queue code
	// 	var msg_payload = { "username": username, "password": password };

	// console.log("In POST Request = UserName:" + username + " " + password);
	// mq_client.make_request('login_queue', msg_payload, function (err, results) {

	// 	console.log(results);
	// 	if (err) {
	// 		console.log(err);
	// 		return;
	// 	}

	// 	if (results.code == 200) {
	// 		console.log("valid Login");
	// 		delete results.user.password
	// 		req.session.user = results.user;
	// 		res.send({ status: "success" });
	// 		res.end();
	// 	}
	// 	else if(results.code == 401) {
	// 		res.send({ 'error': results.value });
	// 		res.end();
	// 	}

	// });