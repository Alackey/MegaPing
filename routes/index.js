var express = require('express');
var passport = require('passport');
var models = require('../models');
var reddit = require('../reddit/reddit.js');
var app = express();


/* GET: Home Page */
app.get('/', function(req, res, next) {

  reddit.getPosts().then((posts) => {
    res.render('index', {posts:posts, user: req.user});
  });
});


/* GET: Get SearchTerms */
app.get('/searchterm', loginRequired, function(req, res) {
  models.User.findOne({
    passportID: req.user.id
  }).then(function(user) {

    models.SearchTerm.findAll({
      where: {UserId: user.id}
    }).then(users => {
      res.json(users);
    });
  });
});


/* POST: Add SearchTerm */
app.post('/searchterm', loginRequired, function(req, res) {
  let modelInfo = {term: "", notifyMethod: {}, quality: null};

  modelInfo.term = req.body.term;

  if (Object.prototype.hasOwnProperty.call(req.body, 'email')) {
    modelInfo.notifyMethod.email = req.body.email;
  } else if (Object.prototype.hasOwnProperty.call(req.body, 'reddit')) {
    modelInfo.notifyMethod.redditMsg = req.body.redditMsg;
  } else if (Object.prototype.hasOwnProperty.call(req.body, 'quality')) {
    modelInfo.quality = quality;
  }

  let searchTerm = models.SearchTerm.build(modelInfo);
  models.User.findOne({
    passportID: req.user.id
  }).then(user => {
    searchTerm.UserId = user.id;
    searchTerm.save();
  });

  res.send(true);
});


/* PUT: Update SearchTerm */
app.put('/searchterm', loginRequired, function(req, res) {
  var { term, quality, notifyMethod, id } = req.body.data;

  models.SearchTerm.update({
    term: term,
    quality: quality,
    notifyMethod: notifyMethod
  },{
    where: {id: id}
  }).then(searchterm => {
    res.send(true);
  });
});


// /* DELETE: Delete SearchTerm */
// app.put('/searchterm', loginRequired, function(req, res) {
//   var { term, quality, id } = req.body.data;
//
//   models.SearchTerm.update({
//     term: term,
//     quality: quality
//   },{
//     where: {id: id}
//   }).then(searchterm => {
//     res.send(true);
//   });
// });


/*
 *  Login Logout
 */
app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


/*
 *  Auth Routes
 */
app.get('/auth/reddit', passport.authenticate('reddit', {duration: 'permanent'}));

app.get('/auth/reddit/callback', passport.authenticate('reddit', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

function loginRequired(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


module.exports = app;
