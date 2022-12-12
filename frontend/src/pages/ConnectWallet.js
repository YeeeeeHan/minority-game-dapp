import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { CheckConnector, ConnectToMetamask } from '../providers/metamask'
import Button from '@mui/material/Button'

export const ConnectWallet = () => {
  const { active, account, library, connector, activate, deactivate, error } =
    useWeb3React()

  // Login on click
  async function connect() {
    console.log('Triggered connect...')
    await ConnectToMetamask(activate)
  }

  useEffect(
    async (connector) => {
      console.log('Triggered check connector...')
      if (connector) {
        console.log('Checking connector...')
        await CheckConnector(connector)
      }
    },
    [connector]
  )

  return (
    <div className="WalletCard">
      {/* Render metamask connect wallet component depending on whether a wallet has been connected*/}
      {active ? (
        <div>
          <h3 className="h4">Wallet connected!</h3>
          <Button variant="outlined">
            <img className="" src={require('../assets/mm.png')} width="50" />
            {account}
          </Button>
        </div>
      ) : (
        <div>
          <h3 className="h4">Connect a wallet</h3>
          <Button variant="outlined" onClick={connect}>
            <img className="" src={require('../assets/mm.png')} width="50" />
            Connect
          </Button>
        </div>
      )}
    </div>
  )
}
