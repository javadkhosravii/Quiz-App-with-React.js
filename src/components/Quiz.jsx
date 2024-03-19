import React, { useRef, useState } from "react";
import "../css/Quiz.css";
import { data } from "../data";

export const Quiz = () => {
    let [index, setIndex] = useState(0); // Initialize with 0
    let [question, setQuestion] = useState(data[index]);
    // just click one option
    let [lock, setLock] = useState(false);
    // score
    let [score, setScore] = useState(0);

    // for last page
    let [result, setResult] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const option_array = [option1, option2, option3, option4];


    const checkAnswer = (e, ans) => {
        if(lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct"); 
                setLock(true);
                setScore(prev => prev + 1)
            } 
            else {
                e.target.classList.add("wrong"); 
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
            }
        }
    };

    // change the question
    const next = () => {
        if(lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            // remove answers
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }
    // reset button
    const Reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <div className="quiz-container">
            <h1>Quiz App</h1>
            <p>coded by <a href="https://www.javadkhosravi.com"name="example-link">javadkhosravi.com</a></p>
            <hr />
            {/* question */}
            {result ? <></>: <> <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>{question.option1}</li>
                <li ref={option2}  onClick={(e) => checkAnswer(e, 2)}>{question.option2}</li>
                <li ref={option3}  onClick={(e) => checkAnswer(e, 3)}>{question.option3}</li>
                <li ref={option4}  onClick={(e) => checkAnswer(e, 4)}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            {/* in data we have 5 question so we get 5 */}
            {/* index 0,1,2,3,4 */}
            <div className="index">{index + 1} of {data.length}</div>
            </>}
            {/* hide result menu from start page */}
            {result ? <>
                <h2>You scored {score} out of {data.length}</h2>
                <button onClick={Reset}>Reset</button>
            </>: <></>}
        </div>
    );
};
