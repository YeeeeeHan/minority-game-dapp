import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { messageConstants } from '../../constants/constants'

const useCreateContractVote = async ({voteHash, mmGameContract}) => {
  const ticketPriceGwei = process.env.REACT_APP_TICKET_PRICE
  const ticketPriceEth = ethers.utils.formatUnits(parseInt(ticketPriceGwei,10), 'gwei')
  const transaction = await mmGameContract.vote(voteHash, {
    value: ethers.utils.parseEther(ticketPriceEth),
  })
  const transactionReceipt = await transaction.wait()
  if (transactionReceipt.status !== 1) {
    throw new Error('Transaction failed')
  }
}

export default function UseContractCreateVote(setMessage) {
  const queryClient = useQueryClient()

  return useMutation(useCreateContractVote, {
    onMutate: (voteHash) => {
      queryClient.setQueryData(['voteHash'], voteHash)
    },
    onSuccess: () => {
      setMessage(messageConstants.VOTE_REGISTERED)
    },
    onError: (error) => {
      if (error) {
        setMessage(`Encountered error: ${error.reason}`)
      }
    },
  })
}
