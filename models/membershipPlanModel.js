const mongoose = require('mongoose')

const membershipPlanSchema = new mongoose.Schema({
  name: String,
  duration: String,
  cost: Number,
})

module.exports = mongoose.model('MembershipPlan', membershipPlanSchema)
