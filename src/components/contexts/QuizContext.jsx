import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const secondsPerQuestion = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed": {
      return {
        ...state,
        status: "error",
      };
    }
    case "start": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * secondsPerQuestion,
      };
    }
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "restart": {
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: "ready",
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsNumber = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  const getQuestions = async () => {
    try {
      const resp = await fetch("http://localhost:9000/questions");
      const data = await resp.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        questionsNumber,
        maxPossiblePoints,
        dispatch
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  return context;
}

export { QuizProvider, useQuiz };
