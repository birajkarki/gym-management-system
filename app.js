const express = require('express')
const passport = require('./config/passportConfig')
const { connectMongoose } = require('./config/database')
const hbs = require('hbs')
const path = require('path')
const indexRoutes = require('./routes/index')
const authRoutes = require('./routes/authRoutes')
const { isAuthenticated } = require('./middleware/auth')
const session = require('express-session')
const dashboardRoutes = require('./routes/dashboard')
connectMongoose()
const app = express()

// View engine setup`
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
// Static files and body parsing
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session middleware
app.use(
  session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
  })
)

// Passport initialization
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', indexRoutes)
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)

// Protected route
app.use('/protected-route', isAuthenticated, (req, res, next) => {
  res.send('This is a protected route')
})

module.exports = app
