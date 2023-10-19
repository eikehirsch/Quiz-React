import React from "react";

function Progress({
  index,
  questionsNumber,
  points,
  maxPossiblePoints,
  answer,
}) {
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
