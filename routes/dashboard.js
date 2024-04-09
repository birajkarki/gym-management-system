const express = require('express')
const router = express.Router()
const Member = require('../models/member')
const MembershipPlan = require('../models/membershipPlanModel')

// Route to render the dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // Fetch all members from the database
    const members = await Member.find()
    // Fetch all membership plans from the database
    const membershipPlans = await MembershipPlan.find()
    res.render('dashboard', { members, membershipPlans })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Route to add a new member
router.post('/members', async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      address,
      membership_start_date,
      membership_end_date,
      membership_plan,
      discount_percentage,
    } = req.body

    // Create a new member instance
    const newMember = new Member({
      name,
      address,
      membership_start_date,
      membership_end_date,
      membership_plan,
      discount_percentage,
    })

    // Save the new member to the database
    await newMember.save()

    // Redirect the user back to the dashboard
    res.redirect('/dashboard')
  } catch (error) {
    console.error('Error adding new member:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Route to delete a member
router.delete('/members/:id', async (req, res) => {
  const memberId = req.params.id
  try {
    // Find the member by ID and delete it
    await Member.findByIdAndDelete(memberId)
    res.status(200).send('Member deleted successfully')
  } catch (error) {
    console.error('Error deleting member:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Route to update a member
router.put('/members/:id', async (req, res) => {
  const memberId = req.params.id
  const updatedData = req.body
  try {
    // Find the member by ID and update it with the new data
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      updatedData,
      { new: true }
    )
    res.json(updatedMember)
  } catch (error) {
    console.error('Error updating member:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
