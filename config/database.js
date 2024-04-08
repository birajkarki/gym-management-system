const mongoose = require('mongoose')
require('dotenv').config()

exports.connectMongoose = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err)
      process.exit(1)
    })
}
