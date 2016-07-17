var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var passport = require('passport');
const reddit = require('../reddit/reddit.js');

/* GET: Home Page */
router.get('/', function(req, res, next) {

  reddit.getPosts().then((posts) => {
    res.render('index', {posts:posts, user: req.user});
  });
});

/*
 *  Login Logout
 */
router.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/*
 *  Auth Routes
 */
router.get('/auth/reddit', passport.authenticate('reddit', {duration: 'permanent'}));

router.get('/auth/reddit/callback', passport.authenticate('reddit', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

function loginRequired(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


module.exports = router;
