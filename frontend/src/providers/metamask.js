import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { InjectedConnector } from '@web3-react/injected-connector'
import { toast } from 'react-toastify'
import { useAtom } from 'jotai'
import { mmGameContractAtom, mmSignerAtom } from '../app/store'
import contract from '../contracts/MinorityGame.json'
import { ethers } from 'ethers'

export const injected = new InjectedConnector({
  supportedNetworks: [1, 3, 4, 5, 42],
})

export async function ConnectToMetamask(activate) {
  try {
    await activate(injected)
  } catch (error) {
    toast.error(error)
  }
}

export async function CheckConnector(c) {
  const chainId = await c.getChainId()
  console.log('CheckConnector', chainId)

  if (chainId !== '0x5') {
    toast.error('Please set metamask network to Goerli')
  } else {
    toast.success('Successfully switched metamask network to Goerli')
  }
}

// If authorised, automatically log in
export function MetamaskProvider({ children }) {
  const { connector, activate, library, error, active } = useWeb3React()
  const [mmSigner, setMmSigner] = useAtom(mmSignerAtom)
  const [mmGameContract, setMmGameContract] = useAtom(mmGameContractAtom)

  useEffect(() => {
    ;(async () => {
      if (await injected.isAuthorized()) {
        await ConnectToMetamask(activate)
      }
    })()
  }, [])

  // Update global signer and gameContract whenever deps change
  useEffect(() => {
    ;(async () => {
      const mmSigner = await library.getSigner()
      const mmGameContract = await new ethers.Contract(
        process.env.REACT_APP_GAME_CONTRACT,
        contract.abi,
        mmSigner
      )
      setMmGameContract(mmGameContract)
      setMmSigner(mmSigner)
    })()
  }, [library, active])

  useEffect(() => {
    ;(async () => {
      // Whenever accounts or chain is changed
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', async function (accounts) {
          toast.info(`Switched to ${accounts}`)
        })
        window.ethereum.on('chainChanged', async function () {
          if (connector) {
            await CheckConnector(connector)
          }
        })
      }
    })()
  }, [])

  return children
}
