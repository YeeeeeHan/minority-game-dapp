import React, { useState, useEffect } from 'react'
import '../App.css'
import Clock from '../components/Clock'
// import web3 from "../web3";
// import Contract from "../Contract";
import { postQuestion, reveal, emergencyRepayBackend } from '../API'
import UseContractEmergencyRepay from '../hooks/ethereum/useContractEmergencyRepay'
import {
  createQuestion,
  UsePostQuestion,
} from '../hooks/question/usePostQuestion'
import useContractCreateVote from '../hooks/ethereum/useContractCreateVote'
import { toast } from 'react-toastify'
import { useAtom } from 'jotai'
import { mmGameContractAtom } from '../app/store'
import UseContractReveal from '../hooks/ethereum/useContractReveal'
import UseGetVotesByQid from '../hooks/vote/useGetVotesByQid'
import UseGetQuestionByQid from '../hooks/question/useGetQuestionByQid'
import { alchemyGameContract } from '../ethers'
import { UsePostUpdateResult } from '../hooks/question/useUpdateQuestionResult'

function Admin() {
  const [questionDetails, setQuestionDetails] = useState({})
  const [revealPassword, setRevealPassword] = useState('')
  const [message, setMessage] = useState('')
  const [qid, setQid] = useState()

  const [mmGameContract, setMmGameContract] = useAtom(mmGameContractAtom)

  // Sending votes to Contract
  const { mutate: mutateCreateQuestion } = UsePostQuestion()
  const { mutate: mutateEmergencyRepay } = UseContractEmergencyRepay()
  const { mutateAsync: mutateReveal } = UseContractReveal()
  const { mutateAsync: mutateResult } = UsePostUpdateResult()
  const { data } = UseGetVotesByQid(qid)

  // Emergency refunds all funds manually by administrator
  async function handleEmergencyRepay(e) {
    e.preventDefault()
    if (window.confirm('Perform Emergency Repay?') === false) {
      return
    }
    setMessage('Waiting on emergency repay transaction...')
    mutateEmergencyRepay(mmGameContract)
    setMessage('')
  }

  // Runs once after initial render
  useEffect(() => {
    // Retrieving current qid
    ;(async () => {
      const qid = await alchemyGameContract.qid()
      setQid(qid.toNumber())
    })()
  }, [])

  // Manually end game and reveal by administrator
  async function clickReveal(e) {
    e.preventDefault()
    if (window.confirm('Perform Reveal?') === false) {
      return
    }
    setMessage('Waiting on reveal transaction...')
    console.log('@@@@@@@@@@ data.votes', data.votes)
    const voteArray = data.votes.map((elem) => {
      return [elem.address, elem.option, elem.unix, elem.salt]
    })
    console.log('@@@@@@@@@@ voteArray', voteArray)

    let opt0Count = 0
    let opt1Count = 0
    for (const v of voteArray) {
      console.log(`v ${v}`)
      console.log(`is true? ${v[1] === 0}`)
      console.log(`type? ${typeof v.option}`)
      if (v[1] === 0) {
        opt0Count++
        console.log(`opt0Count ${opt0Count}`)
      } else {
        opt1Count++
        console.log(`opt1Count ${opt1Count}`)
      }
    }
    const result = (opt0Count * 100) / (opt0Count + opt1Count)

    await mutateResult({ qid, result: result.toFixed(2) })
    await mutateReveal({ voteArray, mmGameContract })
    setMessage('')
  }

  // Emergency Repay
  const handleSubmitQuestion = async (e) => {
    e.preventDefault()

    setMessage('Waiting on create question transaction...')

    const { question, option0, option1 } = questionDetails

    mutateCreateQuestion({
      question,
      option0,
      option1,
      salt: 'salt',
      duration: 123123,
    })
    setMessage('')
  }

  return (
    <div>
      <div className="App">
        <div className="logo-date">
          <h1 className="logo">admin</h1>
          <h1 className="dot">&#8226; </h1>
          <Clock />
        </div>
        <div className="main-container">
          <div> Submit new question </div>
          <form>
            <input
              type="text"
              name="content"
              placeholder="Enter full question including punctuations"
              onChange={(e) =>
                setQuestionDetails({
                  ...questionDetails,
                  question: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="optionzero"
              placeholder="Enter option zero"
              onChange={(e) =>
                setQuestionDetails({
                  ...questionDetails,
                  option0: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="optionone"
              placeholder="Enter option one"
              onChange={(e) =>
                setQuestionDetails({
                  ...questionDetails,
                  option1: e.target.value,
                })
              }
            />
            <button onClick={handleSubmitQuestion}> Submit</button>
          </form>
          <br />
          <form>
            <label>emergencyRepay</label>
            <button onClick={handleEmergencyRepay}> Emergency Repay</button>
          </form>
          <br />
          <form>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) => setRevealPassword(e.target.value)}
            />
            <button onClick={clickReveal}>Reveal</button>
            {message}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin
