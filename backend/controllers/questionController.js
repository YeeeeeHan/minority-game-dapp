const asyncHandler = require('express-async-handler')
const Question = require('../models/questionModel')

// @desc    Create new question
// @route   POST /api/question
// @access  Public
const createQuestion = asyncHandler(async (req, res) => {
  const { qid, question, option0, option1, salt, duration } = req.body

  if (!qid || !question || !option0 || !option1 || !salt || !duration) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if qid exists
  const qidExists = await Question.findOne({ qid })

  if (qidExists) {
    res.status(400)
    throw new Error(`Qid ${qid} already exists`)
  }

  // Create question
  const q = await Question.create({
    qid,
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
