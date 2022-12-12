import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { messageConstants } from '../../constants/constants'

const useEmergencyRepay = async ({mmGameContract}) => {
  const transaction = await mmGameContract.emergencyRepay()
  const transactionReceipt = await transaction.wait()
  if (transactionReceipt.status !== 1) {
    throw new Error('Transaction failed')
  }
}

export default function UseContractEmergencyRepay() {
  const queryClient = useQueryClient()

  return useMutation(useEmergencyRepay, {
    onMutate: () => {
    },
    onSuccess: () => {
    },
    onError: (error) => {
    },
  })
}
