import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isopen, setIsopen] = useState(true);

  function handleprevious() {
    if (step > 1) setStep((step) => step - 1);
  }
  // function handleclose() {
  //   setIsopen(isopen === true ? (isopen) => false : (isopen) => true);
  // }

  function handlenext() {
    if (step < 3) setStep((s) => s + 1);
  }
  return (
    <>
      <button className="close" onClick={() => setIsopen((isopen) => !isopen)}>
        &times;
      </button>
      {isopen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}:{messages[step - 1]}
          </p>
          <div className="buttons">
            <Button
              bgclr="#7950f2"
              textclr="#fff"
              onclick={handleprevious}
              text="Previous"
            >
              <span>👈</span>Next
            </Button>
            <Button
              bgclr="#7950f2"
              textclr="#fff"
              onclick={handlenext}
              text="Next"
            >
              Previous<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ textclr, bgclr, onclick, text, children }) {
  return (
    <button
      style={{ backgroundColor: bgclr, color: textclr }}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
