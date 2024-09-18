import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';

const App = () => {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setShowResult(true);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
        {!showResult ? (
          <Quiz onQuizComplete={handleQuizComplete} />
        ) : (
          <QuizResult score={score} />
        )}
      </div>
    </div>
  );
};

export default App;
