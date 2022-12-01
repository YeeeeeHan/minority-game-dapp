const express = require('express')
const router = express.Router()
const {
  handleRequest,
} = require('../controllers/cryptoController')

// Book routes: api/books
router.route('/').post(handleRequest)

module.exports = router
