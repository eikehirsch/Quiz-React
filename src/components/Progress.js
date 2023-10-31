import React from "react";
import { useQuiz } from "./contexts/QuizContext";

function Progress() {
  const {index, questionsNumber, points, maxPossiblePoints, answer} = useQuiz();
  return (
    <header className="progress">
      <progress max={questionsNumber} value={index + Number(answer !== null)} />

      <p>
        Questão <strong>{index + 1}</strong> / {questionsNumber}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints} pontos
      </p>
    </header>
  );
}

export default Progress;
