import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { messageConstants } from '../../constants/constants'
import { toast } from 'react-toastify'

const API_URL = '/api/question/'

// create question
export const createQuestion = async (question) => {
  try {
    const response = await axios.post(API_URL, question)
    return response.data
  } catch (error) {
    throw error
  }
}

export function UsePostQuestion(setMessage) {
  const queryClient = useQueryClient()

  return useMutation(createQuestion, {
    onMutate: (question) => {
      queryClient.setQueryData(['newQuestion'], question)
    },
    onSuccess: (data) => {
      toast.success(`New question submitted: "${data.question}"`)
    },
    onError: (error) => {
      toast.error(`Error: ${error.response.data.message}`)
    },
  })
}
