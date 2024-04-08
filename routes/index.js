const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/auth')
const Member = require('../models/member')
const MembershipPlan = require('../models/membershipPlanModel')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/signin', (req, res) => {
  res.render('signin')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/dashboard', async (req, res) => {
  try {
    // Fetch all members from the database
    const members = await Member.find()

    // Format dates using JavaScript's toLocaleDateString() method
    members.forEach((member) => {
      member.formatted_start_date =
        member.membership_start_date.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      member.formatted_end_date = member.membership_end_date.toLocaleDateString(
        'en-US',
        { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
      )
    })

    res.render('dashboard', { members })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
