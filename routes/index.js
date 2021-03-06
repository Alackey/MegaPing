var express = require('express');
var passport = require('passport');
var models = require('../models');
var reddit = require('../reddit/reddit.js');
var app = express();


/* GET: Home Page */
app.get('/', function(req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pings');
  } else {
    res.render('index', {posts: [], user: req.user});
  }
  // reddit.getPosts().then((posts) => {
  //   res.render('index', {posts:posts, user: req.user});
  // });
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

  if ('email' in req.body) {
    modelInfo.notifyMethod.email = req.body.email;
  }
  if ('reddit' in req.body) {
    modelInfo.notifyMethod.redditMsg = req.body.redditMsg;
  }
  if('quality' in req.body) {
    let { quality } = req.body;

    if (quality.charAt(quality.length - 1) === 'p') {
      modelInfo.quality = quality.slice(0, quality.length - 1);
    } else {
      modelInfo.quality = quality;
    }
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


/* DELETE: Delete SearchTerm */
app.delete('/searchterm', loginRequired, function(req, res) {
  var { id } = req.body.data;

  models.SearchTerm.destroy({
    where: {id: id}
  }).then(searchterm => {
    res.send(true);
  });
});


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
