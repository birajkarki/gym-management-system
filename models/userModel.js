const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Field for local authentication (email/password)
  // githubId: String, // Field for GitHub authentication
  // githubUsername: String, // Field for GitHub authentication
  // githubAccessToken: String,
})

const User = mongoose.model('User', userSchema)
module.exports = User
