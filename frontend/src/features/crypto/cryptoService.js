// Queries backend endpoints

import axios from 'axios'

const API_URL = '/api/crypto/'


export const postCommand = async () => {
  try {
    const response = await axios.post(API_URL)

    return response.data
  } catch (error) {
    return (
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    )
  }
}


const cryptoService = {
  postCommand,
}

export default cryptoService
