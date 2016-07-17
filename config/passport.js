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
    process.nextTick(function() {
      User.findOrCreate({
        where: {
          username: profile.name,
          passportID: profile.id
        }
      })
      .spread((user, created) => done(null, profile))
      .error(err => done(err));
    });
  }));
};
