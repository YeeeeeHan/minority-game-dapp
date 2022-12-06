const mongoose = require('mongoose')

const voteSchema = mongoose.Schema(
  {
      qid: {
          type: Number,
          required: [true, 'Please add a qid'],
      },
      address: {
          type: String,
          required: [true, 'Please add an address'],
      },
      option: {
          type: Number,
          required: [true, 'Please add an option'],
      },
      unix: {
          type: Number,
          required: [true, 'Please add a unix timestamp'],
      },
      salt: {
          type: String,
          required: [true, 'Please add a salt'],
      },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Votes', voteSchema)
