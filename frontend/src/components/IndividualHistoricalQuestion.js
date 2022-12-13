import React, { useState } from 'react'
import './Question.css'

function IndividualHistoricalQuestion({ question }) {
  const [clickedReveal, setClickedReveal] = useState(false)

  // Handling clicking of historical option
  function handleClick(e) {
    e.preventDefault()
    setClickedReveal(true)
  }

  // Getting different colours for background
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
  }

  return (
    <div className="main-container">
      <div className={`daily-container color${3}`}>
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
    </div>
  )
}

export default IndividualHistoricalQuestion
