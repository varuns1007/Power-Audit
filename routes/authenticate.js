var passport = require('passport')

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user,done)=> {
    done(null,user.id)
})

passport.deserializeUser((user,done)=> {
    done(null,user.id)
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/"
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null,profile)
  }
));