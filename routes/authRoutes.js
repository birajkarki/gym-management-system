const express = require('express')
const router = express.Router()

// GET route to render the registration form
router.get('/register', (req, res) => {
  res.render('register')
})

// POST route to handle registration form submission
router.post('/register', (req, res) => {
  // Handle registration logic here
  res.send('Registration successful!')
})

module.exports = router
