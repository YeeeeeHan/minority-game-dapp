import React, { useState, useEffect } from "react";
import "./Question.css";

function Question({ participants, content }) {
  return (
    <div className="daily-question">
      <div className="question">{content}</div>
      <div className="total-participants">
        Number of votes casted: {participants}
      </div>
    </div>
  );
}

export default Question;
