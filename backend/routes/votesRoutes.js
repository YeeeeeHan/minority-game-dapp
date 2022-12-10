const express = require('express')
const router = express.Router()
const { createVote, getVoteByQid } = require('../controllers/voteController')

// Votes routes: api/vote
router.route('/').post(createVote)
router.route('/:qid').get(getVoteByQid)

module.exports = router
