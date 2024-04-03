const express = require('express')
const passport = require('passport')
const authRoutes = require('./routes/authRoutes')
const passportConfig = require('./config/passportConfig') // Import Passport.js configuration
const databaseConfig = require('./config/databaseConfig') // Import database configuration
const middleware = require('./config/middleware')
const hbs = require('hbs')
const path = require('path')
const createError = require('http-errors')

const app = express()
const PORT = process.env.PORT || 3000

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.use(express.static(path.join(__dirname, 'public')))

// hbs.registerPartials(path.join(__dirname, 'views', 'layouts'))
// hbs.registerPartials(path.join(__dirname, 'views', 'orderViews'))

// Middleware setup
app.use(middleware)

// Database configuration
databaseConfig() // Assuming databaseConfig is a function that sets up the database connection

// Passport.js configuration
passportConfig(passport) // Assuming passportConfig is a function that configures Passport.js

// Authentication routes
app.use(authRoutes)

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error') // Assuming you have an error view set up with the name 'error'
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
