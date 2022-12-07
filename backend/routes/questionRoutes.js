const express = require('express')
const router = express.Router()
const { createQuestion, getQuestionByQid } = require('../controllers/questionController')

// Question routes: api/question
router.route('/').post(createQuestion)
router.route('/:qid').get(getQuestionByQid)

module.exports = router
