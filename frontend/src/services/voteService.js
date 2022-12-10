// Proxy in package.json - "proxy": "http://localhost:4000"
import axios from 'axios'
const API_URL = '/api/vote/'

// Create vote
export const createVote = async (vote) => {
  try {
    const response = await axios.post(API_URL, vote)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get votes by id
export const getVotesById = async (id) => {
  try {
    const response = await axios.get(API_URL + id)
    return response.data
  } catch (error) {
    return (
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    )
  }
}

const voteService = {
  createVote,
  getVotesById,
}

export default voteService
