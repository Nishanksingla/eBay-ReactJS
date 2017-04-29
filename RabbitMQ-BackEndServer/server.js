
var amqp = require('amqp')
	, util = require('util');

var mongoose = require('mongoose');

var db = require('./config/db');

mongoose.connect(db.url, function (err, res) {
	if (err) {
		console.log('ERROR connecting to: ' + db.url + '. ' + err);
	} else {
		console.log('Succeeded connected to: ' + db.url);
	}
});

// var passport = require('passport');
// require('./config/passport')(passport);
// app.use(passport.initialize());

var login = require('./services/login');

var register = require('./services/register');

var product = require('./services/product');

var user = require('./services/user');

var checkout = require("./services/checkout");

var cnn = amqp.createConnection({ host: '127.0.0.1' });

cnn.on('ready', function () {
	console.log("listening on all queues");

	cnn.queue('login_queue', function (q) {
		console.log("login_queue");
		q.subscribe(function (message, headers, deliveryInfo, m) {
			// util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			// util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
			login.handle_request(message, function (err, res) {

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType: 'application/json',
					contentEncoding: 'utf-8',
					correlationId: m.correlationId
				});
			});
		});
	});

	cnn.queue('checkout_queue', function (q) {
		console.log("checkout_queue");
		q.subscribe(function (message, headers, deliveryInfo, m) {
			// util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			// util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
			checkout.handle_checkout(message, function (err, res) {
				cnn.publish(m.replyTo, res, {
					contentType: 'application/json',
					contentEncoding: 'utf-8',
					correlationId: m.correlationId
				});
			});
		});
	});

	cnn.queue('register_queue', function (q) {
		console.log("register_queue");
		q.subscribe(function (message, headers, deliveryInfo, m) {
			// util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			// util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
			register.handle_request(message, function (err, res) {

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType: 'application/json',
					contentEncoding: 'utf-8',
					correlationId: m.correlationId
				});
			});
		});
	});

	cnn.queue('product_queue', function (q) {
		console.log("product_queue");
		q.subscribe(function (message, headers, deliveryInfo, m) {
			// util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			// util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
			if (message.category) {
				product.getByCategory(message, function (err, res) {
					cnn.publish(m.replyTo, res, {
						contentType: 'application/json',
						contentEncoding: 'utf-8',
						correlationId: m.correlationId
					});
				});
			} else if (message.product) {
				product.addItem(message, function (err, res) {
					cnn.publish(m.replyTo, res, {
						contentType: 'application/json',
						contentEncoding: 'utf-8',
						correlationId: m.correlationId
					});
				});
			} else if (message.bid_price) {
				product.placeBid(message, function (err, res) {
					cnn.publish(m.replyTo, res, {
						contentType: 'application/json',
						contentEncoding: 'utf-8',
						correlationId: m.correlationId
					});
				});
			}
		});
	});

	cnn.queue('userInfo_queue', function (q) {
		console.log("userInfo_queue");
		q.subscribe(function (message, headers, deliveryInfo, m) {
			// util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			// util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
			if (message.address) {
				// console.log("adding user address");
				user.addAddress(message, function (err, res) {
					cnn.publish(m.replyTo, res, {
						contentType: 'application/json',
						contentEncoding: 'utf-8',
						correlationId: m.correlationId
					});
				});
			} else if (message.card) {
				// console.log("adding user card");
				user.addCard(message, function (err, res) {
					cnn.publish(m.replyTo, res, {
						contentType: 'application/json',
						contentEncoding: 'utf-8',
						correlationId: m.correlationId
					});
				});
			} else {
				// console.log("getting user info");
				user.handle_request(message, function (err, res) {
					// console.log("Sending back user");
					// console.log(res);
					cnn.publish(m.replyTo, res, {
						contentType: 'application/json',
						contentEncoding: 'utf-8',
						correlationId: m.correlationId
					});
				});
			}


		});
	});

});