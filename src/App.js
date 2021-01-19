import React, { useState } from 'react'
// styles
import "./styles/app.scss";
// components
import Quiz from "./components/Quiz";
import Results from "./components/Results";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0),
    [displayQuiz, setDisplayQuiz] = useState(true),
    [score, setScore] = useState(0),
    displayResults = () => displayQuiz? "none" : "block";
  

  return (
    <div className="App">
      <Quiz 
        displayQuiz={displayQuiz} 
        setDisplayQuiz={setDisplayQuiz}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        score={score} setScore={setScore} 
      />
      <Results 
        displayQuiz={displayQuiz} 
        setDisplayQuiz={setDisplayQuiz} 
        displayResults={displayResults}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        score={score}
    />
    </div>
  );
}

export default App;
