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
    res.redirect('/dashboard') // Redirect to dashboard or any other route
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      // Duplicate username error
      return res.render('signup', {
        errorMessage:
          'Username already exists. Please choose a different username.',
      })
    }
    console.error('Error registering user:', error) // Log the entire error object
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
    res.redirect('/dashboard') // Redirect to dashboard or any other route
  } catch (error) {
    console.error('Error logging in:', error) // Log the entire error object
    res.status(500).send('Error logging in')
  }
})

// Logout route
router.post('/logout', function (req, res, next) {
  // Implement logout functionality here (e.g., session management or token invalidation)
  // After logout, redirect users to the appropriate route
  // For example:
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.redirect('/signin');
  // });
})

module.exports = router
