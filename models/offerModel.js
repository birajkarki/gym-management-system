const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
  name: String,
  discount_percentage: Number,
  applicable_membership_plans: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipPlan' },
  ],
})

module.exports = mongoose.model('Offer', offerSchema)
