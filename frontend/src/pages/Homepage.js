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
import UseGetInfiniteQuestion, {
  getQuestionsByPage,
} from '../hooks/question/useGetInfiniteQuestion'
import IndividualHistoricalQuestion from "../components/IndividualHistoricalQuestion";

function Homepage() {
  const [mmSigner] = useAtom(mmSignerAtom)
  const [mmGameContract] = useAtom(mmGameContractAtom)

  const dateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' }
  const [date] = useState(
    new Date().toLocaleString('en-GB', dateOptions).split('/').join(' . ')
  )
  const [qid, setQid] = useState()
  const [message, setMessage] = useState()
  const [history, setHistory] = useState([])

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
  } = UseGetInfiniteQuestion(qid)

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
      const id = await alchemyGameContract.qid()
      setQid(id.toNumber())
    })()
  }, [])

  // Update history questions whenever new infinite data is fetched
  useEffect(() => {
    if (infiniteData === undefined) {
      return
    }
    let pageData
    infiniteData.pages.map((page) => {
      pageData = page
    })

    setHistory(() => [...history, ...pageData])
  }, [infiniteData])

  // Triggers upon scrolls and hasNextPage change
  useEffect(() => {
    const onScroll = async (event) => {
      let fetching = false
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement

      // scrollTop's max = scrollHeight - clientHeight
      // If scrolled more than 80%
      if (!fetching && scrollTop > 0.9 * (scrollHeight - clientHeight)) {
        fetching = true
        if (hasNextPage) {
          await fetchNextPage()
        }
        fetching = false
      }
    }

    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [hasNextPage])

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

  // Getting different colours for background
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
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
        />
      </div>
      <div className="historical-container">
        <div className="history">History</div>
        {history.map((question) => {
          return (
                <IndividualHistoricalQuestion question={question} key={question.qid}  color={getRandomInt(1,10)} />
          )
        })}
      </div>
    </div>
  )
}

export default Homepage
