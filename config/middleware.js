const express = require('express')
const session = require('express-session')
const passport = require('passport')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

module.exports = app
