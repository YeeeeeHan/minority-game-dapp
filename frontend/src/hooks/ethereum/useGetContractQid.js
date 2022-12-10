// import { useQuery } from '@tanstack/react-query'
// import { gameContract } from '../../ethers'
// import { getQuestionById } from '../../services/questionService'
//
// const getQidQueryFn = async () => {
//   const qid = await gameContract.qid()
//   console.log(`@@@@@@@ [homePage] QID retrieved ${qid.toNumber()}!`)
//   return qid.toNumber()
// }
//
// export default function useGetContractQid() {
//   return useQuery({
//     queryKey: ['contractQid'],
//     queryFn: getQidQueryFn,
//     onSuccess: (data) => {
//       console.log(`@@@@@@@ [homePage] QID retrieved ${data}!`)
//     },
//   })
// }
