import React, { useState, useEffect } from 'react';

export default function Quiz({ displayQuiz, setDisplayQuiz, currentQuestionIndex, setCurrentQuestionIndex, score, setScore }) {
    const  [questionsArray, setQuestionsArray] = useState([]),
        [choicesArray, setChoicesArray] = useState([]),
        [correctAnswers, setCorrectAnswers] = useState([]);

    const NUMBER_OF_QUESTIONS = 5,
        CATEGORY = 27, // CATEGORIES  9 - 32
        DIFFICULTY = "easy";

    useEffect(() => {
        const triviaApi = async() => {
            try {
                let request = await fetch(`https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${CATEGORY}&difficulty=${DIFFICULTY}&type=multiple`),
                    data = await request.json(),
                    objectArray = data.results;

                setQuestionsArray(objectArray.map(obj => obj.question));
                setChoicesArray(objectArray.map(obj => shuffleChoices([obj.correct_answer, ...obj.incorrect_answers])));
                setCorrectAnswers(objectArray.map(obj => obj.correct_answer));
            }
            catch (error) {
                throw new Error(error);
            }
        }   
        triviaApi();
    }, []);

    const shuffleChoices = arr => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const loadChoices = (currentQuestionIndex) => {
        return choicesArray[currentQuestionIndex] === undefined? "" : choicesArray[currentQuestionIndex];
    }

    const selectChoice = () => {
        clearRadios();
        const selectedChoice = document.querySelector("input[name='choice']:checked");
        if (selectedChoice) selectedChoice.parentElement.firstElementChild.textContent = "check_circle";
    }

    const clearRadios = () => {
        const radios = document.getElementsByClassName("main__input");
        [...radios].forEach(radio => radio.parentElement.firstElementChild.textContent = "radio_button_unchecked");
    }

    const nextBtnHandler = () => {
        if (!document.querySelector("input[name='choice']:checked")) return;
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (questionsArray.length === (currentQuestionIndex + 1)) setDisplayQuiz(false);
        isCorrect();
        clearRadios();
    }

    const restartBtnHandler = () => {
        setCurrentQuestionIndex(0);
        clearRadios();
    }

    const isCorrect = () => {
        const selectedChoice = document.querySelector("input[name='choice']:checked");
        if (selectedChoice.nextElementSibling.textContent === correctAnswers[currentQuestionIndex]) {
            setScore(score + (100 / NUMBER_OF_QUESTIONS));
        }
    }

    return (
        <div className="container" style={{display: displayQuiz? "block" : "none"}}>
            <div className="appQuiz">
            <header className="header">
                <h1 className="header__question">{questionsArray[currentQuestionIndex]}</h1>
                <span className="header__tracker">{currentQuestionIndex + 1} of 5</span>
                <div className="header__progress">
                    <div className="header__bar" style={{width: `${((currentQuestionIndex + 1) / 5) * 100}%`}}></div>
                </div>
                <h3 className="header__tagline">Pick an option below!</h3>
            </header>
            <main className="main">
                <ul className="main__choices">
                  {
                      [...loadChoices(currentQuestionIndex)].map((choice, index) => (
                        <li className="main__choice" key={index} onClick={selectChoice}>
                            <label htmlFor={`choice${index}`} className='main__label'>
                                <i className="material-icons">radio_button_unchecked</i>
                                <input type="radio" className="main__input" id={`choice${index}`} name='choice' />
                                <span className="main__option">{choice}</span>
                            </label>
                        </li>
                      ))
                  }
                </ul>
            </main>
            <footer className="footer">
                <button className="footer__button footer__next" onClick={nextBtnHandler}>NEXT</button>
                <button className="footer__button footer__restart" onClick={restartBtnHandler}>RESTART</button>
            </footer>
        </div>
        </div>
    )
}


