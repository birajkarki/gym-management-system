const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.findOne({
      username: req.body.username,
    })
    if (user) {
      return res.status(409).send('User already exists')
    }
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    })
    await newUser.save()
    res.redirect('/signin')
  } catch (error) {
    res.status(500).send('Error creating user')
  }
})
// Login route
// router.post('/login', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email })
//     if (!user) {
//       return res.status(404).send('User not found')
//     }
//     const validPassword = await bcrypt.compare(req.body.password, user.password)
//     if (!validPassword) {
//       return res.status(401).send('Invalid password')
//     }
//     res.redirect('/dashboard')
//   } catch (error) {
//     res.status(500).send('Error logging in')
//   }
// })

// router.post('/logout', function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err)
//     }
//     res.redirect('/signin')
//   })
// })

module.exports = router
