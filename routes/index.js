var express = require('express')
var router = express.Router()
const { isAuthenticated } = require('../middleware/auth') // Import the isAuthenticated middleware

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
// router.get('/signin', isAuthenticated, (req, res) => {
//   if (req.isAuthenticated()) {
//     res.redirect('/dashboard')
//   } else {
//     res.render('signin')
//   }
// })
router.get('/signin', (req, res) => {
  res.render('signin')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})
// router.get('/signup', isAuthenticated, (req, res) => {
//   if (req.isAuthenticated()) {
//     res.redirect('/dashboard')
//   } else {
//     res.render('signup')
//   }
// })
router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})
module.exports = router
