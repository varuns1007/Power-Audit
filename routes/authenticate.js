var passport = require('passport')
const User = require("../models/User");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user,done)=> {
    done(null,user)
})

passport.deserializeUser((user,done)=> {
    done(null,user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      User.findOne(
        {
          email: profile.emails[0].value,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          //No user was found... so create a new user
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              profileImage: profile.photos[0].value,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);