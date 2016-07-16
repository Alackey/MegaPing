var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var passport = require('passport');
const reddit = require('../reddit/reddit.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

  reddit.getPosts().then((posts) => {
    res.render('index', {posts:posts, user: req.user});
  });
});

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

router.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

router.get('/auth/reddit', passport.authenticate('reddit', {duration: 'permanent'}));

// router.get('/auth/reddit', function(req, res, next){
//   //req.session.state = crypto.randomBytes(32).toString('hex');
//   passport.authenticate('reddit', {
//     state: "anthony",
//     duration: 'permanent',
//   })(req, res, next);
// });

router.get('/auth/reddit/callback', passport.authenticate('reddit', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
// router.get('/auth/reddit/callback', function(req, res, next){
//   // Check for origin via state token
//   //if (req.query.state == req.session.state){
//     passport.authenticate('reddit', {
//       successRedirect: '/',
//       failureRedirect: '/login'
//     })(req, res, next);
//   //}
//   //else {
//   //  next( new Error(403) );
//   //}
// });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
