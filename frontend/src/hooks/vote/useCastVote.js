import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createVote } from '../../services/voteService'

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
