var RedditStrategy = require('passport-reddit').Strategy;
var User = require('../models/index').User;
var configAuth = require('./auth');


module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new RedditStrategy({
    clientID: configAuth.redditAuth.clientID,
    clientSecret: configAuth.redditAuth.clientSecret,
    callbackURL: configAuth.redditAuth.callbackURL,
    state: true,
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(() => {
      return done(null, profile);
    });
    // User.findOrCreate({
    //   username: profile.id
    // }.then(user => {
    //   console.log(JSON.stringify(profile));
    //   return done(null, user);
    // }).catch(err => {
    //   return done(err);
    // }));
  }));
};
