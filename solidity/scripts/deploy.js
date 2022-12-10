const dotenv = require('dotenv')
dotenv.config()

const ticketPriceGwei = process.env.TICKET_PRICE_GWEI

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const MinorityGame = await ethers.getContractFactory('MinorityGame')
  console.log('Deploying MinorityGame...')
  const game = await MinorityGame.deploy(ticketPriceGwei)

  await game.deployed()
  console.log('MinorityGame deployed to:', game.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
