var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Reddit API
const snoowrap = require('snoowrap');
let username = 'Tech_Runner';
let password = process.env.redditPass;

let r = new snoowrap({
  user_agent: 'MegaPing version .1 by /u/Tech_Runner',
  client_id: 'OLa2z3VpRgWaqw',
  client_secret: '3KGf2fAB1N28Gd0I1SHitMS0NHQ',
  username: username,
  password: password
});

module.exports.r = r;


module.exports = app;
