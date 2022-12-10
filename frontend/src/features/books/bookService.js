// Queries backend endpoints
import axios from 'axios'
// Proxy in package.json - "proxy": "http://localhost:4000"
const API_URL = '/api/books/'

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get(API_URL)

    return response.data
  } catch (error) {
    return (
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    )
  }
}

// Add book
export const createBook = async (title) => {
  try {
    const book = {title}
    const response = await axios.post(API_URL, book)

    return response.data
  } catch (error) {
    return (
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    )
  }
}

// Get book by id
export const getBookById = async (id) => {
  try {
    const book = {_id: id}
    const response = await axios.get(API_URL + id, book)

    return response.data
  } catch (error) {
    return (
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
    )
  }
}

const bookService = {
  getAllBooks,
  createBook,
  getBookById
}

export default bookService
