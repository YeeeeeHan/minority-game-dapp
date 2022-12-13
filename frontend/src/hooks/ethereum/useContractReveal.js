import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { messageConstants } from '../../constants/constants'
import { toast } from 'react-toastify'

const useReveal = async ({ voteArray, mmGameContract }) => {
  try {
    const transaction = await mmGameContract.reveal(voteArray)
    const transactionReceipt = await transaction.wait()
    if (transactionReceipt.status !== 1) {
      throw new Error('Transaction failed')
    }
  } catch (error) {
    throw error
  }
}

export default function UseContractReveal() {
  return useMutation(useReveal, {
    onSuccess: () => {
      toast.success(`Reveal success`)
    },
    onError: (error) => {
      toast.error(`Smart contract error, ${error.reason || error}`)
    },
  })
}
