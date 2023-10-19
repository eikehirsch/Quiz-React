import React from "react";

function StartScreen({questionsNumber, dispatch}) {
  return (
    <div className="start">
      <h2>Bem-vindo ao Quiz React</h2>
      <h3>{questionsNumber} questões para testar suas habilidades</h3>
      <button onClick={() => dispatch({type: 'start'})} className="btn btn-ui">Vamos começar</button>
    </div>
  );
}

export default StartScreen;