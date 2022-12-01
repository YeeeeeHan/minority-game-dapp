const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Book', bookSchema)
