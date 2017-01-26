var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var passport = require('passport')
var Strategy = require('passport-facebook').Strategy;
var User = require('./model/User');

require("dotenv").config({silent: true});
var FB_CLIENT_ID = process.env.FB_CLIENT_ID;
var FB_CLIENTSECRET = process.env.FB_CLIENTSECRET;
var FB_CALLBACK_URL = process.env.FB_CALLBACK_URL;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new Strategy({
        clientID        : FB_CLIENT_ID,
        clientSecret    : FB_CLIENTSECRET,
        callbackURL     : FB_CALLBACK_URL,
        "profileFields": ["id", "displayName", "photos", "email"]
    },
    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
      // asynchronous
      process.nextTick(function() {
        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          if (err) {
            console.log('err: ', err);
            return done(err);
          }
          // if the user is found, then log them in
          if (user) {
              return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            newUser.facebook.id    = profile.id; // set the users facebook id
            newUser.facebook.token = token; // we will save the token that facebook provides to the user
            newUser.facebook.name  = profile.displayName;
            newUser.facebook.profilePic = profile.photos[0].value
            newUser.facebook.email = profile.emails[0].value;

            // save our user to the database
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    })
  );
router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
var prettyjson = require('prettyjson')
router.get('/facebook',
  passport.authenticate('facebook', { scope : 'email'}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    var user = res.req.user;
    res.redirect("/?" + req.user._id);
  });

router.get('/fbInfo/:userID', function(req, res) {
  User.findOne({_id: req.params.userID}, function(err, profile) {
    if(err) console.log('DB error: ', err);
    res.status(200).json(profile);
  })
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();
//
//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }

module.exports = router;
