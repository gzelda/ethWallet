var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getBalance = require('./routes/getBalance');
var createAccount = require('./routes/createAccount');
var transfer = require('./routes/transfer');
var queryPending = require('./routes/queryPending');

var getAccounts = require('./routes/web3/getAccounts');
var signTransaction = require('./routes/web3/signTransaction');
var signPersonalMessage = require('./routes/web3/signPersonalMessage');
var signMessage = require('./routes/web3/signMessage');

var app = express();
console.log("in app.js: initialize");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/eth/users', usersRouter);
app.use('/eth/getBalance', getBalance);
app.use('/eth/createAccount', createAccount);
app.use('/eth/transfer', transfer);
app.use('/eth/queryPending', queryPending);

app.use('/eth/web3/getAccounts', getAccounts);
app.use('/eth/web3/signTransaction', signTransaction);
app.use('/eth/web3/signPersonalMessage', signPersonalMessage);
app.use('/eth/web3/signMessage', signMessage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
