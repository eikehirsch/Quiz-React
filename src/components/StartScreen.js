import React from "react";
import { useQuiz } from "./contexts/QuizContext";

function StartScreen() {
  const {questionsNumber, dispatch} = useQuiz();
  return (
    <div className="start">
      <h2>Bem-vindo ao Quiz React</h2>
      <h3>{questionsNumber} questões para testar suas habilidades</h3>
      <button onClick={() => dispatch({type: 'start'})} className="btn btn-ui">Vamos começar</button>
    </div>
  );
}

export default StartScreen;