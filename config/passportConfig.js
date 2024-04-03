// config/passportConfig.js
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Example configuration for LocalStrategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    // Logic to authenticate user
    // Example:
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      if (!user.validPassword(password)) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
)

// Example configuration for JWTStrategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    function (jwt_payload, done) {
      // Logic to authenticate user using JWT
      // Example:
      User.findById(jwt_payload.sub, function (err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
    }
  )
)
// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})
module.exports = passport
