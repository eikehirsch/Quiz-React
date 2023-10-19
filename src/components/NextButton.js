import React from "react";

function NextButton({ dispatch, answer, index, questionsNumber }) {
  if (answer === null) return;

  if (index < questionsNumber - 1)
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn btn-ui"
      >
        Próxima
      </button>
    );

    if (index === questionsNumber - 1)
    return (
      <button
        onClick={() => dispatch({ type: "finish" })}
        className="btn btn-ui"
      >
        Concluir
      </button>
    );
}

export default NextButton;
