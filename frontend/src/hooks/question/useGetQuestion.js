import { useQuery } from '@tanstack/react-query'
import { getQuestionById } from '../../services/questionService'

export default function useGetQuestion(id, setQuestion) {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id),
    onSuccess: (data) => {
      setQuestion(data)
    },
    onError: () => {
      console.log("ERORRRRRRRRRRRRR")
    },
    enabled: !!id,
  })
}
