const mongoose = require('mongoose')

const questionSchema = mongoose.Schema(
  {
      qid: {
          type: Number,
          required: [true, 'Please add a qid'],
      },
      question: {
          type: String,
          required: [true, 'Please add a question'],
      },
      option0: {
          type: String,
          required: [true, 'Please add option0'],
      },
      option1: {
          type: String,
          required: [true, 'Please add option1'],
      },
      salt: {
          type: String,
          required: [true, 'Please add salt'],
      },
      duration: {
          type: Number,
          required: [true, 'Please add duration'],
      },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Question', questionSchema)
