import React, { useState, useEffect } from 'react'
import '../App.css'
import Clock from '../components/Clock'
import QuestionCard from '../components/QuestionCard'

import { alchemyGameContract } from '../ethers'
import useCastVote from '../hooks/vote/useCastVote'
import useContractCreateVote from '../hooks/ethereum/useContractCreateVote'
import { messageConstants } from '../constants/constants'
import { useAtom } from 'jotai'
import { mmGameContractAtom, mmSignerAtom } from '../app/store'
import { toast } from 'react-toastify'

function Homepage() {
  const [mmSigner, setMmSigner] = useAtom(mmSignerAtom)
  const [mmGameContract, setMmGameContract] = useAtom(mmGameContractAtom)

  const dateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' }
  const [date] = useState(
    new Date().toLocaleString('en-GB', dateOptions).split('/').join(' . ')
  )
  const [qid, setQid] = useState()
  const [message, setMessage] = useState()
  const [history, setHistory] = useState([])

  // Sending votes to DB
  const { isSuccess: isMutateCastVoteSuccess, mutateAsync: mutateCastVote } =
    useCastVote(setMessage)

  // Sending votes to Contract
  const { isSuccess: isMutateCreateSuccess, mutateAsync: mutateCreateVote } =
    useContractCreateVote(setMessage)

  // Debugging
  useEffect(() => {
    ;(async () => {})()
  })

  // Runs once after initial render
  useEffect(() => {
    // Retrieving current qid
    ;(async () => {
      const qid = await alchemyGameContract.qid()
      setQid(qid.toNumber())
    })()
  }, [])

  // // Function to fetch current and historical questions from backend
  // async function getQuestion(qid) {
  //   if (qid === undefined) {
  //     return
  //   }
  //   await getCurrentQuestion(qid).then((res) => {
  //     setQuestionDetails(res.data)
  //     setLoading(false)
  //   })
  //
  //   await getHistoricalQuestions(qid).then((res) => {
  //     setHistory(Object.values(res.data))
  //   })
  // }

  // On submitVote, the message will be changed to indicate that it is loading, a commitHash string is created
  // by hashing the address, the option and the salt which is fetched from DB.
  // Try Catch is used to check if the transaction is successful
  const submitVote = async (option) => {
    try {
      // Retrieving user address
      console.log(mmSigner)
      const voterAddr = await mmSigner.getAddress()

      setMessage(messageConstants.WAITING_TRANSACTION)

      const unix = Math.floor(Date.now() / 1000)

      // Send vote to DB
      await mutateCastVote({
        qid: qid,
        address: voterAddr,
        option: option,
        unix: unix,
        salt: 'salt',
      })
      const voteHash = await mmGameContract.hasher(
        voterAddr,
        option,
        unix,
        'salt'
      )
      // Send vote to Ethereum
      await mutateCreateVote({ voteHash, mmGameContract })
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div>
      <div className="App">
        <div className="logo-date">
          <h1 className="logo">limmy</h1>
          <h1 className="dot">&#8226; </h1>
          <Clock />
        </div>
        <div className="instructions">
          <div>new questions every sunday</div>
        </div>
        <QuestionCard
          qid={qid}
          date={date}
          submitVote={submitVote}
          message={message}
          history={history}
        />
      </div>
    </div>
  )
}

export default Homepage
