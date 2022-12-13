const express = require('express')
const router = express.Router()
const {
  createQuestion,
  getQuestionByQid,
  getLargestQid,
  getAllQuestions,
  getHistoryPagesQuestions,
  updateQuestionResult,
} = require('../controllers/questionController')

// Question routes: api/question
router.route('/').post(createQuestion).get(getAllQuestions).put(updateQuestionResult)
router.route('/largestqid').get(getLargestQid)
router.route('/page').post(getHistoryPagesQuestions)
router.route('/:qid').get(getQuestionByQid)

module.exports = router
