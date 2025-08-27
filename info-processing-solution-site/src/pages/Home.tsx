import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Information Processing Technician Exam Solutions</h1>
            <p>This website provides solutions to the practical exam questions for the Information Processing Technician certification.</p>
            <h2>Explore the Questions</h2>
            <Link to="/questions">View Questions</Link>
        </div>
    );
};

export default Home;