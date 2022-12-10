import { ethers } from 'ethers'
import contract from './contracts/MinorityGame.json'

const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const web3signer = web3Provider.getSigner()
export const gameContract = new ethers.Contract(
  '0x3feA28b6c5bd159E5b9e23d0d49841A62B9E98E3',
  contract.abi,
  web3signer
)

export default { web3signer, gameContract }
