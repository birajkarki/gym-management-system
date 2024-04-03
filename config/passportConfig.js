const passport = require('passport')
const bcrypt = require('bcrypt')
const GitHubStrategy = require('passport-github').Strategy
const User = require('../models/userModel')

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // GitHub authentication logic
      User.findOne({ githubId: profile.id }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          // Create a new user if not found
          const newUser = new User({
            githubId: profile.id,
            githubUsername: profile.username,
            githubAccessToken: accessToken,
          })
          newUser.save(function (err) {
            if (err) return done(err)
            return done(null, newUser)
          })
        } else {
          // User already exists, return the user
          return done(null, user)
        }
      })
    }
  )
)
