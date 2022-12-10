// import { useQuery } from '@tanstack/react-query'
// import { web3signer } from '../../ethers'
//
// export default function useGetSignerAddress(setVoterAddr) {
//   return useQuery({
//     queryKey: ['voterAddr'],
//     queryFn: async () => {
//       return await web3signer.getAddress()
//     },
//     onSuccess: (data) => {
//       console.log(`@@@@@@@ voterAddr retrieved ${data}!`)
//       setVoterAddr(data)
//     },
//   })
// }
