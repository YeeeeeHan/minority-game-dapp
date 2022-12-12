import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const API_URL = '/api/question/'

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

export default function useGetQuestion(id, setQuestion) {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id),
    onSuccess: (data) => {
      setQuestion(data)
    },
    onError: () => {
      console.log('ERORRRRRRRRRRRRR')
    },
    enabled: !!id,
  })
}
