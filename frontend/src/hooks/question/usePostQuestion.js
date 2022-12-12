import { useQuery } from '@tanstack/react-query'
import axios from "axios";
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
export default function useGetQuestion(id, setQuestion) {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => createQuestion(),
    onSuccess: (data) => {
      setQuestion(data)
    },
    onError: () => {
      console.log("ERORRRRRRRRRRRRR")
    },
    enabled: !!id,
  })
}
