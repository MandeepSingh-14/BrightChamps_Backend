import React from 'react';

const QuizResult = ({ score }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg text-center w-1/2">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg">Your Score: {score} / 3</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
};

export default QuizResult;
