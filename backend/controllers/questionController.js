const asyncHandler = require('express-async-handler')
const Question = require('../models/questionModel')

// @desc    Create new question
// @route   POST /api/question
// @access  Public
const createQuestion = asyncHandler(async (req, res) => {
  const { question, option0, option1, salt, duration } = req.body

  if (
    question === undefined ||
    option0 === undefined ||
    option1 === undefined ||
    salt === undefined ||
    duration === undefined
  ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const largestQidQuestion = await Question.find().sort({ qid: -1 }).limit(1)
  const largestQid = largestQidQuestion[0].qid

  // Create question with auto-incremented qid
  const q = await Question.create({
    qid: largestQid + 1,
    question,
    option0,
    option1,
    salt,
    duration,
  })

  // Return results
  if (q) {
    res.status(201).json({
      qid: q.qid,
      question: q.question,
      option0: q.option0,
      option1: q.option1,
      salt: q.salt,
      duration: q.duration,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Update question result
// @route   PUT /api/question/
// @access  Public
const updateQuestionResult = asyncHandler(async (req, res) => {
  const { qid, result } = req.body

  let question = await Question.findOne({ qid })
  if (!question) {
    res.status(400)
    throw new Error('Qid not found')
  }

  question.result = result
  Question.updateOne({ qid: qid }, { result: result }, (error) => {
    if (error) {
      res.status(400)
      throw new Error('Update result error')
    } else {
      res.status(201).json({ message: `updated question ${qid}`, question })
    }
  })
})

// @desc    Get largest qid in database
// @route   GET /api/question
// @access  Public
const getAllQuestions = asyncHandler(async (req, res) => {
  const allQuestions = await Question.find()

  // Return results
  res.status(201).json(allQuestions)
})

// @desc    Get question by qid
// @route   GET /api/question/:qid
// @access  Public
const getQuestionByQid = asyncHandler(async (req, res) => {
  const question = await Question.findOne({ qid: req.params.qid })
  if (!question) {
    res.status(400)
    throw new Error('Qid not found')
  }

  // Return results
  res.status(201).json(question)
})

module.exports = {
  createQuestion,
  getQuestionByQid,
}

// @desc    Get largest qid in database
// @route   GET /api/question/largestqid
// @access  Public
const getLargestQid = asyncHandler(async (req, res) => {
  const question = await Question.find().sort({ qid: -1 }).limit(1)

  if (!question) {
    res.status(400)
    throw new Error('largest qid not found')
  }

  const largestQid = question[0].qid

  // Return results
  res.status(201).json(largestQid)
})

// @desc    Get questions by page
// @route   GET /api/question/page
// @access  Public
const getHistoryPagesQuestions = asyncHandler(async (req, res) => {
  // const { page, currQid } = req.body
  //
  // // Get the current page from the query string
  // const pageNum = parseInt(page) || 1
  // const currQidNum = parseInt(currQid)
  //
  // // Get largest qid
  // const question = await Question.find().sort({ qid: -1 }).limit(1)
  // const largestQid = question[0].qid
  //
  // // Offset from largest qid to currQid
  // const offset = largestQid - currQidNum + 1
  //
  // // Set the number of users to display per page
  // const perPage = 3
  //
  // // Calculate the number of documents to skip
  // const skip = offset + (pageNum - 1) * perPage

  // Get the currQid from the query string
  const { currQid } = req.body
  const currQidNum = parseInt(currQid)

  // Get largest qid
  const question = await Question.find().sort({ qid: -1 }).limit(1)
  const largestQid = question[0].qid

  // Calculate skip from largestQid
  const skip = largestQid - currQidNum

  // Set the number of users to display per page
  const perPage = 3

  // Get the users on the current page
  const pagedQuestions = await Question.find()
    .sort({ qid: 'desc' })
    .skip(skip)
    .limit(perPage)
    .exec()

  // Return results
  res.status(201).json(pagedQuestions)
})

module.exports = {
  createQuestion,
  getQuestionByQid,
  getLargestQid,
  getAllQuestions,
  getHistoryPagesQuestions,
  updateQuestionResult,
}
