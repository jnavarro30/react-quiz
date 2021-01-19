import React from 'react'


export default function Results({ displayQuiz, setDisplayQuiz, currentQuestionIndex, setCurrentQuestionIndex, score }) {
    const clickHandler = () => {
        setCurrentQuestionIndex(0);
        setDisplayQuiz(true);
    }

    return (
        <div className="container" style={{display: displayQuiz? "none" : "block"}}>
            <div className="appQuiz">
                <header className="header">
                    <h1 className="header__question">Quiz Results</h1>
                    <span className="header__tracker">Your Score: {score}% </span>
                    <div className="header__progress">
                        <div className="header__bar"></div>
                    </div>
                    <h3 className="header__tagline">Complete!</h3>
                </header>
                <footer className="footer">
                    <button className="footer__button footer__restart" onClick={clickHandler}>RESTART</button>
                </footer>
            </div>
        </div>
    )
}

