const asyncHandler = require('express-async-handler')
const {ethers} = require("ethers");
const dotenv = require('dotenv')
dotenv.config()

const handleRequest = asyncHandler(async (req, res) => {
  // From node provider
  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(process.env.DEV_ALCHEMY)
  const wallet = new ethers.Wallet(process.env.DEV_WALLET, jsonRpcProvider);

  const contract = require("./Box.json");
  const boxContract = new ethers.Contract("0x3a93FA017ff77e5f81230EF2b618f21d92260606", contract.abi, wallet);

  const retrieved = await boxContract.retrieve();
  console.log("The value is: " + retrieved);
  const tx = await boxContract.store(111);
  console.log("Updating the message with jsonRpcProvider ...");
  await tx.wait();
  const newRetrieved = await boxContract.retrieve();
  const bigNum = ethers.BigNumber.from(newRetrieved).toString()
  console.log("The new value is: " + bigNum);

  res.status(200).json(bigNum)
})

module.exports = {
  handleRequest,
}
