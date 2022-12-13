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

module.exports = {
  createQuestion,
  getQuestionByQid,
  getLargestQid,
  getAllQuestions,
}
