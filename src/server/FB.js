var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var passport = require('passport')

// load all the things we need
// var LocalStrategy    = require('passport-local').Strategy;
var Strategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('./models/User');

// load the auth variables
// var configAuth = require('./auth');
require("dotenv").config({silent: true});
var FB_CLIENT_ID = process.env.FB_CLIENT_ID;
var FB_CLIENTSECRET = process.env.FB_CLIENTSECRET;
var FB_CALLBACK_URL = process.env.FB_CALLBACK_URL;

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  console.log("user: ", user);
    done(null, user.id);
});

// used to deserialize the user
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
      console.log("TOKEN: ", token);
      console.log("refreshToken: ", refreshToken);
      console.log("PROFILE: ", profile);
      console.log("DONE: ", done);
      // asynchronous
      process.nextTick(function() {
        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err) {
            return done(err);
          }
          // if the user is found, then log them in
          if (user) {
            // console.log("USER FOUND")
            // console.log("USER: ", user);
              return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.facebook.id    = profile.id; // set the users facebook id
            newUser.facebook.token = token; // we will save the token that facebook provides to the user
            newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
            newUser.facebook.profilePic = profile.photos[0].value // profile photo
            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
            newUser.save(function(err) {
                if (err)
                    throw err;
                // if successful, return the new user
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

router.get('/facebook',
  passport.authenticate('facebook', { scope : 'email'}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/#/profile');
  });

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
