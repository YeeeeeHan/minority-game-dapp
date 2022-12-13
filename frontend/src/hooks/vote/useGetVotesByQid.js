import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getQuestionById } from '../question/useGetQuestionByQid'
const API_URL = '/api/vote/'

// Get votes by id
export const getVotesById = async (qid) => {
  try {
    const response = await axios.get(API_URL + qid)
    return response.data
  } catch (error) {
    throw error
  }
}

export default function UseGetVotesByQid(qid) {
  return useQuery({
    queryKey: ['getVotes', qid],
    queryFn: () => getVotesById(qid),
    onError: () => {
      console.log('ERORRRRRRRRRRRRR')
    },
    enabled: !!qid,
  })
}
