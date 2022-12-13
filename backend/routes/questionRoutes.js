const express = require('express')
const router = express.Router()
const { createQuestion, getQuestionByQid, getLargestQid, getAllQuestions} = require('../controllers/questionController')

// Question routes: api/question
router.route('/').post(createQuestion).get(getAllQuestions)
router.route('/largestqid').get(getLargestQid)
router.route('/:qid').get(getQuestionByQid)

module.exports = router
