const mongoose = require('mongoose')

// Define the MembershipPlan schema
const membershipPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

// Define the MembershipPlan model
const MembershipPlan = mongoose.model('MembershipPlan', membershipPlanSchema)
// module.exports = mongoose.model('MembershipPlan', memberSchema)

// // Define initial membership plans
// const initialMembershipPlans = [
//   { name: 'Basic', price: 20 },
//   { name: 'Gold', price: 50 },
//   { name: 'Pro', price: 80 },
// ]

// // Insert initial membership plans into the database
// MembershipPlan.insertMany(initialMembershipPlans)
//   .then(() => {
//     console.log('Initial membership plans inserted successfully.')
//     mongoose.connection.close()
//   })
//   .catch((error) => {
//     console.error('Error inserting initial membership plans:', error)
//     mongoose.connection.close()
//   })
