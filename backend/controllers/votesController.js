const asyncHandler = require('express-async-handler')
const Votes = require('../models/votesModel')

// @desc    Create new vote entry
// @route   POST /api/votes
// @access  Public
const createVote = asyncHandler(async (req, res) => {
  const { qid, address, option, unix, salt } = req.body

  if (!qid || !address || !option || !unix || !salt) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if vote exists
  const votesExists = await Votes.findOne({ qid, address, option, unix, salt })

  if (votesExists) {
    res.status(400)
    throw new Error('Vote already exists')
  }

  // Create vote
  const vote = await Votes.create({ qid, address, option, unix, salt })

  // Return results
  if (vote) {
    res.status(201).json({
      qid: vote.qid,
      address: vote.address,
      option: vote.option,
      unix: vote.unix,
      salt: vote.salt,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get votes by qid
// @route   GET /api/votes/:qid
// @access  Public
const getVoteByQid = asyncHandler(async (req, res) => {
  const votes = await Votes.find({ qid: req.params.qid })
  if (!votes) {
    res.status(400)
    throw new Error('Error while retrieving votes')
  }

  // Return results
  const ret = {numVotes: votes.length, votes}
  res.status(201).json(ret)
})

module.exports = {
  createVote,
  getVoteByQid,
}
