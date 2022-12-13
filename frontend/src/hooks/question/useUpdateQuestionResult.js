import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { messageConstants } from '../../constants/constants'
import { toast } from 'react-toastify'

const API_URL = '/api/question/'

// create question
export const updateQuestionResult = async ({qid, result}) => {
  try {
    console.log("Updating result", qid, result)
    const response = await axios.put(API_URL, {qid, result})
    return response.data
  } catch (error) {
    throw error
  }
}

export function UsePostUpdateResult() {
  return useMutation(updateQuestionResult, {
    onSuccess: (data) => {
      toast.success(`Question result: "${data.question.result}"`)
    },
    onError: (error) => {
      toast.error(`Error: ${error.response.data.message}`)
    },
  })
}
