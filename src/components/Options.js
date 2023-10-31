import React from "react";
import { useQuiz } from "./contexts/QuizContext";

function Options({question}) {
  const {dispatch, answer} = useQuiz();

  const hasAnswered = answer !== null;

  return (
    <div className="options">
       {question.options.map((option, index) => (
        <button
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
