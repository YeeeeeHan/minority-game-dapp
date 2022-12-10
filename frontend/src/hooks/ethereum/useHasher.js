// import { useQuery } from '@tanstack/react-query'
// import { gameContract } from '../../ethers'
//
// const callHasher = async (address, option, unix, salt) => {
//   const hash = await gameContract.hasher(address, option, unix, salt)
//   console.log(`@@@@@@@ [userHasher] hash retrieved ${hash}!`)
//   return hash
// }
//
// export default function useHasher(address, option, unix, salt) {
//   return useQuery({
//     queryKey: ['vote'],
//     queryFn: () => callHasher(address, option, unix, salt),
//   })
// }
