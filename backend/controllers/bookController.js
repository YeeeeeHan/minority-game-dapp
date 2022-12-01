const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Book = require('../models/bookModel')
const Goal = require("../models/goalModel");

// @desc    Create new book
// @route   POST /api/books
// @access  Public
const createBook = asyncHandler(async (req, res) => {
  const { title } = req.body

  if (!title) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if book exists
  const bookExists = await Book.findOne({ title })

  if (bookExists) {
    res.status(400)
    throw new Error('Book already exists')
  }

  // Create book
  const book = await Book.create({
    title,
  })

  // Return results
  if (book) {
    res.status(201).json({
      _id: book.id,
      name: book.title,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get all books
// @route   GET /api/users
// @access  Public
const getBook = asyncHandler(async (req, res) => {
  // Check if book exists
  const books = await Book.find()

  res.status(200).json(books)
})

// @desc    Get book by id
// @route   GET /api/users/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (!book) {
    res.status(400)
    throw new Error('Book not found')
  }

  res.status(200).json(book)
})

module.exports = {
  createBook,
  getBook,
  getBookById,
}
