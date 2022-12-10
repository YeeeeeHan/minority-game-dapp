import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { ethers } from 'ethers'
import { postCommand } from '../features/crypto/cryptoService'
import contract from "../contracts/MinorityGame.json"
const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [value, setValue] = useState(null)

  const connectwalletHandler = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      await accountChangedHandler(provider.getSigner())

    } else {
      setErrorMessage('Please Install Metamask!!!')
    }
  }
  const accountChangedHandler = async (newAccount) => {
    console.log("HEREEEEE 2")
    const address = await newAccount.getAddress()
    setDefaultAccount(address)
    const balance = await newAccount.getBalance()
    setUserBalance(ethers.utils.formatEther(balance))
  }

  return (
    <div className="WalletCard">
      <h3 className="h4">Welcome to a decentralized Application</h3>
      <Button
        style={{ background: defaultAccount ? '#A5CC82' : 'white' }}
        onClick={connectwalletHandler}
      >
        {defaultAccount ? 'Connected!!' : 'Connect'}
      </Button>
      <div className="displayAccount">
        <h4 className="walletAddress">Address:{defaultAccount}</h4>
        <div className="balanceDisplay">
          <h3>Wallet Amount: {userBalance}</h3>
          <h3>Retrieved value from box: {value}</h3>
        </div>
      </div>
      {errorMessage}
    </div>
  )
}
export default WalletCard
