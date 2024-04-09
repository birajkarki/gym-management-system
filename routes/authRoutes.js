const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// Registration route
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    })
    await user.save()
    // res.status(201).send('User registered successfully')
    res.redirect('/dashboard')
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      // Duplicate username error
      return res.render('signup', {
        errorMessage:
          'Username already exists. Please choose a different username.',
      })
    }
    console.error('Error registering user:', error)
    res.status(500).send('Error registering user')
  }
})

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status(404).send('User not found')
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).send('Invalid password')
    }
    res.redirect('/dashboard') // Redirect to dashboard
  } catch (error) {
    console.error('Error logging in:', error) // Log the entire error object
    res.status(500).send('Error logging in')
  }
})

// Logout route
router.post('/logout', function (req, res, next) {
  // After logout, redirect users to the appropriate route
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.redirect('/signin');
  // });
})

module.exports = router
