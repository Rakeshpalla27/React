import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./Progress";
const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "datareceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "datafailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newanswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextquestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { questions, status, index, answer, points } = state;
  const numques = questions.length;
  const maxpoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "datareceived", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numques={numques} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numques={numques}
              index={index}
              points={points}
              maxpoints={maxpoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
