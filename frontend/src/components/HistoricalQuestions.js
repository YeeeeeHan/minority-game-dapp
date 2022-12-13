import React from 'react'
import './Question.css'
import IndividualHistoricalQuestion from './IndividualHistoricalQuestion'

function HistoricalQuestions({ history }) {
  return history.map((question) => {
    return (
      <>
        <IndividualHistoricalQuestion question={question} />
        <br/>
        <br/>
      </>
    )
  })
}

export default HistoricalQuestions
