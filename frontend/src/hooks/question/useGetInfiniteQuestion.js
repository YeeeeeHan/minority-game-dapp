import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
const API_URL = '/api/question/page/'

// Get question by id
export const getQuestionsByPage = async (currQid) => {
  try {
    const body = { currQid }
    const response = await axios.post(API_URL, body)
    return response.data
  } catch (error) {
    throw error
  }
}
export default function UseGetInfiniteQuestion(qid) {
  return useInfiniteQuery({
    queryKey: ['infiniteQuestion', qid],
    // pageParam is the return value of getNextPageParam
    queryFn: ({ pageParam = qid - 1 }) => getQuestionsByPage(pageParam),
    // If getNextPageParam returns any value other than undefined, hasNextPage = true
    getNextPageParam: (lastPage, allPages) => {
      // lastPage is the previous paginated data arrays
      // allPages is an array of all previous paginated data arrays
      const currQid = lastPage[0].qid

      // nextQid would be passed as the next pageParam
      const nextQid = currQid - 3
      return nextQid > 0 ? nextQid : undefined
    },
    onSuccess: (data) => {},
    onError: () => {},
  })
}
