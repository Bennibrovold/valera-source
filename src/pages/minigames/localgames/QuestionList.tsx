import React from "react";
import "../localgames/games.css";

export const QuestionList = ({ currentQuestion, onAnswer }) => {
  if (!currentQuestion || !currentQuestion.question) {
    return null;
  }

  return (
    <div className="question-container">
      <h2>{currentQuestion.question}</h2>
      <div className="answer-buttons">
        {currentQuestion.answers.map((answer, index) => (
          <button key={index} onClick={() => onAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};
