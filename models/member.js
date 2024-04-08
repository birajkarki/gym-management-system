const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  membership_start_date: {
    type: Date,
    required: true,
  },
  membership_end_date: {
    type: Date,
    required: true,
  },
  // membership_plan: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'MembershipPlan',
  //   required: true,
  // },
  discount_percentage: {
    type: Number,
    required: true,
  },
  // offers: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Offer',
  //   },
  // ],
})

module.exports = mongoose.model('Member', memberSchema)
