const express = require('express')
const router = express.Router()
const { createVote, getVoteByQid } = require('../controllers/votesController')

// Votes routes: api/votes
router.route('/').post(createVote)
router.route('/:qid').get(getVoteByQid)

module.exports = router
