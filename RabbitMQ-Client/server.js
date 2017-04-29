
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var compression = require('compression');


var expressSession = require('express-session');
var mongoStore = require("connect-mongo")(expressSession);

var mongoose = require('mongoose');

var db = require('./config/db');

mongoose.connect(db.url, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + db.url + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + db.url);
      }
});

var passport = require('passport');
require('./config/passport')(passport);


//Routes--------------------------------------
var login = require('./routes/login');
var register = require("./routes/register");
var sellitem = require("./routes/sellitem");
var product = require("./routes/products.js");
var ebayCart = require("./routes/cart.js");
var user = require("./routes/user.js");
var checkout = require("./routes/checkout.js");
//--------------------------------------------

var app = express();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(compression());

app.use(expressSession({
  secret: 'cmpe273_test_string',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  saveUninitialized: false, // don't create session until something stored 
  resave: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection,autoRemove: 'native' })
}));

app.set('port', process.env.PORT || 80);

app.use(passport.initialize());

app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(serveStatic(__dirname + '/public'));

app.use(serveStatic(path.join(__dirname, 'views')));

app.use(serveStatic(path.join(__dirname, 'angularApp')));

app.use("/login", login);
app.use("/register", register);
app.use("/sellitem", sellitem);
app.use("/products", product);
app.use("/ebayCart", ebayCart);
app.use("/user", user);
app.use("/checkout", checkout);

app.all('/*', function (req, res, next) {
  console.log(req.url);
  res.sendFile('views/index.html', { root: __dirname });
});


// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
