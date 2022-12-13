import { useQueryClient, useMutation } from '@tanstack/react-query'
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
export default function useCastVote(setMessage) {
  const queryClient = useQueryClient()

  return useMutation(createVote, {
    onMutate: (newVote) => {
      queryClient.setQueryData(['vote'], newVote)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['vote'])
    },
    onError: (error) => {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`)
      }
    },
  })
}
