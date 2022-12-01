const express = require('express')
const router = express.Router()
const {
  createBook,
  getBook,
  getBookById,
} = require('../controllers/bookController')

// Book routes: api/books
router.route('/').get(getBook).post(createBook)
router.route('/:id').get(getBookById)

module.exports = router
