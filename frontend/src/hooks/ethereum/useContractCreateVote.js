import { useQueryClient, useMutation } from '@tanstack/react-query'
import { gameContract } from '../../ethers'
import { ethers } from 'ethers'
import {messageConstants} from "../../constants/constants";

const useCreateContractVote = async (voteHash) => {
  const ticketPriceGwei = 10000000
  const ticketPriceEth = ethers.utils.formatUnits(ticketPriceGwei, 'gwei')
  const transaction = await gameContract.vote(voteHash, {
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
