import React, { useEffect, useState } from 'react'
import './Question.css'

function IndividualHistoricalQuestion({ question, color }) {
  const [clickedReveal, setClickedReveal] = useState(false)
  const [colorChoice, setColorChoice] = useState()

  // Handling clicking of historical option
  function handleClick(e) {
    e.preventDefault()
    setClickedReveal(true)
  }

  useEffect(() => {
    setColorChoice(color)
  }, [])

  return (
    <div className="main-container">
      <div className={`daily-container color${colorChoice}`}>
        <div className="question-option">
          <h1>
            <div className="daily-question">
              <div className="question">{question.question}</div>
            </div>
          </h1>
          <div className="daily-option">
            <div>
              <h3
                className="option noselect"
                onClick={(e) => {
                  handleClick(e)
                }}
              >
                {question.option0}
              </h3>
              {clickedReveal ? (
                <div className="reveal-result">
                  <div>{question.result}%</div>
                </div>
              ) : (
                <div />
              )}
            </div>
            <div>
              <h3
                className="option noselect"
                onClick={(e) => {
                  handleClick(e)
                }}
              >
                {question.option1}
              </h3>
              {clickedReveal ? (
                <div className="reveal-result">
                  <div>{100 - question.result}%</div>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
          {clickedReveal ? (
            <div />
          ) : (
            <div>Vote to reveal how you would have fared</div>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default IndividualHistoricalQuestion
