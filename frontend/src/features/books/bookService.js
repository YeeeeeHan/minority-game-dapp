// Queries backend endpoints

import axios from 'axios'

const API_URL = '/api/books/'

// Get all users
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

// Get all users
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
