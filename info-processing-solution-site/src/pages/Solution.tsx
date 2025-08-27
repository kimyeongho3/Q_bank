import React from 'react';
import { useParams } from 'react-router-dom';
import questions from '../data/questions.json';

const Solution: React.FC = () => {
    const { questionId } = useParams<{ questionId: string }>();
    const question = questions.find(q => q.id === parseInt(questionId));

    return (
        <div>
            <h1>Solution</h1>
            {question ? (
                <div>
                    <h2>{question.text}</h2>
                    <p>{question.solution}</p>
                </div>
            ) : (
                <p>Question not found.</p>
            )}
        </div>
    );
};

export default Solution;