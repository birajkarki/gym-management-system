const express = require('express')
// const passport = require('passport')
// const authRoutes = require('./routes/authRoutes')
const passport = require('./config/passportConfig') // Import the configured Passport instance
const { connectMongoose } = require('./config/database') // Import database configuration
// const middleware = require('./config/middleware')
const hbs = require('hbs')
const path = require('path')
// const createError = require('http-errors')
const indexRoutes = require('./routes/index')
const authRoutes = require('./routes/authRoutes')
const { isAuthenticated } = require('./middleware/auth')

connectMongoose() // Connect to the database
const app = express()
// Initialize Passport.js
app.use(passport.initialize())

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.use(express.static(path.join(__dirname, 'public')))
// use the routes
app.use('/', indexRoutes)
app.use('/register', authRoutes) // Mount authRoutes at /register
app.use('/protected-route', isAuthenticated, (req, res, next) => {
  res.send('This is a protected route')
})
// hbs.registerPartials(path.join(__dirname, 'views', 'layouts'))
// hbs.registerPartials(path.join(__dirname, 'views', 'orderViews'))

// Middleware setup
// app.use(middleware)

// Passport.js configuration
// passportConfig(passport) // Assuming passportConfig is a function that configures Passport.js

// Authentication routes
// app.use(authRoutes)

// Start the server
module.exports = app
