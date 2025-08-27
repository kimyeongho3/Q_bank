import React from 'react';
import questions from '../data/questions.json';

const QuestionList: React.FC = () => {
    return (
        <div>
            <h2>Question List</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <h3>{question.question}</h3>
                        <p>{question.solution}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionList;