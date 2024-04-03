const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  address: String,
  membership_start_date: Date,
  membership_end_date: Date,
  membership_plan: {
    plan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipPlan' },
    discount_percentage: Number,
  },
})

module.exports = mongoose.model('Member', memberSchema)
