const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String, // Field for local authentication (email/password)
  githubId: String, // Field for GitHub authentication
  githubUsername: String, // Field for GitHub authentication
  githubAccessToken: String,
})

// Hash password before saving (for local authentication)
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords for local authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw new Error('Error comparing passwords')
  }
}

module.exports = mongoose.model('User', userSchema)
