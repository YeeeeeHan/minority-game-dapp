const express = require('express')
const router = express.Router()
const {
  handleRequest,
} = require('../controllers/cryptoController')

// Book routes: api/crypto
router.route('/').post(handleRequest)

module.exports = router
