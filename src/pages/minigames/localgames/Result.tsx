import React from "react";
import "../localgames/games.css";

export const Result = ({ result, score, onReset }) => {
  return (
    <div className="result-container">
      <h2>Result: {result}</h2>
      <p>Your score: {score}</p>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
