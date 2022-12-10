// Proxy in package.json - "proxy": "http://localhost:4000"
import axios from 'axios'
const API_URL = '/api/question/'

// create question
export const createQuestion = async ({question}) => {
    try {
        const response = await axios.post(API_URL, question)
        return response.data

    } catch (error) {
        return (
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        )
    }
}

// Get question by id
export const getQuestionById = async (id) => {
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

const questionService = {
    createQuestion,
    getQuestionById,
}

export default questionService
